import type { ParsedStackTrace } from "../services/StackTraceService";
import type { Frame, LogEntry, TracebackBlock } from "../type";

/**
 * Pure HTML renderer for a parsed stack trace.
 *
 * Contains no VS Code APIs so it can be tested in plain Node; the
 * webview panel supplies the surrounding document shell (CSP, script).
 */
export class StackTraceHtmlRenderer {
    /** Renders the body markup for one parsed stack trace. */
    public render(trace: ParsedStackTrace): string {
        const header = `
            <header class="trace-header">
                <h1>${this.escape(trace.record.label)}</h1>
                ${trace.record.description ? `<p class="muted">${this.escape(trace.record.description)}</p>` : ""}
            </header>`;

        const errors =
            trace.parseErrors.length === 0
                ? ""
                : `<section class="parse-errors">
                       <h2>Parse warnings</h2>
                       <ul>${trace.parseErrors.map((e) => `<li>${this.escape(e)}</li>`).join("")}</ul>
                   </section>`;

        const entries = trace.log.entries.map((entry) => this.renderEntry(entry)).join("");

        return `${header}${errors}<main class="entries">${entries}</main>`;
    }

    private renderEntry(entry: LogEntry): string {
        if (entry.kind === "output") {
            return `<pre class="output-line">${this.escape(entry.text)}</pre>`;
        }
        return `<section class="traceback-chain">${entry.blocks
            .map((block) => this.renderBlock(block))
            .join("")}</section>`;
    }

    private renderBlock(block: TracebackBlock): string {
        const transition =
            block.causedBy === "direct_cause"
                ? `<div class="transition">▲ was the direct cause of</div>`
                : block.causedBy === "during_handling"
                    ? `<div class="transition">▲ while handling this, another exception occurred</div>`
                    : "";

        const frames = block.frames
            .map((frame, index) => this.renderFrame(frame, index === block.frames.length - 1))
            .join("");

        const exceptionMessage = block.exception.message
            ? `<span class="exception-message">${this.escape(block.exception.message)}</span>`
            : "";

        return `
            ${transition}
            <article class="traceback-block">
                <div class="frames">${frames}</div>
                <footer class="exception">
                    <span class="exception-type">${this.escape(block.exception.type)}</span>
                    ${exceptionMessage}
                </footer>
            </article>`;
    }

    private renderFrame(frame: Frame, isCrashSite: boolean): string {
        const source = frame.source
            ? `<pre class="frame-source">${this.escape(frame.source)}</pre>`
            : "";

        return `
            <div class="frame ${isCrashSite ? "crash-site" : ""}"
                 data-filename="${this.escape(frame.filename)}"
                 data-line="${frame.line}"
                 title="Open ${this.escape(frame.filename)}:${frame.line}">
                <span class="frame-function">${this.escape(frame.function)}</span>
                <span class="frame-location">${this.escape(frame.filename)}:${frame.line}</span>
                ${source}
            </div>`;
    }

    private escape(text: string): string {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
}
