/**
 * A single raw stack-trace record as delivered by a provider, before parsing.
 */
export interface StackTraceRecord {
    /** Stable identifier within the provider. */
    readonly id: string;
    /** Human-readable label, shown in pickers. */
    readonly label: string;
    /** Optional extra detail (origin, timestamp, ...). */
    readonly description?: string;
    /** Language the trace is written in, e.g. "python". */
    readonly language: string;
    /** The raw, unparsed traceback text. */
    readonly rawText: string;
    /** ISO 8601 capture time, when the source records one. */
    readonly timestamp?: string;
}

/**
 * Abstraction over a source of stack-trace data.
 *
 * Today the only implementation is hardcoded sample data; future
 * implementations (log files, clipboard, Sentry, a debug session, ...)
 * only need to satisfy this contract to plug into the pipeline.
 */
export interface IStackTraceProvider {
    /** Stable identifier, e.g. "hardcoded". */
    readonly id: string;
    /** Human-readable name, shown in pickers. */
    readonly displayName: string;

    /** Fetches the available stack-trace records from this source. */
    fetch(): Promise<readonly StackTraceRecord[]>;
}
