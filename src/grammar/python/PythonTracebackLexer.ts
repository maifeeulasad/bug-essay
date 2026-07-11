// Generated from src/grammar/python/PythonTracebackLexer.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class PythonTracebackLexer extends Lexer {
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
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
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
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"TRACEBACK", "FILE", "LINE", "IN", "COLON", "COMMA", "INTEGER", "STRING", 
		"IDENTIFIER", "INDENT", "NEWLINE", "SPACE", "TEXT",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, PythonTracebackLexer._ATN, PythonTracebackLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "PythonTracebackLexer.g4"; }

	public get literalNames(): (string | null)[] { return PythonTracebackLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return PythonTracebackLexer.symbolicNames; }
	public get ruleNames(): string[] { return PythonTracebackLexer.ruleNames; }

	public get serializedATN(): number[] { return PythonTracebackLexer._serializedATN; }

	public get channelNames(): string[] { return PythonTracebackLexer.channelNames; }

	public get modeNames(): string[] { return PythonTracebackLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,13,120,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,
	3,1,3,1,3,1,4,1,4,1,5,1,5,1,6,4,6,81,8,6,11,6,12,6,82,1,7,1,7,5,7,87,8,
	7,10,7,12,7,90,9,7,1,7,1,7,1,8,1,8,5,8,96,8,8,10,8,12,8,99,9,8,1,9,1,9,
	1,9,1,10,3,10,105,8,10,1,10,1,10,1,11,4,11,110,8,11,11,11,12,11,111,1,11,
	1,11,1,12,4,12,117,8,12,11,12,12,12,118,0,0,13,1,1,3,2,5,3,7,4,9,5,11,6,
	13,7,15,8,17,9,19,10,21,11,23,12,25,13,1,0,6,1,0,48,57,3,0,10,10,13,13,
	34,34,3,0,65,90,95,95,97,122,7,0,45,46,48,57,60,60,62,62,65,90,95,95,97,
	122,2,0,9,9,32,32,2,0,10,10,13,13,125,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,
	0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,
	0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,1,27,1,0,0,0,
	3,62,1,0,0,0,5,67,1,0,0,0,7,72,1,0,0,0,9,75,1,0,0,0,11,77,1,0,0,0,13,80,
	1,0,0,0,15,84,1,0,0,0,17,93,1,0,0,0,19,100,1,0,0,0,21,104,1,0,0,0,23,109,
	1,0,0,0,25,116,1,0,0,0,27,28,5,84,0,0,28,29,5,114,0,0,29,30,5,97,0,0,30,
	31,5,99,0,0,31,32,5,101,0,0,32,33,5,98,0,0,33,34,5,97,0,0,34,35,5,99,0,
	0,35,36,5,107,0,0,36,37,5,32,0,0,37,38,5,40,0,0,38,39,5,109,0,0,39,40,5,
	111,0,0,40,41,5,115,0,0,41,42,5,116,0,0,42,43,5,32,0,0,43,44,5,114,0,0,
	44,45,5,101,0,0,45,46,5,99,0,0,46,47,5,101,0,0,47,48,5,110,0,0,48,49,5,
	116,0,0,49,50,5,32,0,0,50,51,5,99,0,0,51,52,5,97,0,0,52,53,5,108,0,0,53,
	54,5,108,0,0,54,55,5,32,0,0,55,56,5,108,0,0,56,57,5,97,0,0,57,58,5,115,
	0,0,58,59,5,116,0,0,59,60,5,41,0,0,60,61,5,58,0,0,61,2,1,0,0,0,62,63,5,
	70,0,0,63,64,5,105,0,0,64,65,5,108,0,0,65,66,5,101,0,0,66,4,1,0,0,0,67,
	68,5,108,0,0,68,69,5,105,0,0,69,70,5,110,0,0,70,71,5,101,0,0,71,6,1,0,0,
	0,72,73,5,105,0,0,73,74,5,110,0,0,74,8,1,0,0,0,75,76,5,58,0,0,76,10,1,0,
	0,0,77,78,5,44,0,0,78,12,1,0,0,0,79,81,7,0,0,0,80,79,1,0,0,0,81,82,1,0,
	0,0,82,80,1,0,0,0,82,83,1,0,0,0,83,14,1,0,0,0,84,88,5,34,0,0,85,87,8,1,
	0,0,86,85,1,0,0,0,87,90,1,0,0,0,88,86,1,0,0,0,88,89,1,0,0,0,89,91,1,0,0,
	0,90,88,1,0,0,0,91,92,5,34,0,0,92,16,1,0,0,0,93,97,7,2,0,0,94,96,7,3,0,
	0,95,94,1,0,0,0,96,99,1,0,0,0,97,95,1,0,0,0,97,98,1,0,0,0,98,18,1,0,0,0,
	99,97,1,0,0,0,100,101,5,32,0,0,101,102,5,32,0,0,102,20,1,0,0,0,103,105,
	5,13,0,0,104,103,1,0,0,0,104,105,1,0,0,0,105,106,1,0,0,0,106,107,5,10,0,
	0,107,22,1,0,0,0,108,110,7,4,0,0,109,108,1,0,0,0,110,111,1,0,0,0,111,109,
	1,0,0,0,111,112,1,0,0,0,112,113,1,0,0,0,113,114,6,11,0,0,114,24,1,0,0,0,
	115,117,8,5,0,0,116,115,1,0,0,0,117,118,1,0,0,0,118,116,1,0,0,0,118,119,
	1,0,0,0,119,26,1,0,0,0,7,0,82,88,97,104,111,118,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PythonTracebackLexer.__ATN) {
			PythonTracebackLexer.__ATN = new ATNDeserializer().deserialize(PythonTracebackLexer._serializedATN);
		}

		return PythonTracebackLexer.__ATN;
	}


	static DecisionsToDFA = PythonTracebackLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}