interface Traceback {
    frames: Frame[];
    exception: ExceptionInfo;
}

interface Frame {
    filename: string;
    line: number;
    function: string;
    source?: string;
}

interface ExceptionInfo {
    type: string;
    message?: string;
}