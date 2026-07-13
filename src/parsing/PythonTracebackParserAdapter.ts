import { parseTraceback } from "../parseTraceback";
import type { ITracebackParser, TracebackParseOutcome } from "./ITracebackParser";

/**
 * Adapter that exposes the ANTLR-generated Python traceback parser
 * through the {@link ITracebackParser} abstraction, keeping the rest of
 * the extension decoupled from ANTLR specifics.
 */
export class PythonTracebackParserAdapter implements ITracebackParser {
    public readonly language = "python";

    public parse(rawText: string): TracebackParseOutcome {
        const { errors, ...log } = parseTraceback(rawText);
        return { log, errors };
    }
}
