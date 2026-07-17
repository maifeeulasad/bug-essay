import * as vscode from "vscode";
import type { ParsedStackTrace } from "../services/StackTraceService";

/**
 * In-memory, capacity-bounded store of parsed stack traces, keyed by
 * record id. Emits a change event whenever new traces arrive so views,
 * analyzers, and decorators can react.
 */
export class TraceRepository implements vscode.Disposable {
    private readonly byId = new Map<string, ParsedStackTrace>();
    private readonly changeEmitter = new vscode.EventEmitter<void>();
    public readonly onDidChange = this.changeEmitter.event;

    public constructor(private readonly capacity: number) { }

    /** Adds traces not seen before; returns how many were actually new. */
    public add(traces: readonly ParsedStackTrace[]): number {
        let added = 0;
        for (const trace of traces) {
            if (!this.byId.has(trace.record.id)) {
                this.byId.set(trace.record.id, trace);
                added += 1;
            }
        }
        if (added > 0) {
            this.trim();
            this.changeEmitter.fire();
        }
        return added;
    }

    /** All traces, newest first (by capture timestamp). */
    public all(): readonly ParsedStackTrace[] {
        return [...this.byId.values()].sort((a, b) =>
            (b.record.timestamp ?? "").localeCompare(a.record.timestamp ?? ""),
        );
    }

    public get(id: string): ParsedStackTrace | undefined {
        return this.byId.get(id);
    }

    public latest(): ParsedStackTrace | undefined {
        return this.all()[0];
    }

    public get size(): number {
        return this.byId.size;
    }

    private trim(): void {
        for (const trace of this.all().slice(this.capacity)) {
            this.byId.delete(trace.record.id);
        }
    }

    public dispose(): void {
        this.changeEmitter.dispose();
    }
}
