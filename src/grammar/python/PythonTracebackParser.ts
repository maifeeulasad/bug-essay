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
	public static readonly FILE = 2;
	public static readonly LINE = 3;
	public static readonly IN = 4;
	public static readonly COLON = 5;
	public static readonly COMMA = 6;
	public static readonly INTEGER = 7;
	public static readonly STRING = 8;
	public static readonly IDENTIFIER = 9;
	public static readonly INDENT = 10;
	public static readonly NEWLINE = 11;
	public static readonly SPACE = 12;
	public static readonly TEXT = 13;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_traceback = 0;
	public static readonly RULE_tracebackHeader = 1;
	public static readonly RULE_frame = 2;
	public static readonly RULE_sourceLine = 3;
	public static readonly RULE_exceptionLine = 4;
	public static readonly literalNames: (string | null)[] = [ null, "'Traceback (most recent call last):'", 
                                                            "'File'", "'line'", 
                                                            "'in'", "':'", 
                                                            "','", null, 
                                                            null, null, 
                                                            "'  '" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "TRACEBACK", 
                                                             "FILE", "LINE", 
                                                             "IN", "COLON", 
                                                             "COMMA", "INTEGER", 
                                                             "STRING", "IDENTIFIER", 
                                                             "INDENT", "NEWLINE", 
                                                             "SPACE", "TEXT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"traceback", "tracebackHeader", "frame", "sourceLine", "exceptionLine",
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
	public traceback(): TracebackContext {
		let localctx: TracebackContext = new TracebackContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, PythonTracebackParser.RULE_traceback);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 10;
			this.tracebackHeader();
			this.state = 14;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===10) {
				{
				{
				this.state = 11;
				this.frame();
				}
				}
				this.state = 16;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 17;
			this.exceptionLine();
			this.state = 18;
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
	public tracebackHeader(): TracebackHeaderContext {
		let localctx: TracebackHeaderContext = new TracebackHeaderContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, PythonTracebackParser.RULE_tracebackHeader);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 20;
			this.match(PythonTracebackParser.TRACEBACK);
			this.state = 21;
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
	public frame(): FrameContext {
		let localctx: FrameContext = new FrameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, PythonTracebackParser.RULE_frame);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 23;
			this.match(PythonTracebackParser.INDENT);
			this.state = 24;
			this.match(PythonTracebackParser.FILE);
			this.state = 25;
			this.match(PythonTracebackParser.STRING);
			this.state = 26;
			this.match(PythonTracebackParser.COMMA);
			this.state = 27;
			this.match(PythonTracebackParser.LINE);
			this.state = 28;
			this.match(PythonTracebackParser.INTEGER);
			this.state = 29;
			this.match(PythonTracebackParser.COMMA);
			this.state = 30;
			this.match(PythonTracebackParser.IN);
			this.state = 31;
			this.match(PythonTracebackParser.IDENTIFIER);
			this.state = 32;
			this.match(PythonTracebackParser.NEWLINE);
			this.state = 34;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				this.state = 33;
				this.sourceLine();
				}
				break;
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
		this.enterRule(localctx, 6, PythonTracebackParser.RULE_sourceLine);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 36;
			this.match(PythonTracebackParser.INDENT);
			this.state = 37;
			this.match(PythonTracebackParser.INDENT);
			this.state = 38;
			this.match(PythonTracebackParser.TEXT);
			this.state = 39;
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
		this.enterRule(localctx, 8, PythonTracebackParser.RULE_exceptionLine);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 41;
			this.match(PythonTracebackParser.IDENTIFIER);
			this.state = 44;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5) {
				{
				this.state = 42;
				this.match(PythonTracebackParser.COLON);
				this.state = 43;
				this.match(PythonTracebackParser.TEXT);
				}
			}

			this.state = 47;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===11) {
				{
				this.state = 46;
				this.match(PythonTracebackParser.NEWLINE);
				}
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

	public static readonly _serializedATN: number[] = [4,1,13,50,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,1,0,1,0,5,0,13,8,0,10,0,12,0,16,9,0,1,0,1,
	0,1,0,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,35,8,
	2,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,3,4,45,8,4,1,4,3,4,48,8,4,1,4,0,0,5,0,
	2,4,6,8,0,0,48,0,10,1,0,0,0,2,20,1,0,0,0,4,23,1,0,0,0,6,36,1,0,0,0,8,41,
	1,0,0,0,10,14,3,2,1,0,11,13,3,4,2,0,12,11,1,0,0,0,13,16,1,0,0,0,14,12,1,
	0,0,0,14,15,1,0,0,0,15,17,1,0,0,0,16,14,1,0,0,0,17,18,3,8,4,0,18,19,5,0,
	0,1,19,1,1,0,0,0,20,21,5,1,0,0,21,22,5,11,0,0,22,3,1,0,0,0,23,24,5,10,0,
	0,24,25,5,2,0,0,25,26,5,8,0,0,26,27,5,6,0,0,27,28,5,3,0,0,28,29,5,7,0,0,
	29,30,5,6,0,0,30,31,5,4,0,0,31,32,5,9,0,0,32,34,5,11,0,0,33,35,3,6,3,0,
	34,33,1,0,0,0,34,35,1,0,0,0,35,5,1,0,0,0,36,37,5,10,0,0,37,38,5,10,0,0,
	38,39,5,13,0,0,39,40,5,11,0,0,40,7,1,0,0,0,41,44,5,9,0,0,42,43,5,5,0,0,
	43,45,5,13,0,0,44,42,1,0,0,0,44,45,1,0,0,0,45,47,1,0,0,0,46,48,5,11,0,0,
	47,46,1,0,0,0,47,48,1,0,0,0,48,9,1,0,0,0,4,14,34,44,47];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PythonTracebackParser.__ATN) {
			PythonTracebackParser.__ATN = new ATNDeserializer().deserialize(PythonTracebackParser._serializedATN);
		}

		return PythonTracebackParser.__ATN;
	}


	static DecisionsToDFA = PythonTracebackParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class TracebackContext extends ParserRuleContext {
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
	public EOF(): TerminalNode {
		return this.getToken(PythonTracebackParser.EOF, 0);
	}
	public frame_list(): FrameContext[] {
		return this.getTypedRuleContexts(FrameContext) as FrameContext[];
	}
	public frame(i: number): FrameContext {
		return this.getTypedRuleContext(FrameContext, i) as FrameContext;
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_traceback;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterTraceback) {
	 		listener.enterTraceback(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitTraceback) {
	 		listener.exitTraceback(this);
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
	public NEWLINE(): TerminalNode {
		return this.getToken(PythonTracebackParser.NEWLINE, 0);
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
	public INDENT(): TerminalNode {
		return this.getToken(PythonTracebackParser.INDENT, 0);
	}
	public FILE(): TerminalNode {
		return this.getToken(PythonTracebackParser.FILE, 0);
	}
	public STRING(): TerminalNode {
		return this.getToken(PythonTracebackParser.STRING, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PythonTracebackParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PythonTracebackParser.COMMA, i);
	}
	public LINE(): TerminalNode {
		return this.getToken(PythonTracebackParser.LINE, 0);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(PythonTracebackParser.INTEGER, 0);
	}
	public IN(): TerminalNode {
		return this.getToken(PythonTracebackParser.IN, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(PythonTracebackParser.IDENTIFIER, 0);
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(PythonTracebackParser.NEWLINE, 0);
	}
	public sourceLine(): SourceLineContext {
		return this.getTypedRuleContext(SourceLineContext, 0) as SourceLineContext;
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
	public INDENT_list(): TerminalNode[] {
	    	return this.getTokens(PythonTracebackParser.INDENT);
	}
	public INDENT(i: number): TerminalNode {
		return this.getToken(PythonTracebackParser.INDENT, i);
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
	public IDENTIFIER(): TerminalNode {
		return this.getToken(PythonTracebackParser.IDENTIFIER, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(PythonTracebackParser.COLON, 0);
	}
	public TEXT(): TerminalNode {
		return this.getToken(PythonTracebackParser.TEXT, 0);
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(PythonTracebackParser.NEWLINE, 0);
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
