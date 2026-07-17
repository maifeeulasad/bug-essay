import { MongoClient } from "mongodb";
import type { Collection, Document } from "mongodb";
import type { IPollingStackTraceProvider } from "./IPollingStackTraceProvider";
import type { StackTraceRecord } from "./IStackTraceProvider";

export interface MongoProviderOptions {
    readonly uri: string;
    readonly database: string;
    readonly collection: string;
    /** Maximum number of records returned per fetch. */
    readonly limit: number;
}

/**
 * Pulls captured exceptions from the MongoDB collection that the Python
 * test project's exception_logger writes into.
 *
 * Currently the only real (non-hardcoded) stack-trace source; other
 * stores would implement {@link IPollingStackTraceProvider} alongside it.
 */
export class MongoStackTraceProvider implements IPollingStackTraceProvider {
    public readonly id = "mongo";
    public readonly displayName = "MongoDB exceptions";

    private client: MongoClient | undefined;

    public constructor(private readonly options: MongoProviderOptions) { }

    public fetch(): Promise<readonly StackTraceRecord[]> {
        return this.fetchSince(undefined);
    }

    public async fetchSince(sinceIso: string | undefined): Promise<readonly StackTraceRecord[]> {
        const collection = await this.collection();
        const filter = sinceIso ? { createdAt: { $gt: new Date(sinceIso) } } : {};
        const documents = await collection
            .find(filter)
            .sort({ createdAt: -1 })
            .limit(this.options.limit)
            .toArray();
        return documents.map((document) => this.toRecord(document));
    }

    public async dispose(): Promise<void> {
        await this.client?.close();
        this.client = undefined;
    }

    private toRecord(document: Document): StackTraceRecord {
        const createdAt = document.createdAt instanceof Date ? document.createdAt.toISOString() : undefined;
        const type = typeof document.exceptionType === "string" ? document.exceptionType : "Exception";
        const message = typeof document.message === "string" ? document.message : "";
        const scenario = typeof document.scenario === "string" ? document.scenario : undefined;
        return {
            id: String(document._id),
            label: message ? `${type}: ${this.truncate(message, 80)}` : type,
            description: [scenario, createdAt].filter(Boolean).join(" · "),
            language: typeof document.language === "string" ? document.language : "python",
            rawText: typeof document.rawTraceback === "string" ? document.rawTraceback : "",
            timestamp: createdAt,
        };
    }

    private truncate(text: string, max: number): string {
        return text.length > max ? `${text.slice(0, max - 1)}…` : text;
    }

    private async collection(): Promise<Collection> {
        if (!this.client) {
            const client = new MongoClient(this.options.uri, { serverSelectionTimeoutMS: 3000 });
            await client.connect();
            this.client = client;
        }
        return this.client.db(this.options.database).collection(this.options.collection);
    }
}
