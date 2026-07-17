import * as vscode from "vscode";
import type { FrameNavigator } from "../navigation/FrameNavigator";
import type { StackTracePoller } from "../polling/StackTracePoller";
import type { TraceRepository } from "../store/TraceRepository";
import type { TraceExplorerHtmlRenderer } from "./TraceExplorerHtmlRenderer";

/** Messages posted by the trace explorer webview. */
type ViewMessage =
    | { readonly type: "refresh" }
    | { readonly type: "selectTrace"; readonly traceId: string }
    | { readonly type: "openFrame"; readonly traceId: string; readonly frameIndex: number }
    | { readonly type: "nextFrame" }
    | { readonly type: "previousFrame" }
    | { readonly type: "back" }
    | { readonly type: "forward" };

/**
 * The always-available Bug Essay view (activity bar / secondary sidebar).
 * Renders the trace explorer and translates webview messages into
 * navigator/poller calls. Re-renders on every repository change, poll,
 * or navigator movement.
 */
export class StackTraceViewProvider implements vscode.WebviewViewProvider, vscode.Disposable {
    public static readonly viewId = "bugEssay.stackTraceView";

    private view: vscode.WebviewView | undefined;
    private selectedTraceId: string | undefined;
    private readonly subscriptions: vscode.Disposable[] = [];

    public constructor(
        private readonly repository: TraceRepository,
        private readonly navigator: FrameNavigator,
        private readonly poller: StackTracePoller,
        private readonly renderer: TraceExplorerHtmlRenderer,
    ) {
        this.subscriptions.push(
            repository.onDidChange(() => this.rerender()),
            poller.onDidPoll(() => this.rerender()),
            navigator.onDidChangePosition((position) => {
                if (position) {
                    this.selectedTraceId = position.traceId;
                }
                this.rerender();
            }),
        );
    }

    public resolveWebviewView(view: vscode.WebviewView): void {
        this.view = view;
        view.webview.options = { enableScripts: true };
        view.webview.onDidReceiveMessage((message: ViewMessage) => void this.onMessage(message));
        view.onDidDispose(() => {
            if (this.view === view) {
                this.view = undefined;
            }
        });
        this.rerender();
    }

    private async onMessage(message: ViewMessage): Promise<void> {
        switch (message.type) {
            case "refresh":
                await this.poller.pollOnce();
                return;
            case "selectTrace":
                this.selectedTraceId = message.traceId === this.selectedTraceId ? undefined : message.traceId;
                if (this.selectedTraceId) {
                    this.navigator.selectTrace(this.selectedTraceId);
                }
                this.rerender();
                return;
            case "openFrame":
                await this.navigator.openFrame(message.traceId, message.frameIndex);
                return;
            case "nextFrame":
                await this.navigator.nextFrame();
                return;
            case "previousFrame":
                await this.navigator.previousFrame();
                return;
            case "back":
                await this.navigator.goBack();
                return;
            case "forward":
                await this.navigator.goForward();
                return;
        }
    }

    private rerender(): void {
        if (!this.view) {
            return;
        }
        const traces = this.repository.all();
        const selectedTraceId = this.selectedTraceId && this.repository.get(this.selectedTraceId)
            ? this.selectedTraceId
            : undefined;
        const position = this.navigator.current;
        const activeFrameIndex = position && position.traceId === selectedTraceId ? position.frameIndex : -1;

        this.view.webview.html = this.renderer.render({
            traces,
            selectedTraceId,
            activeFrameIndex,
            pollStatus: this.poller.status,
        });
    }

    public dispose(): void {
        for (const subscription of this.subscriptions) {
            subscription.dispose();
        }
    }
}
