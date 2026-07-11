parser grammar PythonTracebackParser;

options {
    tokenVocab=PythonTracebackLexer;
}

traceback
    : tracebackHeader
      frame*
      exceptionLine
      EOF
    ;

tracebackHeader
    : TRACEBACK NEWLINE
    ;

frame
    : INDENT
      FILE
      STRING
      COMMA
      LINE
      INTEGER
      COMMA
      IN
      IDENTIFIER
      NEWLINE
      sourceLine?
    ;

sourceLine
    : INDENT INDENT TEXT NEWLINE
    ;

exceptionLine
    : IDENTIFIER
      (COLON TEXT)?
      NEWLINE?
    ;