import type { ParsedStackTrace } from "../services/StackTraceService";
import type { Frame, LogEntry, TracebackBlock } from "../type";
import { escapeHtml } from "./html";

/** Running counter so every frame gets a stable index across all blocks. */
interface FrameCounter {
    next: number;
}

/**
 * Pure HTML renderer for a parsed stack trace.
 *
 * Contains no VS Code APIs so it can be tested in plain Node; the
 * webview panel/view supplies the surrounding document shell (CSP, script).
 * Every frame carries `data-frame-index`, and the frame matching
 * `activeFrameIndex` is tagged with the `active-frame` class so hosts can
 * highlight the navigator's cursor.
 */
export class StackTraceHtmlRenderer {
    /** Renders the body markup for one parsed stack trace. */
    public render(trace: ParsedStackTrace, activeFrameIndex = -1): string {
        const header = `
            <header class="trace-header">
                <h1>${escapeHtml(trace.record.label)}</h1>
                ${trace.record.description ? `<p class="muted">${escapeHtml(trace.record.description)}</p>` : ""}
            </header>`;

        const errors =
            trace.parseErrors.length === 0
                ? ""
                : `<section class="parse-errors">
                       <h2>Parse warnings</h2>
                       <ul>${trace.parseErrors.map((e) => `<li>${escapeHtml(e)}</li>`).join("")}</ul>
                   </section>`;

        const counter: FrameCounter = { next: 0 };
        const entries = trace.log.entries
            .map((entry) => this.renderEntry(entry, counter, activeFrameIndex))
            .join("");

        return `${header}${errors}<main class="entries">${entries}</main>`;
    }

    private renderEntry(entry: LogEntry, counter: FrameCounter, activeFrameIndex: number): string {
        if (entry.kind === "output") {
            return `<pre class="output-line">${escapeHtml(entry.text)}</pre>`;
        }
        return `<section class="traceback-chain">${entry.blocks
            .map((block) => this.renderBlock(block, counter, activeFrameIndex))
            .join("")}</section>`;
    }

    private renderBlock(block: TracebackBlock, counter: FrameCounter, activeFrameIndex: number): string {
        const transition =
            block.causedBy === "direct_cause"
                ? `<div class="transition">▲ was the direct cause of</div>`
                : block.causedBy === "during_handling"
                    ? `<div class="transition">▲ while handling this, another exception occurred</div>`
                    : "";

        const frames = block.frames
            .map((frame, index) =>
                this.renderFrame(frame, index === block.frames.length - 1, counter.next++, activeFrameIndex),
            )
            .join("");

        const exceptionMessage = block.exception.message
            ? `<span class="exception-message">${escapeHtml(block.exception.message)}</span>`
            : "";

        return `
            ${transition}
            <article class="traceback-block">
                <div class="frames">${frames}</div>
                <footer class="exception">
                    <span class="exception-type">${escapeHtml(block.exception.type)}</span>
                    ${exceptionMessage}
                </footer>
            </article>`;
    }

    private renderFrame(frame: Frame, isCrashSite: boolean, frameIndex: number, activeFrameIndex: number): string {
        const source = frame.source
            ? `<pre class="frame-source">${escapeHtml(frame.source)}</pre>`
            : "";
        const classes = [
            "frame",
            isCrashSite ? "crash-site" : "",
            frameIndex === activeFrameIndex ? "active-frame" : "",
        ].filter(Boolean).join(" ");

        return `
            <div class="${classes}"
                 data-frame-index="${frameIndex}"
                 data-filename="${escapeHtml(frame.filename)}"
                 data-line="${frame.line}"
                 title="Open ${escapeHtml(frame.filename)}:${frame.line}">
                <span class="frame-function">${escapeHtml(frame.function)}</span>
                <span class="frame-location">${escapeHtml(frame.filename)}:${frame.line}</span>
                ${source}
            </div>`;
    }
}
