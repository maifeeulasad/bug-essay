parser grammar PythonTracebackParser;

options {
    tokenVocab = PythonTracebackLexer;
}

log
    : entry* EOF
    ;

entry
    : tracebackChain
    | outputLine
    ;

outputLine
    : TEXT NEWLINE
    ;

tracebackChain
    : tracebackBlock
      (
          transition
          tracebackBlock
      )*
    ;

transition
    : DURING_HANDLING NEWLINE+
    | DIRECT_CAUSE NEWLINE+
    ;

tracebackBlock
    : tracebackHeader
      frame*
      exceptionLine
    ;

tracebackHeader
    : TRACEBACK NEWLINE+
    ;

frame
    : FILE STRING
      COMMA
      LINE NUMBER
      COMMA
      IN functionName
      NEWLINE
      sourceLine?
    ;

functionName
    : qualifiedName
    | LESSTHAN TEXT GREATERTHAN
    ;

qualifiedName
    : IDENTIFIER
      (
        DOT IDENTIFIER
      )*
    ;

sourceLine
    : TEXT NEWLINE
    ;

exceptionLine
    : qualifiedName
      (
          COLON TEXT
      )?
      NEWLINE*
    ;