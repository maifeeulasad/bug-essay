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
	public static readonly FILE = 4;
	public static readonly LINE = 5;
	public static readonly IN = 6;
	public static readonly COMMA = 7;
	public static readonly COLON = 8;
	public static readonly DOT = 9;
	public static readonly STRING = 10;
	public static readonly NUMBER = 11;
	public static readonly IDENTIFIER = 12;
	public static readonly TEXT = 13;
	public static readonly NEWLINE = 14;
	public static readonly WS = 15;
	public static readonly LESSTHAN = 16;
	public static readonly GREATERTHAN = 17;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_log = 0;
	public static readonly RULE_entry = 1;
	public static readonly RULE_outputLine = 2;
	public static readonly RULE_tracebackChain = 3;
	public static readonly RULE_transition = 4;
	public static readonly RULE_tracebackBlock = 5;
	public static readonly RULE_tracebackHeader = 6;
	public static readonly RULE_frame = 7;
	public static readonly RULE_functionName = 8;
	public static readonly RULE_qualifiedName = 9;
	public static readonly RULE_sourceLine = 10;
	public static readonly RULE_exceptionLine = 11;
	public static readonly literalNames: (string | null)[] = [ null, "'Traceback (most recent call last):'", 
                                                            "'During handling of the above exception, another exception occurred:'", 
                                                            "'The above exception was the direct cause of the following exception:'", 
                                                            "'File'", "'line'", 
                                                            "'in'", "','", 
                                                            "':'", "'.'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'<'", "'>'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "TRACEBACK", 
                                                             "DURING_HANDLING", 
                                                             "DIRECT_CAUSE", 
                                                             "FILE", "LINE", 
                                                             "IN", "COMMA", 
                                                             "COLON", "DOT", 
                                                             "STRING", "NUMBER", 
                                                             "IDENTIFIER", 
                                                             "TEXT", "NEWLINE", 
                                                             "WS", "LESSTHAN", 
                                                             "GREATERTHAN" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"log", "entry", "outputLine", "tracebackChain", "transition", "tracebackBlock", 
		"tracebackHeader", "frame", "functionName", "qualifiedName", "sourceLine", 
		"exceptionLine",
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
			this.state = 27;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1 || _la===13) {
				{
				{
				this.state = 24;
				this.entry();
				}
				}
				this.state = 29;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 30;
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
			this.state = 34;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 32;
				this.tracebackChain();
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 33;
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
			this.state = 36;
			this.match(PythonTracebackParser.TEXT);
			this.state = 37;
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
			this.state = 39;
			this.tracebackBlock();
			this.state = 45;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2 || _la===3) {
				{
				{
				this.state = 40;
				this.transition();
				this.state = 41;
				this.tracebackBlock();
				}
				}
				this.state = 47;
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
			this.state = 60;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 48;
				this.match(PythonTracebackParser.DURING_HANDLING);
				this.state = 50;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 49;
					this.match(PythonTracebackParser.NEWLINE);
					}
					}
					this.state = 52;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===14);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 54;
				this.match(PythonTracebackParser.DIRECT_CAUSE);
				this.state = 56;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 55;
					this.match(PythonTracebackParser.NEWLINE);
					}
					}
					this.state = 58;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===14);
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
			this.state = 62;
			this.tracebackHeader();
			this.state = 66;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===4) {
				{
				{
				this.state = 63;
				this.frame();
				}
				}
				this.state = 68;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 69;
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
			this.state = 71;
			this.match(PythonTracebackParser.TRACEBACK);
			this.state = 73;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 72;
				this.match(PythonTracebackParser.NEWLINE);
				}
				}
				this.state = 75;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===14);
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
			this.state = 77;
			this.match(PythonTracebackParser.FILE);
			this.state = 78;
			this.match(PythonTracebackParser.STRING);
			this.state = 79;
			this.match(PythonTracebackParser.COMMA);
			this.state = 80;
			this.match(PythonTracebackParser.LINE);
			this.state = 81;
			this.match(PythonTracebackParser.NUMBER);
			this.state = 82;
			this.match(PythonTracebackParser.COMMA);
			this.state = 83;
			this.match(PythonTracebackParser.IN);
			this.state = 84;
			this.functionName();
			this.state = 85;
			this.match(PythonTracebackParser.NEWLINE);
			this.state = 87;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===13) {
				{
				this.state = 86;
				this.sourceLine();
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
	// @RuleVersion(0)
	public functionName(): FunctionNameContext {
		let localctx: FunctionNameContext = new FunctionNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, PythonTracebackParser.RULE_functionName);
		try {
			this.state = 93;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 89;
				this.qualifiedName();
				}
				break;
			case 16:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 90;
				this.match(PythonTracebackParser.LESSTHAN);
				this.state = 91;
				this.match(PythonTracebackParser.TEXT);
				this.state = 92;
				this.match(PythonTracebackParser.GREATERTHAN);
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
	public qualifiedName(): QualifiedNameContext {
		let localctx: QualifiedNameContext = new QualifiedNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, PythonTracebackParser.RULE_qualifiedName);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 95;
			this.match(PythonTracebackParser.IDENTIFIER);
			this.state = 100;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===9) {
				{
				{
				this.state = 96;
				this.match(PythonTracebackParser.DOT);
				this.state = 97;
				this.match(PythonTracebackParser.IDENTIFIER);
				}
				}
				this.state = 102;
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
		this.enterRule(localctx, 20, PythonTracebackParser.RULE_sourceLine);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 103;
			this.match(PythonTracebackParser.TEXT);
			this.state = 104;
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
		this.enterRule(localctx, 22, PythonTracebackParser.RULE_exceptionLine);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 106;
			this.qualifiedName();
			this.state = 109;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===8) {
				{
				this.state = 107;
				this.match(PythonTracebackParser.COLON);
				this.state = 108;
				this.match(PythonTracebackParser.TEXT);
				}
			}

			this.state = 114;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===14) {
				{
				{
				this.state = 111;
				this.match(PythonTracebackParser.NEWLINE);
				}
				}
				this.state = 116;
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

	public static readonly _serializedATN: number[] = [4,1,17,118,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,1,0,5,0,26,8,0,10,0,12,0,29,9,0,1,0,1,0,1,1,1,1,3,1,35,
	8,1,1,2,1,2,1,2,1,3,1,3,1,3,1,3,5,3,44,8,3,10,3,12,3,47,9,3,1,4,1,4,4,4,
	51,8,4,11,4,12,4,52,1,4,1,4,4,4,57,8,4,11,4,12,4,58,3,4,61,8,4,1,5,1,5,
	5,5,65,8,5,10,5,12,5,68,9,5,1,5,1,5,1,6,1,6,4,6,74,8,6,11,6,12,6,75,1,7,
	1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,88,8,7,1,8,1,8,1,8,1,8,3,8,94,8,
	8,1,9,1,9,1,9,5,9,99,8,9,10,9,12,9,102,9,9,1,10,1,10,1,10,1,11,1,11,1,11,
	3,11,110,8,11,1,11,5,11,113,8,11,10,11,12,11,116,9,11,1,11,0,0,12,0,2,4,
	6,8,10,12,14,16,18,20,22,0,0,118,0,27,1,0,0,0,2,34,1,0,0,0,4,36,1,0,0,0,
	6,39,1,0,0,0,8,60,1,0,0,0,10,62,1,0,0,0,12,71,1,0,0,0,14,77,1,0,0,0,16,
	93,1,0,0,0,18,95,1,0,0,0,20,103,1,0,0,0,22,106,1,0,0,0,24,26,3,2,1,0,25,
	24,1,0,0,0,26,29,1,0,0,0,27,25,1,0,0,0,27,28,1,0,0,0,28,30,1,0,0,0,29,27,
	1,0,0,0,30,31,5,0,0,1,31,1,1,0,0,0,32,35,3,6,3,0,33,35,3,4,2,0,34,32,1,
	0,0,0,34,33,1,0,0,0,35,3,1,0,0,0,36,37,5,13,0,0,37,38,5,14,0,0,38,5,1,0,
	0,0,39,45,3,10,5,0,40,41,3,8,4,0,41,42,3,10,5,0,42,44,1,0,0,0,43,40,1,0,
	0,0,44,47,1,0,0,0,45,43,1,0,0,0,45,46,1,0,0,0,46,7,1,0,0,0,47,45,1,0,0,
	0,48,50,5,2,0,0,49,51,5,14,0,0,50,49,1,0,0,0,51,52,1,0,0,0,52,50,1,0,0,
	0,52,53,1,0,0,0,53,61,1,0,0,0,54,56,5,3,0,0,55,57,5,14,0,0,56,55,1,0,0,
	0,57,58,1,0,0,0,58,56,1,0,0,0,58,59,1,0,0,0,59,61,1,0,0,0,60,48,1,0,0,0,
	60,54,1,0,0,0,61,9,1,0,0,0,62,66,3,12,6,0,63,65,3,14,7,0,64,63,1,0,0,0,
	65,68,1,0,0,0,66,64,1,0,0,0,66,67,1,0,0,0,67,69,1,0,0,0,68,66,1,0,0,0,69,
	70,3,22,11,0,70,11,1,0,0,0,71,73,5,1,0,0,72,74,5,14,0,0,73,72,1,0,0,0,74,
	75,1,0,0,0,75,73,1,0,0,0,75,76,1,0,0,0,76,13,1,0,0,0,77,78,5,4,0,0,78,79,
	5,10,0,0,79,80,5,7,0,0,80,81,5,5,0,0,81,82,5,11,0,0,82,83,5,7,0,0,83,84,
	5,6,0,0,84,85,3,16,8,0,85,87,5,14,0,0,86,88,3,20,10,0,87,86,1,0,0,0,87,
	88,1,0,0,0,88,15,1,0,0,0,89,94,3,18,9,0,90,91,5,16,0,0,91,92,5,13,0,0,92,
	94,5,17,0,0,93,89,1,0,0,0,93,90,1,0,0,0,94,17,1,0,0,0,95,100,5,12,0,0,96,
	97,5,9,0,0,97,99,5,12,0,0,98,96,1,0,0,0,99,102,1,0,0,0,100,98,1,0,0,0,100,
	101,1,0,0,0,101,19,1,0,0,0,102,100,1,0,0,0,103,104,5,13,0,0,104,105,5,14,
	0,0,105,21,1,0,0,0,106,109,3,18,9,0,107,108,5,8,0,0,108,110,5,13,0,0,109,
	107,1,0,0,0,109,110,1,0,0,0,110,114,1,0,0,0,111,113,5,14,0,0,112,111,1,
	0,0,0,113,116,1,0,0,0,114,112,1,0,0,0,114,115,1,0,0,0,115,23,1,0,0,0,116,
	114,1,0,0,0,13,27,34,45,52,58,60,66,75,87,93,100,109,114];

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
	public NUMBER(): TerminalNode {
		return this.getToken(PythonTracebackParser.NUMBER, 0);
	}
	public IN(): TerminalNode {
		return this.getToken(PythonTracebackParser.IN, 0);
	}
	public functionName(): FunctionNameContext {
		return this.getTypedRuleContext(FunctionNameContext, 0) as FunctionNameContext;
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


export class FunctionNameContext extends ParserRuleContext {
	constructor(parser?: PythonTracebackParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedName(): QualifiedNameContext {
		return this.getTypedRuleContext(QualifiedNameContext, 0) as QualifiedNameContext;
	}
	public LESSTHAN(): TerminalNode {
		return this.getToken(PythonTracebackParser.LESSTHAN, 0);
	}
	public TEXT(): TerminalNode {
		return this.getToken(PythonTracebackParser.TEXT, 0);
	}
	public GREATERTHAN(): TerminalNode {
		return this.getToken(PythonTracebackParser.GREATERTHAN, 0);
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_functionName;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterFunctionName) {
	 		listener.enterFunctionName(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitFunctionName) {
	 		listener.exitFunctionName(this);
		}
	}
}


export class QualifiedNameContext extends ParserRuleContext {
	constructor(parser?: PythonTracebackParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(PythonTracebackParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(PythonTracebackParser.IDENTIFIER, i);
	}
	public DOT_list(): TerminalNode[] {
	    	return this.getTokens(PythonTracebackParser.DOT);
	}
	public DOT(i: number): TerminalNode {
		return this.getToken(PythonTracebackParser.DOT, i);
	}
    public get ruleIndex(): number {
    	return PythonTracebackParser.RULE_qualifiedName;
	}
	public enterRule(listener: PythonTracebackParserListener): void {
	    if(listener.enterQualifiedName) {
	 		listener.enterQualifiedName(this);
		}
	}
	public exitRule(listener: PythonTracebackParserListener): void {
	    if(listener.exitQualifiedName) {
	 		listener.exitQualifiedName(this);
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
	public qualifiedName(): QualifiedNameContext {
		return this.getTypedRuleContext(QualifiedNameContext, 0) as QualifiedNameContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(PythonTracebackParser.COLON, 0);
	}
	public TEXT(): TerminalNode {
		return this.getToken(PythonTracebackParser.TEXT, 0);
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
