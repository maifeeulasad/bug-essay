lexer grammar PythonTracebackLexer;

TRACEBACK
    : 'Traceback (most recent call last):' [ \t]*
    ;

DURING_HANDLING
    : 'During handling of the above exception, another exception occurred:' [ \t]*
    ;

DIRECT_CAUSE
    : 'The above exception was the direct cause of the following exception:' [ \t]*
    ;

// A whole "File "...", line N, in name" line, captured as one token.
// This is the key fix: by matching to the end of the line (same as TEXT
// would), it *ties* with TEXT in length, and since it's declared first,
// it wins the tie. FILE/STRING/LINE/NUMBER/IN as separate tokens (the
// original design) could never beat TEXT because they're each shorter
// than the full line TEXT would swallow.
FRAME_LINE
    : [ \t]* 'File "' (~["\r\n])* '", line ' [0-9]+ ', in ' ~[\r\n]*
    ;

// An exception type (optionally "Type: message"), e.g.
// "ValueError: bad input" or "urllib.error.HTTPError: HTTP Error 400: ".
// Same trick: matches to end of line so it ties with, and beats, TEXT.
// NOTE: no leading whitespace on purpose. Python prints exception lines
// at column 0; indented lines that merely look like one (e.g. the frame
// source "lambda: do_something()") must stay TEXT or they terminate the
// traceback block early.
EXCEPTION_LINE
    : [a-zA-Z_][a-zA-Z0-9_]* ('.' [a-zA-Z_][a-zA-Z0-9_]*)* (': ' ~[\r\n]*)?
    ;

// Catch-all for plain output lines and frame source/caret lines.
TEXT
    : ~[\r\n]+
    ;

NEWLINE
    : '\r'? '\n'
    ;

WS
    : [ \t]+ -> skip
    ;