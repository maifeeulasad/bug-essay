import * as vscode from "vscode";
import type { IPollingStackTraceProvider } from "../providers/IPollingStackTraceProvider";
import type { StackTraceService } from "../services/StackTraceService";
import type { TraceRepository } from "../store/TraceRepository";

/** Outcome of one polling pass, surfaced in the trace explorer view. */
export interface PollStatus {
    /** ISO timestamp of when the poll finished. */
    readonly at: string;
    /** How many previously unseen traces the poll produced. */
    readonly added: number;
    /** Present when the poll failed (e.g. Mongo unreachable). */
    readonly error?: string;
}

/**
 * Periodically pulls new exception records from a polling provider,
 * parses them, and feeds them into the repository. Uses the newest
 * record timestamp as a watermark so each poll only transfers deltas.
 */
export class StackTracePoller implements vscode.Disposable {
    private timer: ReturnType<typeof setInterval> | undefined;
    private lastSeenIso: string | undefined;
    private inFlight = false;
    private lastStatus: PollStatus | undefined;

    private readonly pollEmitter = new vscode.EventEmitter<PollStatus>();
    public readonly onDidPoll = this.pollEmitter.event;

    public constructor(
        private readonly provider: IPollingStackTraceProvider,
        private readonly service: StackTraceService,
        private readonly repository: TraceRepository,
    ) { }

    public start(intervalMs: number): void {
        this.stop();
        this.timer = setInterval(() => void this.pollOnce(), intervalMs);
        void this.pollOnce();
    }

    public stop(): void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
        }
    }

    public get status(): PollStatus | undefined {
        return this.lastStatus;
    }

    /** Runs a single poll; safe to call while a timer is active. */
    public async pollOnce(): Promise<PollStatus> {
        if (this.inFlight && this.lastStatus) {
            return this.lastStatus;
        }
        this.inFlight = true;
        let status: PollStatus;
        try {
            const records = await this.provider.fetchSince(this.lastSeenIso);
            const parsed = records.flatMap((record) => {
                try {
                    return [this.service.parseRecord(record)];
                } catch {
                    return []; // no parser registered for this record's language
                }
            });
            this.advanceWatermark(records.map((record) => record.timestamp));
            status = { at: new Date().toISOString(), added: this.repository.add(parsed) };
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            status = { at: new Date().toISOString(), added: 0, error: message };
        } finally {
            this.inFlight = false;
        }
        this.lastStatus = status;
        this.pollEmitter.fire(status);
        return status;
    }

    private advanceWatermark(timestamps: readonly (string | undefined)[]): void {
        for (const timestamp of timestamps) {
            if (timestamp && (!this.lastSeenIso || timestamp > this.lastSeenIso)) {
                this.lastSeenIso = timestamp;
            }
        }
    }

    public dispose(): void {
        this.stop();
        this.pollEmitter.dispose();
    }
}
