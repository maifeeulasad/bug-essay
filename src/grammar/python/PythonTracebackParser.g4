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
    : FRAME_LINE NEWLINE
      sourceLine*
    ;

// Source code line and/or "^^^" caret marker line(s) under a frame.
sourceLine
    : TEXT NEWLINE
    ;

exceptionLine
    : EXCEPTION_LINE NEWLINE*
    ;