# bug-essay

A VS Code extension that turns raw Python tracebacks into an interactive, navigable visualization.

## Usage

Run **Bug Essay: Visualize Stack Trace** from the command palette, pick a stack trace, and explore it in the panel that opens. Clicking a frame jumps to that file and line in the editor (when the file exists on disk).

## Architecture

The extension is layered so that every layer except the outermost is plain TypeScript with no VS Code dependency:

```
extension.ts                     composition root: builds the object graph, registers commands
├── commands/                    ICommand + VisualizeStackTraceCommand (user-facing entry points)
├── services/                    StackTraceService: orchestrates provider → parser
├── providers/                   IStackTraceProvider + HardcodedStackTraceProvider (data acquisition)
├── parsing/                     ITracebackParser + PythonTracebackParserAdapter (ANTLR adapter)
│   └── grammar/python/          ANTLR-generated lexer/parser for Python tracebacks
└── visualization/               StackTraceHtmlRenderer (pure HTML) + StackTraceWebviewPanel (VS Code shell)
```

Extension points:

- **New data sources** (log files, clipboard, crash reporters, debug sessions): implement `IStackTraceProvider`.
- **New languages** (Java, Node, ...): implement `ITracebackParser` and register it in `extension.ts`.

The current provider is hardcoded sample data — a placeholder so the pipeline runs end-to-end before real integrations land.

## Development

```sh
pnpm install
pnpm build            # type-check + compile to out/
pnpm test:python      # parser smoke test against src/test/smoke fixtures
pnpm generate:python  # regenerate ANTLR lexer/parser from the .g4 grammars
```

Press `F5` in VS Code to launch an Extension Development Host.
