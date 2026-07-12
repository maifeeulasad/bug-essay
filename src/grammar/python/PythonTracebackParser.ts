// Generated from src/grammar/python/PythonTracebackParser.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import PythonTracebackParserListener from "./PythonTracebackParserListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class PythonTracebackParser extends Parser {
	public static readonly TRACEBACK = 1;
	public static readonly DURING_HANDLING = 2;
	public static readonly DIRECT_CAUSE = 3;
	public static readonly FRAME_LINE = 4;
	public static readonly EXCEPTION_LINE = 5;
	public static readonly TEXT = 6;
	public static readonly NEWLINE = 7;
	public static readonly WS = 8;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_log = 0;
	public static readonly RULE_entry = 1;
	public static readonly RULE_outputLine = 2;
	public static readonly RULE_tracebackChain = 3;
	public static readonly RULE_transition = 4;
	public static readonly RULE_tracebackBlock = 5;
	public static readonly RULE_tracebackHeader = 6;
	public static readonly RULE_frame = 7;
	public static readonly RULE_sourceLine = 8;
	public static readonly RULE_exceptionLine = 9;
	public static readonly literalNames: (string | null)[] = [  ];
	public static readonly symbolicNames: (string | null)[] = [ null, "TRACEBACK", 
                                                             "DURING_HANDLING", 
                                                             "DIRECT_CAUSE", 
                                                             "FRAME_LINE", 
                                                             "EXCEPTION_LINE", 
                                                             "TEXT", "NEWLINE", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"log", "entry", "outputLine", "tracebackChain", "transition", "tracebackBlock", 
		"tracebackHeader", "frame", "sourceLine", "exceptionLine",
	];
	public get grammarFileName(): string { return "PythonTracebackParser.g4"; }
	public get literalNames(): (string | null)[] { return PythonTracebackParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return PythonTracebackParser.symbolicNames; }
	public get ruleNames(): string[] { return PythonTracebackParser.ruleNames; }
	public get serializedATN(): number[] { return PythonTracebackParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, PythonTracebackParser._ATN, PythonTracebackParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public log(): LogContext {
		let localctx: LogContext = new LogContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, PythonTracebackParser.RULE_log);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 23;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1 || _la===6) {
				{
				{
				this.state = 20;
				this.entry();
				}
				}
				this.state = 25;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 26;
			this.match(PythonTracebackParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public entry(): EntryContext {
		let localctx: EntryContext = new EntryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, PythonTracebackParser.RULE_entry);
		try {
			this.state = 30;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 28;
				this.tracebackChain();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 29;
				this.outputLine();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public outputLine(): OutputLineContext {
		let localctx: OutputLineContext = new OutputLineContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, PythonTracebackParser.RULE_outputLine);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 32;
			this.match(PythonTracebackParser.TEXT);
			this.state = 33;
			this.match(PythonTracebackParser.NEWLINE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tracebackChain(): TracebackChainContext {
		let localctx: TracebackChainContext = new TracebackChainContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, PythonTracebackParser.RULE_tracebackChain);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 35;
			this.tracebackBlock();
			this.state = 41;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2 || _la===3) {
				{
				{
				this.state = 36;
				this.transition();
				this.state = 37;
				this.tracebackBlock();
				}
				}
				this.state = 43;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public transition(): TransitionContext {
		let localctx: TransitionContext = new TransitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, PythonTracebackParser.RULE_transition);
		let _la: number;
		try {
			this.state = 56;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 44;
				this.match(PythonTracebackParser.DURING_HANDLING);
				this.state = 46;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 45;
					this.match(PythonTracebackParser.NEWLINE);
					}
					}
					this.state = 48;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===7);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 50;
				this.match(PythonTracebackParser.DIRECT_CAUSE);
				this.state = 52;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 51;
					this.match(PythonTracebackParser.NEWLINE);
					}
					}
					this.state = 54;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===7);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tracebackBlock(): TracebackBlockContext {
		let localctx: TracebackBlockContext = new TracebackBlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, PythonTracebackParser.RULE_tracebackBlock);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 58;
			this.tracebackHeader();
			this.state = 62;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===4) {
				{
				{
				this.state = 59;
				this.frame();
				}
				}
				this.state = 64;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 65;
			this.exceptionLine();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tracebackHeader(): TracebackHeaderContext {
		let localctx: TracebackHeaderContext = new TracebackHeaderContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, PythonTracebackParser.RULE_tracebackHeader);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 67;
			this.match(PythonTracebackParser.TRACEBACK);
			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 68;
				this.match(PythonTracebackParser.NEWLINE);
				}
				}
				this.state = 71;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===7);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public frame(): FrameContext {
		let localctx: FrameContext = new FrameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, PythonTracebackParser.RULE_frame);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 73;
			this.match(PythonTracebackParser.FRAME_LINE);
			this.state = 74;
			this.match(PythonTracebackParser.NEWLINE);
			this.state = 78;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===6) {
				{
				{
				this.state = 75;
				this.sourceLine();
				}
				}
				this.state = 80;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sourceLine(): SourceLineContext {
		let localctx: SourceLineContext = new SourceLineContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, PythonTracebackParser.RULE_sourceLine);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 81;
			this.match(PythonTracebackParser.TEXT);
			this.state = 82;
			this.match(PythonTracebackParser.NEWLINE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public exceptionLine(): ExceptionLineContext {
		let localctx: ExceptionLineContext = new ExceptionLineContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, PythonTracebackParser.RULE_exceptionLine);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 84;
			this.match(PythonTracebackParser.EXCEPTION_LINE);
			this.state = 88;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===7) {
				{
				{
				this.state = 85;
				this.match(PythonTracebackParser.NEWLINE);
				}
				}
				this.state = 90;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,8,92,2,0,7,0,2,1,
	7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,1,0,
	5,0,22,8,0,10,0,12,0,25,9,0,1,0,1,0,1,1,1,1,3,1,31,8,1,1,2,1,2,1,2,1,3,
	1,3,1,3,1,3,5,3,40,8,3,10,3,12,3,43,9,3,1,4,1,4,4,4,47,8,4,11,4,12,4,48,
	1,4,1,4,4,4,53,8,4,11,4,12,4,54,3,4,57,8,4,1,5,1,5,5,5,61,8,5,10,5,12,5,
	64,9,5,1,5,1,5,1,6,1,6,4,6,70,8,6,11,6,12,6,71,1,7,1,7,1,7,5,7,77,8,7,10,
	7,12,7,80,9,7,1,8,1,8,1,8,1,9,1,9,5,9,87,8,9,10,9,12,9,90,9,9,1,9,0,0,10,
	0,2,4,6,8,10,12,14,16,18,0,0,91,0,23,1,0,0,0,2,30,1,0,0,0,4,32,1,0,0,0,
	6,35,1,0,0,0,8,56,1,0,0,0,10,58,1,0,0,0,12,67,1,0,0,0,14,73,1,0,0,0,16,
	81,1,0,0,0,18,84,1,0,0,0,20,22,3,2,1,0,21,20,1,0,0,0,22,25,1,0,0,0,23,21,
	1,0,0,0,23,24,1,0,0,0,24,26,1,0,0,0,25,23,1,0,0,0,26,27,5,0,0,1,27,1,1,
	0,0,0,28,31,3,6,3,0,29,31,3,4,2,0,30,28,1,0,0,0,30,29,1,0,0,0,31,3,1,0,
	0,0,32,33,5,6,0,0,33,34,5,7,0,0,34,5,1,0,0,0,35,41,3,10,5,0,36,37,3,8,4,
	0,37,38,3,10,5,0,38,40,1,0,0,0,39,36,1,0,0,0,40,43,1,0,0,0,41,39,1,0,0,
	0,41,42,1,0,0,0,42,7,1,0,0,0,43,41,1,0,0,0,44,46,5,2,0,0,45,47,5,7,0,0,
	46,45,1,0,0,0,47,48,1,0,0,0,48,46,1,0,0,0,48,49,1,0,0,0,49,57,1,0,0,0,50,
	52,5,3,0,0,51,53,5,7,0,0,52,51,1,0,0,0,53,54,1,0,0,0,54,52,1,0,0,0,54,55,
	1,0,0,0,55,57,1,0,0,0,56,44,1,0,0,0,56,50,1,0,0,0,57,9,1,0,0,0,58,62,3,
	12,6,0,59,61,3,14,7,0,60,59,1,0,0,0,61,64,1,0,0,0,62,60,1,0,0,0,62,63,1,
	0,0,0,63,65,1,0,0,0,64,62,1,0,0,0,65,66,3,18,9,0,66,11,1,0,0,0,67,69,5,
	1,0,0,68,70,5,7,0,0,69,68,1,0,0,0,70,71,1,0,0,0,71,69,1,0,0,0,71,72,1,0,
	0,0,72,13,1,0,0,0,73,74,5,4,0,0,74,78,5,7,0,0,75,77,3,16,8,0,76,75,1,0,
	0,0,77,80,1,0,0,0,78,76,1,0,0,0,78,79,1,0,0,0,79,15,1,0,0,0,80,78,1,0,0,
	0,81,82,5,6,0,0,82,83,5,7,0,0,83,17,1,0,0,0,84,88,5,5,0,0,85,87,5,7,0,0,
	86,85,1,0,0,0,87,90,1,0,0,0,88,86,1,0,0,0,88,89,1,0,0,0,89,19,1,0,0,0,90,
	88,1,0,0,0,10,23,30,41,48,54,56,62,71,78,88];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PythonTracebackParser.__ATN) {
			PythonTracebackParser.__ATN = new ATNDeserializer().deserialize(PythonTracebackParser._serializedATN);
		}

		return PythonTracebackParser.__ATN;
	}


	static DecisionsToDFA = PythonTracebackParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class LogContext extends ParserRuleContext {
	constructor(parser?: PythonTracebackParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(PythonTracebackParser.EOF, 0);
	}
	public entry_list(): EntryContext[] {
		return this.getTypedRuleContexts(EntryContext) as EntryContext[];
	}
	public entry(i: number): EntryContext {
		return this.getTypedRuleContext(EntryContext, i) as EntryContext;
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_log;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterLog) {
	 		listener.enterLog(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitLog) {
	 		listener.exitLog(this);
		}
	}
}


