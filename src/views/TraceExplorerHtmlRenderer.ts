import type { PollStatus } from "../polling/StackTracePoller";
import type { ParsedStackTrace } from "../services/StackTraceService";
import { createNonce, escapeHtml } from "../visualization/html";
import { StackTraceHtmlRenderer } from "../visualization/StackTraceHtmlRenderer";

/** Everything the trace explorer view needs to render one frame of UI. */
export interface TraceExplorerViewState {
    readonly traces: readonly ParsedStackTrace[];
    readonly selectedTraceId: string | undefined;
    /** Navigator cursor within the selected trace; -1 = none. */
    readonly activeFrameIndex: number;
    readonly pollStatus: PollStatus | undefined;
}

/**
 * Renders the always-visible trace explorer: a navigation toolbar,
 * polling status, the list of captured traces, and the selected trace
 * expanded inline with clickable frames.
 */
export class TraceExplorerHtmlRenderer {
    public constructor(private readonly traceRenderer: StackTraceHtmlRenderer) { }

    public render(state: TraceExplorerViewState): string {
        const nonce = createNonce();
        const csp = `default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';`;

        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>${TraceExplorerHtmlRenderer.styles}</style>
</head>
<body>
    <nav class="toolbar">
        <button id="refresh" title="Poll MongoDB now">⟳</button>
        <span class="spacer"></span>
        <button id="back" title="Go back to the previous location">⭠</button>
        <button id="forward" title="Go forward again">⭢</button>
        <button id="prev-frame" title="Jump to the previous frame (toward the entry point)">▲</button>
        <button id="next-frame" title="Jump to the next frame (deeper in the stack)">▼</button>
    </nav>
    ${this.renderStatus(state)}
    ${this.renderTraceList(state)}
    <script nonce="${nonce}">${TraceExplorerHtmlRenderer.script}</script>
</body>
</html>`;
    }

    private renderStatus(state: TraceExplorerViewState): string {
        const status = state.pollStatus;
        if (!status) {
            return `<p class="status muted">Waiting for the first poll…</p>`;
        }
        const time = new Date(status.at).toLocaleTimeString();
        if (status.error) {
            return `<p class="status error">⚠ ${escapeHtml(status.error)} <span class="muted">(${time})</span></p>`;
        }
        return `<p class="status muted">Last poll ${time} — ${state.traces.length} trace${state.traces.length === 1 ? "" : "s"}${status.added > 0 ? `, ${status.added} new` : ""}</p>`;
    }

    private renderTraceList(state: TraceExplorerViewState): string {
        if (state.traces.length === 0) {
            return `<p class="muted empty">No captured exceptions yet. Start the Python sample
                (<code>python main.py --loop 15</code> in <code>test/project/python</code>)
                with the Mongo container running.</p>`;
        }
        const items = state.traces.map((trace) => {
            const selected = trace.record.id === state.selectedTraceId;
            const detail = selected
                ? `<div class="trace-detail" data-trace-id="${escapeHtml(trace.record.id)}">
                       ${this.traceRenderer.render(trace, state.activeFrameIndex)}
                   </div>`
                : "";
            return `
                <li class="trace-item ${selected ? "selected" : ""}" data-trace-id="${escapeHtml(trace.record.id)}">
                    <div class="trace-row">
                        <span class="trace-label">${escapeHtml(trace.record.label)}</span>
                        ${trace.record.description ? `<span class="trace-meta muted">${escapeHtml(trace.record.description)}</span>` : ""}
                    </div>
                    ${detail}
                </li>`;
        });
        return `<ul class="trace-list">${items.join("")}</ul>`;
    }

    private static readonly styles = `
        body {
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
            padding: 0 0.6rem 1.5rem;
            font-size: 0.95em;
        }
        .muted { color: var(--vscode-descriptionForeground); }
        .toolbar { display: flex; gap: 0.3rem; padding: 0.4rem 0; position: sticky; top: 0;
                   background: var(--vscode-sideBar-background); z-index: 2; }
        .toolbar .spacer { flex: 1; }
        .toolbar button {
            background: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
            border: none; border-radius: 3px; cursor: pointer;
            padding: 0.2rem 0.55rem; font-size: 1em;
        }
        .toolbar button:hover { background: var(--vscode-button-secondaryHoverBackground); }
        .status { margin: 0.2rem 0 0.6rem; font-size: 0.9em; }
        .status.error { color: var(--vscode-errorForeground); }
        .empty { margin-top: 1rem; }
        code { font-family: var(--vscode-editor-font-family); }

        .trace-list { list-style: none; padding: 0; margin: 0; }
        .trace-item { border: 1px solid var(--vscode-panel-border); border-radius: 4px;
                      margin-bottom: 0.4rem; overflow: hidden; }
        .trace-item.selected { border-color: var(--vscode-focusBorder); }
        .trace-row { padding: 0.4rem 0.6rem; cursor: pointer; display: flex; flex-direction: column; gap: 0.1rem; }
        .trace-row:hover { background: var(--vscode-list-hoverBackground); }
        .trace-label { font-weight: 600; }
        .trace-meta { font-size: 0.85em; }

        .trace-detail { border-top: 1px solid var(--vscode-panel-border); padding: 0 0.6rem 0.6rem; }
        .trace-header h1 { font-size: 1em; margin: 0.6rem 0 0.1rem; }
        .parse-errors { border: 1px solid var(--vscode-editorWarning-foreground); border-radius: 4px;
                        padding: 0.3rem 0.8rem; margin: 0.4rem 0; }
        .parse-errors h2 { font-size: 0.95em; margin: 0.2rem 0; }
        .output-line { color: var(--vscode-descriptionForeground);
                       font-family: var(--vscode-editor-font-family);
                       margin: 0.3rem 0; white-space: pre-wrap; }
        .traceback-chain { margin: 0.6rem 0; }
        .transition { margin: 0.5rem 0 0.5rem 0.8rem; font-style: italic;
                      color: var(--vscode-descriptionForeground); }
        .traceback-block { border: 1px solid var(--vscode-panel-border);
                           border-left: 3px solid var(--vscode-editorError-foreground);
                           border-radius: 4px; overflow: hidden; }
        .frame { padding: 0.35rem 0.6rem; border-bottom: 1px solid var(--vscode-panel-border); cursor: pointer; }
        .frame:hover { background: var(--vscode-list-hoverBackground); }
        .frame.crash-site { background: var(--vscode-inputValidation-errorBackground); }
        .frame.active-frame { outline: 1px solid var(--vscode-focusBorder); outline-offset: -1px; }
        .frame-function { font-family: var(--vscode-editor-font-family); font-weight: 600; margin-right: 0.5rem; }
        .frame-location { font-family: var(--vscode-editor-font-family); font-size: 0.85em;
                          color: var(--vscode-textLink-foreground); word-break: break-all; }
        .frame-source { margin: 0.25rem 0 0; padding: 0.25rem 0.4rem;
                        font-family: var(--vscode-editor-font-family); font-size: 0.85em;
                        background: var(--vscode-textCodeBlock-background); border-radius: 3px;
                        white-space: pre-wrap; }
        .exception { padding: 0.4rem 0.6rem; background: var(--vscode-inputValidation-errorBackground);
                     font-family: var(--vscode-editor-font-family); }
        .exception-type { font-weight: 700; color: var(--vscode-editorError-foreground); }
        .exception-message { margin-left: 0.3rem; }`;

    private static readonly script = `
        const vscode = acquireVsCodeApi();
        const send = (message) => vscode.postMessage(message);

        document.getElementById("refresh").addEventListener("click", () => send({ type: "refresh" }));
        document.getElementById("back").addEventListener("click", () => send({ type: "back" }));
        document.getElementById("forward").addEventListener("click", () => send({ type: "forward" }));
        document.getElementById("prev-frame").addEventListener("click", () => send({ type: "previousFrame" }));
        document.getElementById("next-frame").addEventListener("click", () => send({ type: "nextFrame" }));

        for (const row of document.querySelectorAll(".trace-row")) {
            row.addEventListener("click", () => {
                send({ type: "selectTrace", traceId: row.closest(".trace-item").dataset.traceId });
            });
        }
        for (const frame of document.querySelectorAll(".frame")) {
            frame.addEventListener("click", () => {
                send({
                    type: "openFrame",
                    traceId: frame.closest(".trace-detail").dataset.traceId,
                    frameIndex: Number(frame.dataset.frameIndex),
                });
            });
        }
        const active = document.querySelector(".active-frame");
        if (active) active.scrollIntoView({ block: "nearest" });`;
}
