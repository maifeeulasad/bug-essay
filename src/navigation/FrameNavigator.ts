import * as vscode from "vscode";
import type { WorkspacePathResolver } from "../linking/WorkspacePathResolver";
import type { TraceRepository } from "../store/TraceRepository";
import type { Frame } from "../type";
import { NavigationHistory } from "./NavigationHistory";
import type { CodeLocation } from "./NavigationHistory";

/** The navigator's cursor: which frame of which trace is active. */
export interface FramePosition {
    readonly traceId: string;
    /** Index into the trace's flattened frame list; -1 = trace selected, no frame yet. */
    readonly frameIndex: number;
}

/**
 * Owns the "where am I in the stack?" state: jumping to frames, stepping
 * to the next/previous frame, and browser-style back/forward over every
 * location visited.
 */
export class FrameNavigator implements vscode.Disposable {
    private position: FramePosition | undefined;

    private readonly changeEmitter = new vscode.EventEmitter<FramePosition | undefined>();
    public readonly onDidChangePosition = this.changeEmitter.event;

    public constructor(
        private readonly repository: TraceRepository,
        private readonly resolver: WorkspacePathResolver,
        private readonly history: NavigationHistory = new NavigationHistory(),
    ) { }

    public get current(): FramePosition | undefined {
        return this.position;
    }

    /** Makes a trace active without opening any of its frames yet. */
    public selectTrace(traceId: string): void {
        if (this.position?.traceId === traceId) {
            return;
        }
        this.position = { traceId, frameIndex: -1 };
        this.changeEmitter.fire(this.position);
    }

    /** Jumps to a specific frame: reveals it in the editor and records history. */
    public async openFrame(traceId: string, frameIndex: number): Promise<void> {
        const frame = this.framesOf(traceId)[frameIndex];
        if (!frame) {
            return;
        }
        this.position = { traceId, frameIndex };
        this.changeEmitter.fire(this.position);

        const uri = await this.resolver.resolve(frame.filename);
        if (!uri) {
            void vscode.window.showWarningMessage(
                `Bug Essay: could not locate "${frame.filename}" in this workspace.`,
            );
            return;
        }
        const location: CodeLocation = { uri, line: frame.line };
        this.history.visit(location);
        await this.reveal(location);
    }

    /** Steps to the next frame (deeper in the stack) of the active trace. */
    public async nextFrame(): Promise<void> {
        await this.step(1);
    }

    /** Steps to the previous frame (toward the entry point) of the active trace. */
    public async previousFrame(): Promise<void> {
        await this.step(-1);
    }

    /** Re-reveals the previously visited location, like an editor "back" button. */
    public async goBack(): Promise<void> {
        const location = this.history.goBack();
        if (location) {
            await this.reveal(location);
        }
    }

    public async goForward(): Promise<void> {
        const location = this.history.goForward();
        if (location) {
            await this.reveal(location);
        }
    }

    /** All frames of a trace across every block of every chain, in order. */
    public framesOf(traceId: string): readonly Frame[] {
        const trace = this.repository.get(traceId);
        if (!trace) {
            return [];
        }
        const frames: Frame[] = [];
        for (const entry of trace.log.entries) {
            if (entry.kind !== "traceback") {
                continue;
            }
            for (const block of entry.blocks) {
                frames.push(...block.frames);
            }
        }
        return frames;
    }

    private async step(delta: number): Promise<void> {
        const traceId = this.position?.traceId ?? this.repository.latest()?.record.id;
        if (!traceId) {
            return;
        }
        const frames = this.framesOf(traceId);
        if (frames.length === 0) {
            return;
        }
        const current = this.position?.traceId === traceId ? this.position.frameIndex : -1;
        const target = current < 0
            ? (delta > 0 ? 0 : frames.length - 1)
            : Math.min(frames.length - 1, Math.max(0, current + delta));
        if (target === current) {
            return;
        }
        await this.openFrame(traceId, target);
    }

    private async reveal(location: CodeLocation): Promise<void> {
        const document = await vscode.workspace.openTextDocument(location.uri);
        const position = new vscode.Position(Math.max(0, location.line - 1), 0);
        await vscode.window.showTextDocument(document, {
            selection: new vscode.Range(position, position),
            preserveFocus: false,
        });
    }

    public dispose(): void {
        this.changeEmitter.dispose();
    }
}
