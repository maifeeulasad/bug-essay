import type { ITracebackParser } from "../parsing/ITracebackParser";
import type { IStackTraceProvider, StackTraceRecord } from "../providers/IStackTraceProvider";
import type { PythonLog } from "../type";

/** A stack-trace record together with its parsed representation. */
export interface ParsedStackTrace {
    readonly record: StackTraceRecord;
    readonly log: PythonLog;
    readonly parseErrors: readonly string[];
}

/**
 * Application service that ties data acquisition to parsing.
 *
 * It owns no VS Code types, so it is unit-testable in plain Node and
 * reusable outside the extension host.
 */
export class StackTraceService {
    private readonly parsersByLanguage: ReadonlyMap<string, ITracebackParser>;

    public constructor(
        private readonly provider: IStackTraceProvider,
        parsers: readonly ITracebackParser[],
    ) {
        this.parsersByLanguage = new Map(parsers.map((p) => [p.language, p]));
    }

    /** Fetches all raw records from the configured provider. */
    public async listRecords(): Promise<readonly StackTraceRecord[]> {
        return this.provider.fetch();
    }

    /**
     * Parses one record with the parser registered for its language.
     * @throws if no parser is registered for the record's language.
     */
    public parseRecord(record: StackTraceRecord): ParsedStackTrace {
        const parser = this.parsersByLanguage.get(record.language);
        if (!parser) {
            throw new Error(`No traceback parser registered for language "${record.language}".`);
        }
        const { log, errors } = parser.parse(record.rawText);
        return { record, log, parseErrors: errors };
    }
}
