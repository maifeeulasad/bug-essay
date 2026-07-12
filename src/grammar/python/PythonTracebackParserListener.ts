// Generated from src/grammar/python/PythonTracebackParser.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { LogContext } from "./PythonTracebackParser.js";
import { EntryContext } from "./PythonTracebackParser.js";
import { OutputLineContext } from "./PythonTracebackParser.js";
import { TracebackChainContext } from "./PythonTracebackParser.js";
import { TransitionContext } from "./PythonTracebackParser.js";
import { TracebackBlockContext } from "./PythonTracebackParser.js";
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
	 * Enter a parse tree produced by `PythonTracebackParser.log`.
	 * @param ctx the parse tree
	 */
	enterLog?: (ctx: LogContext) => void;
	/**
	 * Exit a parse tree produced by `PythonTracebackParser.log`.
	 * @param ctx the parse tree
	 */
	exitLog?: (ctx: LogContext) => void;
	/**
	 * Enter a parse tree produced by `PythonTracebackParser.entry`.
	 * @param ctx the parse tree
	 */
	enterEntry?: (ctx: EntryContext) => void;
	/**
	 * Exit a parse tree produced by `PythonTracebackParser.entry`.
	 * @param ctx the parse tree
	 */
	exitEntry?: (ctx: EntryContext) => void;
	/**
	 * Enter a parse tree produced by `PythonTracebackParser.outputLine`.
	 * @param ctx the parse tree
	 */
	enterOutputLine?: (ctx: OutputLineContext) => void;
	/**
	 * Exit a parse tree produced by `PythonTracebackParser.outputLine`.
	 * @param ctx the parse tree
	 */
	exitOutputLine?: (ctx: OutputLineContext) => void;
	/**
	 * Enter a parse tree produced by `PythonTracebackParser.tracebackChain`.
	 * @param ctx the parse tree
	 */
	enterTracebackChain?: (ctx: TracebackChainContext) => void;
	/**
	 * Exit a parse tree produced by `PythonTracebackParser.tracebackChain`.
	 * @param ctx the parse tree
	 */
	exitTracebackChain?: (ctx: TracebackChainContext) => void;
	/**
	 * Enter a parse tree produced by `PythonTracebackParser.transition`.
	 * @param ctx the parse tree
	 */
	enterTransition?: (ctx: TransitionContext) => void;
	/**
	 * Exit a parse tree produced by `PythonTracebackParser.transition`.
	 * @param ctx the parse tree
	 */
	exitTransition?: (ctx: TransitionContext) => void;
	/**
	 * Enter a parse tree produced by `PythonTracebackParser.tracebackBlock`.
	 * @param ctx the parse tree
	 */
	enterTracebackBlock?: (ctx: TracebackBlockContext) => void;
	/**
	 * Exit a parse tree produced by `PythonTracebackParser.tracebackBlock`.
	 * @param ctx the parse tree
	 */
	exitTracebackBlock?: (ctx: TracebackBlockContext) => void;
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

