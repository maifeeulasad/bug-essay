import * as vscode from "vscode";
import type { BugZoneAnalyzer, BugZoneReport } from "../analysis/BugZoneAnalyzer";

/**
 * Highlights "bug zone" lines directly in open editors: any line that a
 * captured stack-trace frame passed through gets a whole-line tint whose
 * intensity scales with how often it was hit, plus an overview-ruler mark.
 */
export class BugZoneEditorDecorator implements vscode.Disposable {
    private readonly low = this.decorationType("rgba(255, 80, 80, 0.07)");
    private readonly medium = this.decorationType("rgba(255, 80, 80, 0.16)");
    private readonly high = this.decorationType("rgba(255, 80, 80, 0.28)");

    private readonly subscriptions: vscode.Disposable[] = [];

    public constructor(private readonly analyzer: BugZoneAnalyzer) {
        this.subscriptions.push(
            analyzer.onDidAnalyze(() => this.refreshAll()),
            vscode.window.onDidChangeVisibleTextEditors(() => this.refreshAll()),
        );
        this.refreshAll();
    }

    private refreshAll(): void {
        for (const editor of vscode.window.visibleTextEditors) {
            this.apply(editor, this.analyzer.getReport());
        }
    }

    private apply(editor: vscode.TextEditor, report: BugZoneReport): void {
        const zone = report.files.get(editor.document.uri.fsPath);
        const buckets: Record<"low" | "medium" | "high", vscode.DecorationOptions[]> = {
            low: [], medium: [], high: [],
        };

        if (zone) {
            for (const [line, count] of zone.lineHits) {
                if (line < 1 || line > editor.document.lineCount) {
                    continue;
                }
                const intensity = count / Math.max(1, report.maxLineHits);
                const bucket = intensity >= 0.66 ? "high" : intensity >= 0.33 ? "medium" : "low";
                buckets[bucket].push({
                    range: editor.document.lineAt(line - 1).range,
                    hoverMessage: new vscode.MarkdownString(
                        `**Bug zone**: ${count} exception frame${count === 1 ? "" : "s"} passed through this line.`,
                    ),
                });
            }
        }

        editor.setDecorations(this.low, buckets.low);
        editor.setDecorations(this.medium, buckets.medium);
        editor.setDecorations(this.high, buckets.high);
    }

    private decorationType(backgroundColor: string): vscode.TextEditorDecorationType {
        return vscode.window.createTextEditorDecorationType({
            isWholeLine: true,
            backgroundColor,
            overviewRulerColor: backgroundColor,
            overviewRulerLane: vscode.OverviewRulerLane.Right,
        });
    }

    public dispose(): void {
        for (const subscription of this.subscriptions) {
            subscription.dispose();
        }
        this.low.dispose();
        this.medium.dispose();
        this.high.dispose();
    }
}
