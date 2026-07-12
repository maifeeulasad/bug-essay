import antlr4, { ErrorListener, CharStream } from "antlr4";


import PythonTracebackLexer from "./grammar/python/PythonTracebackLexer";
import PythonTracebackParser from "./grammar/python/PythonTracebackParser";




import type {
    PythonLog,
    LogEntry,
    TracebackBlock,
    Frame,
    ExceptionInfo,
    ExceptionTransition,
} from "./type";

export interface ParseResult extends PythonLog {
    /** Non-empty only if the input doesn't match the grammar at all (should be empty for well-formed tracebacks). */
    errors: string[];
}

class CollectingErrorListener extends antlr4.error.ErrorListener {
    public errors: string[] = [];

    syntaxError(
        _recognizer: unknown,
        _offendingSymbol: unknown,
        line: number,
        column: number,
        msg: string,
    ): void {
        this.errors.push(`line ${line}:${column} ${msg}`);
    }
}

// -- pull structured data out of the FRAME_LINE / EXCEPTION_LINE tokens --

const FRAME_RE = /^[ \t]*File "(.*)", line (\d+), in (.*)$/;

function parseFrameLineText(text: string): { filename: string; line: number; func: string } {
    const m = FRAME_RE.exec(text);
    if (!m) {
        // Shouldn't happen given the lexer rule, but fail soft rather than throw.
        return { filename: "", line: 0, func: text.trim() };
    }
    return { filename: m[1], line: Number(m[2]), func: m[3] };
}

function parseExceptionLineText(text: string): ExceptionInfo {
    const trimmed = text.trim();
    const idx = trimmed.indexOf(": ");
    if (idx === -1) {
        return { type: trimmed };
    }
    return { type: trimmed.slice(0, idx), message: trimmed.slice(idx + 2) };
}

// -- tree walking --

function buildFrame(frameCtx: any): Frame {
    const frameLineTok: string = frameCtx.FRAME_LINE().getText();
    const { filename, line, func } = parseFrameLineText(frameLineTok);

    const sourceLines: string[] = frameCtx
        .sourceLine_list()
        .map((sl: any) => sl.TEXT().getText().trim());

    const frame: Frame = { filename, line, function: func };
    if (sourceLines.length > 0) {
        frame.source = sourceLines.join("\n");
    }
    return frame;
}

function buildBlock(blockCtx: any, causedBy?: ExceptionTransition): TracebackBlock {
    const frames: Frame[] = blockCtx.frame_list().map(buildFrame);
    const exception = parseExceptionLineText(blockCtx.exceptionLine().EXCEPTION_LINE().getText());
    const block: TracebackBlock = { frames, exception };
    if (causedBy) block.causedBy = causedBy;
    return block;
}

function buildChainEntry(chainCtx: any): LogEntry {
    const blockCtxs = chainCtx.tracebackBlock_list();
    const transitionCtxs = chainCtx.transition_list();

    const blocks: TracebackBlock[] = [buildBlock(blockCtxs[0])];
    for (let i = 0; i < transitionCtxs.length; i++) {
        const isDirectCause = transitionCtxs[i].DIRECT_CAUSE() !== null;
        const causedBy: ExceptionTransition = isDirectCause ? "direct_cause" : "during_handling";
        blocks.push(buildBlock(blockCtxs[i + 1], causedBy));
    }

    return { kind: "traceback", blocks };
}

/** Parses raw traceback log text into structured JSON matching PythonLog. */
export function parseTraceback(text: string): ParseResult {
    const chars = new antlr4.InputStream(text);
    const lexer: any = new PythonTracebackLexer(chars as CharStream);
    const tokenStream = new antlr4.CommonTokenStream(lexer);
    const parser: any = new PythonTracebackParser(tokenStream);
    parser.buildParseTrees = true;

    const errorListener = new CollectingErrorListener();
    lexer.removeErrorListeners();
    lexer.addErrorListener(errorListener);
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);

    const tree: any = parser.log();

    const entries: LogEntry[] = [];
    const entryCtxs: any[] = tree.entry_list();
    for (const entryCtx of entryCtxs) {
        const child = entryCtx.getChild(0);
        const name = child.constructor.name;
        if (name === "OutputLineContext") {
            entries.push({ kind: "output", text: child.TEXT().getText() });
        } else if (name === "TracebackChainContext") {
            entries.push(buildChainEntry(child));
        }
    }

    return { entries, errors: errorListener.errors };
}
