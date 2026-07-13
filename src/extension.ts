import * as vscode from "vscode";
import type { ICommand } from "./commands/ICommand";
import { VisualizeStackTraceCommand } from "./commands/VisualizeStackTraceCommand";
import { PythonTracebackParserAdapter } from "./parsing/PythonTracebackParserAdapter";
import { HardcodedStackTraceProvider } from "./providers/HardcodedStackTraceProvider";
import { StackTraceService } from "./services/StackTraceService";
import { StackTraceHtmlRenderer } from "./visualization/StackTraceHtmlRenderer";

/**
 * Composition root: constructs the object graph and registers commands.
 * All dependencies flow inward through constructors, so every layer
 * below this file is testable without VS Code.
 */
export function activate(context: vscode.ExtensionContext): void {
    const service = new StackTraceService(
        new HardcodedStackTraceProvider(),
        [new PythonTracebackParserAdapter()],
    );
    const renderer = new StackTraceHtmlRenderer();

    const commands: readonly ICommand[] = [
        new VisualizeStackTraceCommand(service, renderer),
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
}

export function deactivate(): void {
    // Nothing to clean up: all disposables are owned by the extension context.
}
