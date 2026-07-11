export interface PythonLog {
    entries: LogEntry[];
}

export type LogEntry =
    | OutputLine
    | TracebackChain;

export interface OutputLine {
    kind: "output";
    text: string;
}

export interface TracebackChain {
    kind: "traceback";
    blocks: TracebackBlock[];
}

export interface TracebackBlock {
    frames: Frame[];
    exception: ExceptionInfo;
}

export interface Frame {
    filename: string;
    line: number;
    function: string;
    source?: string;
}

export interface ExceptionInfo {
    type: string;
    message?: string;
}

export type ExceptionTransition =
    | "during_handling"
    | "direct_cause";