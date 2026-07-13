import type { PythonLog } from "../type";

/**
 * The outcome of parsing raw log text: the structured log plus any
 * syntax errors the underlying grammar reported.
 */
export interface TracebackParseOutcome {
    readonly log: PythonLog;
    readonly errors: readonly string[];
}

/**
 * Abstraction over a language-specific traceback parser.
 *
 * Implementations turn raw log/traceback text into the structured
 * {@link PythonLog} model. New languages (Java, Node, ...) plug in by
 * providing another implementation and registering it.
 */
export interface ITracebackParser {
    /** Language this parser understands, e.g. "python". */
    readonly language: string;

    /** Parses raw text into a structured log. Never throws on malformed input. */
    parse(rawText: string): TracebackParseOutcome;
}
