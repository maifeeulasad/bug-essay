// Generated from src/grammar/python/PythonTracebackParser.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { TracebackContext } from "./PythonTracebackParser.js";
import { TracebackHeaderContext } from "./PythonTracebackParser.js";
import { FrameContext } from "./PythonTracebackParser.js";
import { SourceLineContext } from "./PythonTracebackParser.js";
import { ExceptionLineContext } from "./PythonTracebackParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `PythonTracebackParser`.
 */
export default class PythonTracebackParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `PythonTracebackParser.traceback`.
	 * @param ctx the parse tree
	 */
	enterTraceback?: (ctx: TracebackContext) => void;
	/**
	 * Exit a parse tree produced by `PythonTracebackParser.traceback`.
	 * @param ctx the parse tree
	 */
	exitTraceback?: (ctx: TracebackContext) => void;
	/**
	 * Enter a parse tree produced by `PythonTracebackParser.tracebackHeader`.
	 * @param ctx the parse tree
	 */
	enterTracebackHeader?: (ctx: TracebackHeaderContext) => void;
	/**
	 * Exit a parse tree produced by `PythonTracebackParser.tracebackHeader`.
	 * @param ctx the parse tree
	 */
	exitTracebackHeader?: (ctx: TracebackHeaderContext) => void;
	/**
	 * Enter a parse tree produced by `PythonTracebackParser.frame`.
	 * @param ctx the parse tree
	 */
	enterFrame?: (ctx: FrameContext) => void;
	/**
	 * Exit a parse tree produced by `PythonTracebackParser.frame`.
	 * @param ctx the parse tree
	 */
	exitFrame?: (ctx: FrameContext) => void;
	/**
	 * Enter a parse tree produced by `PythonTracebackParser.sourceLine`.
	 * @param ctx the parse tree
	 */
	enterSourceLine?: (ctx: SourceLineContext) => void;
	/**
	 * Exit a parse tree produced by `PythonTracebackParser.sourceLine`.
	 * @param ctx the parse tree
	 */
	exitSourceLine?: (ctx: SourceLineContext) => void;
	/**
	 * Enter a parse tree produced by `PythonTracebackParser.exceptionLine`.
	 * @param ctx the parse tree
	 */
	enterExceptionLine?: (ctx: ExceptionLineContext) => void;
	/**
	 * Exit a parse tree produced by `PythonTracebackParser.exceptionLine`.
	 * @param ctx the parse tree
	 */
	exitExceptionLine?: (ctx: ExceptionLineContext) => void;
}

