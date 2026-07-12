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
    /**
     * How this block relates to the block before it in the chain.
     * Absent on the first block. (Extra field beyond your original shape,
     * so you don't lose the "During handling..." / "...direct cause..."
     * info — drop it in post-processing if you don't want it.)
     */
    causedBy?: ExceptionTransition;
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