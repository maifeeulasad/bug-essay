import type { IStackTraceProvider, StackTraceRecord } from "./IStackTraceProvider";

/**
 * A stack-trace source that supports incremental fetching, so a poller
 * can repeatedly ask "what's new since the last record I saw?".
 */
export interface IPollingStackTraceProvider extends IStackTraceProvider {
    /**
     * Fetches records captured strictly after `sinceIso` (ISO 8601).
     * `undefined` fetches the most recent records unconditionally.
     */
    fetchSince(sinceIso: string | undefined): Promise<readonly StackTraceRecord[]>;

    /** Releases underlying connections. */
    dispose(): Promise<void>;
}
