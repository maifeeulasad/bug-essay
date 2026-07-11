lexer grammar PythonTracebackLexer;

TRACEBACK
    : 'Traceback (most recent call last):'
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

COLON
    : ':'
    ;

COMMA
    : ','
    ;

INTEGER
    : [0-9]+
    ;

STRING
    : '"' (~["\r\n])* '"'
    ;

IDENTIFIER
    : [A-Za-z_][A-Za-z0-9_.<>-]*
    ;

INDENT
    : '  '
    ;

NEWLINE
    : '\r'? '\n'
    ;

SPACE
    : [ \t]+ -> skip
    ;

TEXT
    : ~[\r\n]+
    ;