export class EntryContext extends ParserRuleContext {
	constructor(parser?: PythonTracebackParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public tracebackChain(): TracebackChainContext {
		return this.getTypedRuleContext(TracebackChainContext, 0) as TracebackChainContext;
	}
	public outputLine(): OutputLineContext {
		return this.getTypedRuleContext(OutputLineContext, 0) as OutputLineContext;
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_entry;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterEntry) {
	 		listener.enterEntry(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitEntry) {
	 		listener.exitEntry(this);
		}
	}
}


export class OutputLineContext extends ParserRuleContext {
	constructor(parser?: PythonTracebackParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TEXT(): TerminalNode {
		return this.getToken(PythonTracebackParser.TEXT, 0);
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(PythonTracebackParser.NEWLINE, 0);
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_outputLine;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterOutputLine) {
	 		listener.enterOutputLine(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitOutputLine) {
	 		listener.exitOutputLine(this);
		}
	}
}


export class TracebackChainContext extends ParserRuleContext {
	constructor(parser?: PythonTracebackParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public tracebackBlock_list(): TracebackBlockContext[] {
		return this.getTypedRuleContexts(TracebackBlockContext) as TracebackBlockContext[];
	}
	public tracebackBlock(i: number): TracebackBlockContext {
		return this.getTypedRuleContext(TracebackBlockContext, i) as TracebackBlockContext;
	}
	public transition_list(): TransitionContext[] {
		return this.getTypedRuleContexts(TransitionContext) as TransitionContext[];
	}
	public transition(i: number): TransitionContext {
		return this.getTypedRuleContext(TransitionContext, i) as TransitionContext;
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_tracebackChain;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterTracebackChain) {
	 		listener.enterTracebackChain(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitTracebackChain) {
	 		listener.exitTracebackChain(this);
		}
	}
}


export class TransitionContext extends ParserRuleContext {
	constructor(parser?: PythonTracebackParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DURING_HANDLING(): TerminalNode {
		return this.getToken(PythonTracebackParser.DURING_HANDLING, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(PythonTracebackParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(PythonTracebackParser.NEWLINE, i);
	}
	public DIRECT_CAUSE(): TerminalNode {
		return this.getToken(PythonTracebackParser.DIRECT_CAUSE, 0);
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_transition;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterTransition) {
	 		listener.enterTransition(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitTransition) {
	 		listener.exitTransition(this);
		}
	}
}


export class TracebackBlockContext extends ParserRuleContext {
	constructor(parser?: PythonTracebackParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public tracebackHeader(): TracebackHeaderContext {
		return this.getTypedRuleContext(TracebackHeaderContext, 0) as TracebackHeaderContext;
	}
	public exceptionLine(): ExceptionLineContext {
		return this.getTypedRuleContext(ExceptionLineContext, 0) as ExceptionLineContext;
	}
	public frame_list(): FrameContext[] {
		return this.getTypedRuleContexts(FrameContext) as FrameContext[];
	}
	public frame(i: number): FrameContext {
		return this.getTypedRuleContext(FrameContext, i) as FrameContext;
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_tracebackBlock;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterTracebackBlock) {
	 		listener.enterTracebackBlock(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitTracebackBlock) {
	 		listener.exitTracebackBlock(this);
		}
	}
}


export class TracebackHeaderContext extends ParserRuleContext {
	constructor(parser?: PythonTracebackParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TRACEBACK(): TerminalNode {
		return this.getToken(PythonTracebackParser.TRACEBACK, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(PythonTracebackParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(PythonTracebackParser.NEWLINE, i);
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_tracebackHeader;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterTracebackHeader) {
	 		listener.enterTracebackHeader(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitTracebackHeader) {
	 		listener.exitTracebackHeader(this);
		}
	}
}


export class FrameContext extends ParserRuleContext {
	constructor(parser?: PythonTracebackParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FRAME_LINE(): TerminalNode {
		return this.getToken(PythonTracebackParser.FRAME_LINE, 0);
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(PythonTracebackParser.NEWLINE, 0);
	}
	public sourceLine_list(): SourceLineContext[] {
		return this.getTypedRuleContexts(SourceLineContext) as SourceLineContext[];
	}
	public sourceLine(i: number): SourceLineContext {
		return this.getTypedRuleContext(SourceLineContext, i) as SourceLineContext;
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_frame;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterFrame) {
	 		listener.enterFrame(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitFrame) {
	 		listener.exitFrame(this);
		}
	}
}


export class SourceLineContext extends ParserRuleContext {
	constructor(parser?: PythonTracebackParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TEXT(): TerminalNode {
		return this.getToken(PythonTracebackParser.TEXT, 0);
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(PythonTracebackParser.NEWLINE, 0);
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_sourceLine;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterSourceLine) {
	 		listener.enterSourceLine(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitSourceLine) {
	 		listener.exitSourceLine(this);
		}
	}
}


export class ExceptionLineContext extends ParserRuleContext {
	constructor(parser?: PythonTracebackParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EXCEPTION_LINE(): TerminalNode {
		return this.getToken(PythonTracebackParser.EXCEPTION_LINE, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(PythonTracebackParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(PythonTracebackParser.NEWLINE, i);
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_exceptionLine;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterExceptionLine) {
	 		listener.enterExceptionLine(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitExceptionLine) {
	 		listener.exitExceptionLine(this);
		}
	}
}
