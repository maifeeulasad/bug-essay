# bug-essay

A VS Code extension that turns raw Python tracebacks into an interactive, navigable experience:
captured exceptions flow from your app into MongoDB, the extension polls them out, visualizes
them, links every frame back to your code, and paints "bug zones" over the files and
directories where exceptions concentrate.

## Features

- **Stack-trace visualization** — captured exceptions render as interactive traceback chains
  (including `raise ... from ...` and "during handling" chains) in an always-available view.
- **Code linking** — every frame is clickable and jumps to the exact file and line, even when
  the trace path doesn't match the workspace layout exactly (suffix-based resolution).
- **Frame stepping** — jump to the next/previous frame of the active trace (▼/▲).
- **Back & forward** — browser-style history over every location you visited (⭠/⭢).
- **Bug zones in files** — lines that exception frames passed through get a heat tint in the
  editor plus overview-ruler marks; hover shows the hit count.
- **Bug zones in the explorer** — files *and directories* get a percentile badge (e.g. `97`
  = 97th percentile of exception hits) with warning/error coloring for the hottest zones.
- **Exception capture & logging** — the bundled Python sample project catches every exception
  and logs it to MongoDB (the only supported store for now).

## Quick start

```sh
# 1. Start MongoDB
docker compose up -d

# 2. Feed it exceptions (32 scenarios covering the edge cases)
cd test/project/python
pip install -r requirements.txt
python main.py --loop 15        # or --once for a single pass

# 3. Launch the extension (F5), open the Bug Essay icon in the activity bar
```

Tip: drag the **Bug Essay** view into the **secondary side bar** (right panel) to keep it
visible at all times. The view polls MongoDB every 10 seconds by default.

## Settings

| Setting | Default | Purpose |
| --- | --- | --- |
| `bugEssay.mongo.uri` | `mongodb://localhost:27017` | Connection string |
| `bugEssay.mongo.database` | `bug_essay` | Database name |
| `bugEssay.mongo.collection` | `exceptions` | Collection name |
| `bugEssay.polling.enabled` | `true` | Periodic polling on/off |
| `bugEssay.polling.intervalSeconds` | `10` | Poll cadence |
| `bugEssay.maxTraces` | `200` | In-memory trace cap |

## Architecture

The extension is layered so that everything below the composition root is plain TypeScript
with no VS Code dependency (except the thin view/decoration adapters):

```
extension.ts                     composition root: builds the object graph, wires events
├── commands/                    ICommand implementations (visualize, refresh, frame/history nav)
├── config/                      ExtensionConfig: typed facade over workspace settings
├── providers/                   IStackTraceProvider + IPollingStackTraceProvider
│   ├── HardcodedStackTraceProvider   sample data for the palette demo command
│   └── MongoStackTraceProvider       pulls captured exceptions from MongoDB
├── polling/                     StackTracePoller: interval polling with a timestamp watermark
├── store/                       TraceRepository: capacity-bounded, event-emitting trace store
├── services/                    StackTraceService: orchestrates provider → parser
├── parsing/                     ITracebackParser + ANTLR adapter
│   └── grammar/python/          ANTLR-generated lexer/parser for Python tracebacks
├── linking/                     WorkspacePathResolver: trace paths → workspace files
├── navigation/                  FrameNavigator + NavigationHistory (next/prev, back/forward)
├── analysis/                    BugZoneAnalyzer + percentile: frame hits → file/dir zones
├── decorations/                 editor line tints + explorer percentile badges
├── views/                       trace explorer webview view (always visible)
└── visualization/               pure HTML renderers + the standalone webview panel
```

Data flow: `python app → exception_logger → MongoDB → StackTracePoller → TraceRepository →
{trace explorer view, BugZoneAnalyzer → decorations}`.

Extension points:

- **New data sources** (log files, clipboard, crash reporters): implement
  `IStackTraceProvider` (or `IPollingStackTraceProvider` for polling sources).
- **New languages** (Java, Node, ...): implement `ITracebackParser` and register it in
  `extension.ts`.
- **New stores**: currently only MongoDB is supported; another store is just another
  polling provider.

## The Python sample project

`test/project/python` is a deliberately buggy app: ~30 modules across nested packages, with
32 registered failure scenarios (`scenarios.py`) covering zero-division, overflow, unicode,
JSON, custom exception hierarchies, message-less exceptions (`queue.Full`), worker-thread
failures, chained exceptions (both `raise from` and "during handling"), recursion limits,
generator protocol errors, and stdlib frames that live outside the workspace.
`exception_logger/` catches everything and writes the raw traceback plus metadata to Mongo.

## Development

```sh
pnpm install
pnpm build            # type-check + compile to out/
pnpm test:python      # parser smoke test against src/test/smoke fixtures
pnpm generate:python  # regenerate ANTLR lexer/parser from the .g4 grammars (needs java)
```

Press `F5` in VS Code to launch an Extension Development Host.
