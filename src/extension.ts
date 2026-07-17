import * as vscode from "vscode";
import { BugZoneAnalyzer } from "./analysis/BugZoneAnalyzer";
import type { ICommand } from "./commands/ICommand";
import {
    NavigateBackCommand,
    NavigateForwardCommand,
    NextFrameCommand,
    PreviousFrameCommand,
} from "./commands/NavigationCommands";
import { RefreshTracesCommand } from "./commands/RefreshTracesCommand";
import { VisualizeStackTraceCommand } from "./commands/VisualizeStackTraceCommand";
import { ExtensionConfig } from "./config/ExtensionConfig";
import { BugZoneEditorDecorator } from "./decorations/BugZoneEditorDecorator";
import { BugZoneFileDecorationProvider } from "./decorations/BugZoneFileDecorationProvider";
import { WorkspacePathResolver } from "./linking/WorkspacePathResolver";
import { FrameNavigator } from "./navigation/FrameNavigator";
import { PythonTracebackParserAdapter } from "./parsing/PythonTracebackParserAdapter";
import { StackTracePoller } from "./polling/StackTracePoller";
import { HardcodedStackTraceProvider } from "./providers/HardcodedStackTraceProvider";
import { MongoStackTraceProvider } from "./providers/MongoStackTraceProvider";
import { StackTraceService } from "./services/StackTraceService";
import { TraceRepository } from "./store/TraceRepository";
import { StackTraceViewProvider } from "./views/StackTraceViewProvider";
import { TraceExplorerHtmlRenderer } from "./views/TraceExplorerHtmlRenderer";
import { StackTraceHtmlRenderer } from "./visualization/StackTraceHtmlRenderer";

/**
 * Composition root: constructs the object graph and registers commands,
 * views, and decorations. All dependencies flow inward through
 * constructors, so every layer below this file is testable without
 * VS Code (except the thin view/decoration adapters).
 */
export function activate(context: vscode.ExtensionContext): void {
    const config = new ExtensionConfig();

    // Parsing pipeline (shared by the demo command and the Mongo poller).
    const service = new StackTraceService(
        new HardcodedStackTraceProvider(),
        [new PythonTracebackParserAdapter()],
    );

    // Data flow: Mongo -> poller -> repository -> (view, analyzer, decorations).
    const mongoProvider = new MongoStackTraceProvider({ ...config.mongo, limit: config.maxTraces });
    const repository = new TraceRepository(config.maxTraces);
    const poller = new StackTracePoller(mongoProvider, service, repository);

    // Code linking, navigation, and bug-zone analysis.
    const resolver = new WorkspacePathResolver();
    const navigator = new FrameNavigator(repository, resolver);
    const analyzer = new BugZoneAnalyzer(repository, resolver);
    const editorDecorator = new BugZoneEditorDecorator(analyzer);
    const fileDecorations = new BugZoneFileDecorationProvider(analyzer);

    // Views.
    const traceRenderer = new StackTraceHtmlRenderer();
    const viewProvider = new StackTraceViewProvider(
        repository,
        navigator,
        poller,
        new TraceExplorerHtmlRenderer(traceRenderer),
    );

    context.subscriptions.push(
        repository,
        poller,
        navigator,
        analyzer,
        editorDecorator,
        fileDecorations,
        viewProvider,
        vscode.window.registerWebviewViewProvider(StackTraceViewProvider.viewId, viewProvider, {
            webviewOptions: { retainContextWhenHidden: true },
        }),
        config.onDidChange(() => {
            resolver.invalidate();
            if (config.pollingEnabled) {
                poller.start(config.pollIntervalSeconds * 1000);
            } else {
                poller.stop();
            }
        }),
        { dispose: () => void mongoProvider.dispose() },
    );

    const commands: readonly ICommand[] = [
        new VisualizeStackTraceCommand(service, traceRenderer),
        new RefreshTracesCommand(poller),
        new NextFrameCommand(navigator),
        new PreviousFrameCommand(navigator),
        new NavigateBackCommand(navigator),
        new NavigateForwardCommand(navigator),
    ];
    for (const command of commands) {
        context.subscriptions.push(
            vscode.commands.registerCommand(command.id, async () => {
                try {
                    await command.execute();
                } catch (error) {
                    const message = error instanceof Error ? error.message : String(error);
                    void vscode.window.showErrorMessage(`Bug Essay: ${message}`);
                }
            }),
        );
    }

    if (config.pollingEnabled) {
        poller.start(config.pollIntervalSeconds * 1000);
    }
}

export function deactivate(): void {
    // Nothing to clean up: all disposables are owned by the extension context.
}
