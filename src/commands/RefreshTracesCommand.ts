import * as vscode from "vscode";
import type { StackTracePoller } from "../polling/StackTracePoller";
import type { ICommand } from "./ICommand";

/** Command: poll MongoDB immediately instead of waiting for the interval. */
export class RefreshTracesCommand implements ICommand {
    public readonly id = "bug-essay.refreshTraces";

    public constructor(private readonly poller: StackTracePoller) { }

    public async execute(): Promise<void> {
        const status = await this.poller.pollOnce();
        if (status.error) {
            void vscode.window.showWarningMessage(`Bug Essay: poll failed — ${status.error}`);
        } else if (status.added > 0) {
            void vscode.window.showInformationMessage(
                `Bug Essay: pulled ${status.added} new stack trace${status.added === 1 ? "" : "s"}.`,
            );
        }
    }
}
