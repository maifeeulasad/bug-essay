lexer grammar PythonTracebackLexer;

TRACEBACK
    : 'Traceback (most recent call last):'
    ;

DURING_HANDLING
    : 'During handling of the above exception, another exception occurred:'
    ;

DIRECT_CAUSE
    : 'The above exception was the direct cause of the following exception:'
    ;

FILE
    : 'File'
    ;

LINE
    : 'line'
    ;

IN
    : 'in'
    ;

COMMA
    : ','
    ;

COLON
    : ':'
    ;

DOT
    : '.'
    ;

STRING
    : '"' (~["\r\n])* '"'
    ;

NUMBER
    : [0-9]+
    ;

IDENTIFIER
    : [a-zA-Z_][a-zA-Z0-9_]*
    ;

TEXT
    : ~[\r\n]+
    ;

NEWLINE
    : '\r'? '\n'
    ;

WS
    : [ \t]+ -> skip
    ;

LESSTHAN
    : '<'
    ;

GREATERTHAN
    : '>'
    ;