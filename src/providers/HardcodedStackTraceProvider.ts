import type { IStackTraceProvider, StackTraceRecord } from "./IStackTraceProvider";

const SIMPLE_TRACE = `Traceback (most recent call last):
File "<stdin>", line 1, in <module>
File "<stdin>", line 2, in foo
File "<stdin>", line 2, in bar
File "<stdin>", line 2, in baz
Exception: Something went wrong!`;

const CHAINED_TRACE = `Could not get latest version number, attempting to fall back to latest downloaded version...
Traceback (most recent call last):
  File "/home/usr/.local/lib/python3.12/site-packages/antlr4_tool_runner.py", line 26, in latest_version
    with urlopen("https://central.sonatype.com/solrsearch/select?q=a:antlr4-master+g:org.antlr",
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.12/urllib/request.py", line 215, in urlopen
    return opener.open(url, data, timeout)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.12/urllib/request.py", line 521, in open
    response = meth(req, response)
               ^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.12/urllib/request.py", line 630, in http_response
    response = self.parent.error(
               ^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.12/urllib/request.py", line 559, in error
    return self._call_chain(*args)
           ^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.12/urllib/request.py", line 492, in _call_chain
    result = func(*args)
             ^^^^^^^^^^^
  File "/usr/lib/python3.12/urllib/request.py", line 639, in http_error_default
    raise HTTPError(req.full_url, code, msg, hdrs, fp)
urllib.error.HTTPError: HTTP Error 400:

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/home/usr/.local/bin/antlr4", line 7, in <module>
    sys.exit(tool())
             ^^^^^^
  File "/home/usr/.local/lib/python3.12/site-packages/antlr4_tool_runner.py", line 143, in tool
    run_cli('org.antlr.v4.Tool')
  File "/home/usr/.local/lib/python3.12/site-packages/antlr4_tool_runner.py", line 134, in run_cli
    args, version = process_args()
                    ^^^^^^^^^^^^^^
  File "/home/usr/.local/lib/python3.12/site-packages/antlr4_tool_runner.py", line 128, in process_args
    args.version or os.environ.get("ANTLR4_TOOLS_ANTLR_VERSION") or latest_version()
                                                                    ^^^^^^^^^^^^^^^^
  File "/home/usr/.local/lib/python3.12/site-packages/antlr4_tool_runner.py", line 37, in latest_version
    version_dirs = list(filter(lambda directory: re.match(r"[0-9]+\\.[0-9]+\\.[0-9]+", directory), os.listdir(mvn_repo)))
                                                                                                 ^^^^^^^^^^^^^^^^^^^^
FileNotFoundError: [Errno 2] No such file or directory: '/home/usr/.m2/repository/org/antlr/antlr4'
`;

/**
 * Stack-trace source backed by hardcoded sample data.
 *
 * Placeholder for real sources (log files, clipboard, crash reporters);
 * it exists so the rest of the pipeline can be built and exercised
 * end-to-end before any real integration lands.
 */
export class HardcodedStackTraceProvider implements IStackTraceProvider {
    public readonly id = "hardcoded";
    public readonly displayName = "Hardcoded samples";

    public async fetch(): Promise<readonly StackTraceRecord[]> {
        return [
            {
                id: "simple",
                label: "Simple traceback",
                description: "Single block, four frames",
                language: "python",
                rawText: SIMPLE_TRACE,
            },
            {
                id: "chained",
                label: "Chained traceback",
                description: "HTTPError → FileNotFoundError (during handling)",
                language: "python",
                rawText: CHAINED_TRACE,
            },
        ];
    }
}
