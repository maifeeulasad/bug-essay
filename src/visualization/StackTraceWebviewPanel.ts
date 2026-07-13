import * as vscode from "vscode";
import type { ParsedStackTrace } from "../services/StackTraceService";
import { StackTraceHtmlRenderer } from "./StackTraceHtmlRenderer";

/** Message sent from the webview when the user clicks a frame. */
interface OpenFrameMessage {
    readonly type: "openFrame";
    readonly filename: string;
    readonly line: number;
}

/**
 * Owns the "Bug Essay" webview panel that visualizes a stack trace.
 *
 * Follows the single-instance pattern: showing a new trace reuses the
 * existing panel instead of stacking duplicates.
 */
export class StackTraceWebviewPanel {
    private static readonly viewType = "bugEssay.stackTrace";
    private static current: StackTraceWebviewPanel | undefined;

    private readonly disposables: vscode.Disposable[] = [];

    public static show(renderer: StackTraceHtmlRenderer, trace: ParsedStackTrace): void {
        if (StackTraceWebviewPanel.current) {
            StackTraceWebviewPanel.current.update(trace);
            StackTraceWebviewPanel.current.panel.reveal();
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            StackTraceWebviewPanel.viewType,
            "Bug Essay: Stack Trace",
            vscode.ViewColumn.Beside,
            { enableScripts: true },
        );
        StackTraceWebviewPanel.current = new StackTraceWebviewPanel(panel, renderer, trace);
    }

    private constructor(
        private readonly panel: vscode.WebviewPanel,
        private readonly renderer: StackTraceHtmlRenderer,
        trace: ParsedStackTrace,
    ) {
        this.update(trace);

        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
        this.panel.webview.onDidReceiveMessage(
            (message: OpenFrameMessage) => this.onMessage(message),
            null,
            this.disposables,
        );
    }

    private update(trace: ParsedStackTrace): void {
        this.panel.title = `Stack Trace: ${trace.record.label}`;
        this.panel.webview.html = this.buildDocument(this.renderer.render(trace));
    }

    private async onMessage(message: OpenFrameMessage): Promise<void> {
        if (message.type !== "openFrame") {
            return;
        }
        await this.openFrame(message.filename, message.line);
    }

    /** Opens the frame's file at its line, if it refers to a real file. */
    private async openFrame(filename: string, line: number): Promise<void> {
        if (!filename || filename.startsWith("<")) {
            void vscode.window.showInformationMessage(
                `"${filename}" is not a file on disk (interactive input).`,
            );
            return;
        }
        try {
            const document = await vscode.workspace.openTextDocument(vscode.Uri.file(filename));
            const position = new vscode.Position(Math.max(0, line - 1), 0);
            await vscode.window.showTextDocument(document, {
                selection: new vscode.Range(position, position),
                viewColumn: vscode.ViewColumn.One,
            });
        } catch {
            void vscode.window.showWarningMessage(`Could not open ${filename}:${line}.`);
        }
    }

    private dispose(): void {
        StackTraceWebviewPanel.current = undefined;
        while (this.disposables.length) {
            this.disposables.pop()?.dispose();
        }
    }

    /** Wraps rendered body markup in a full, CSP-protected HTML document. */
    private buildDocument(body: string): string {
        const nonce = StackTraceWebviewPanel.createNonce();
        const csp = `default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';`;

        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
    body {
        font-family: var(--vscode-font-family);
        color: var(--vscode-foreground);
        padding: 0 1rem 2rem;
    }
    .muted { color: var(--vscode-descriptionForeground); }
    .trace-header h1 { font-size: 1.3rem; margin-bottom: 0.2rem; }

    .parse-errors {
        border: 1px solid var(--vscode-editorWarning-foreground);
        border-radius: 4px;
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
    }
    .parse-errors h2 { font-size: 1rem; margin: 0.2rem 0; }

    .output-line {
        color: var(--vscode-descriptionForeground);
        font-family: var(--vscode-editor-font-family);
        margin: 0.4rem 0;
        white-space: pre-wrap;
    }

    .traceback-chain { margin: 1rem 0; }

    .transition {
        margin: 0.6rem 0 0.6rem 1rem;
        font-style: italic;
        color: var(--vscode-descriptionForeground);
    }

    .traceback-block {
        border: 1px solid var(--vscode-panel-border);
        border-left: 3px solid var(--vscode-editorError-foreground);
        border-radius: 4px;
        overflow: hidden;
    }

    .frame {
        padding: 0.45rem 0.8rem;
        border-bottom: 1px solid var(--vscode-panel-border);
        cursor: pointer;
    }
    .frame:hover { background: var(--vscode-list-hoverBackground); }
    .frame.crash-site { background: var(--vscode-inputValidation-errorBackground); }

    .frame-function {
        font-family: var(--vscode-editor-font-family);
        font-weight: 600;
        margin-right: 0.6rem;
    }
    .frame-location {
        font-family: var(--vscode-editor-font-family);
        font-size: 0.85em;
        color: var(--vscode-textLink-foreground);
    }
    .frame-source {
        margin: 0.3rem 0 0;
        padding: 0.3rem 0.5rem;
        font-family: var(--vscode-editor-font-family);
        font-size: 0.85em;
        background: var(--vscode-textCodeBlock-background);
        border-radius: 3px;
        white-space: pre-wrap;
    }

    .exception {
        padding: 0.5rem 0.8rem;
        background: var(--vscode-inputValidation-errorBackground);
        font-family: var(--vscode-editor-font-family);
    }
    .exception-type { font-weight: 700; color: var(--vscode-editorError-foreground); }
    .exception-message { margin-left: 0.4rem; }
</style>
</head>
<body>
${body}
<script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    for (const frame of document.querySelectorAll(".frame")) {
        frame.addEventListener("click", () => {
            vscode.postMessage({
                type: "openFrame",
                filename: frame.dataset.filename,
                line: Number(frame.dataset.line),
            });
        });
    }
</script>
</body>
</html>`;
    }

    private static createNonce(): string {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return Array.from({ length: 32 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
    }
}
