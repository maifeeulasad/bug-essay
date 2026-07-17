import * as vscode from "vscode";

/** Connection settings for the MongoDB exception store. */
export interface MongoSettings {
    readonly uri: string;
    readonly database: string;
    readonly collection: string;
}

/**
 * Typed facade over the extension's workspace configuration.
 * Central place for defaults so the rest of the code never touches
 * raw configuration keys.
 */
export class ExtensionConfig {
    public static readonly section = "bugEssay";

    public get mongo(): MongoSettings {
        const raw = this.raw();
        return {
            uri: raw.get("mongo.uri", "mongodb://localhost:27017"),
            database: raw.get("mongo.database", "bug_essay"),
            collection: raw.get("mongo.collection", "exceptions"),
        };
    }

    public get pollingEnabled(): boolean {
        return this.raw().get("polling.enabled", true);
    }

    public get pollIntervalSeconds(): number {
        return Math.max(2, this.raw().get("polling.intervalSeconds", 10));
    }

    public get maxTraces(): number {
        return Math.max(1, this.raw().get("maxTraces", 200));
    }

    /** Fires when any bugEssay.* setting changes. */
    public onDidChange(listener: () => void): vscode.Disposable {
        return vscode.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration(ExtensionConfig.section)) {
                listener();
            }
        });
    }

    private raw(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration(ExtensionConfig.section);
    }
}
