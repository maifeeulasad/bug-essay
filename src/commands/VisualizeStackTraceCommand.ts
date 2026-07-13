import * as vscode from "vscode";
import type { StackTraceService } from "../services/StackTraceService";
import type { StackTraceRecord } from "../providers/IStackTraceProvider";
import { StackTraceHtmlRenderer } from "../visualization/StackTraceHtmlRenderer";
import { StackTraceWebviewPanel } from "../visualization/StackTraceWebviewPanel";
import type { ICommand } from "./ICommand";

interface RecordQuickPickItem extends vscode.QuickPickItem {
    readonly record: StackTraceRecord;
}

/**
 * Command: fetch available stack traces, let the user pick one, and
 * visualize it in the Bug Essay webview panel.
 */
export class VisualizeStackTraceCommand implements ICommand {
    public readonly id = "bug-essay.visualizeStackTrace";

    public constructor(
        private readonly service: StackTraceService,
        private readonly renderer: StackTraceHtmlRenderer,
    ) { }

    public async execute(): Promise<void> {
        const records = await this.service.listRecords();
        if (records.length === 0) {
            void vscode.window.showInformationMessage("No stack traces available.");
            return;
        }

        const record = await this.pickRecord(records);
        if (!record) {
            return;
        }

        const parsed = this.service.parseRecord(record);
        StackTraceWebviewPanel.show(this.renderer, parsed);
    }

    private async pickRecord(
        records: readonly StackTraceRecord[],
    ): Promise<StackTraceRecord | undefined> {
        if (records.length === 1) {
            return records[0];
        }
        const items: RecordQuickPickItem[] = records.map((record) => ({
            label: record.label,
            description: record.description,
            record,
        }));
        const picked = await vscode.window.showQuickPick(items, {
            placeHolder: "Select a stack trace to visualize",
        });
        return picked?.record;
    }
}
