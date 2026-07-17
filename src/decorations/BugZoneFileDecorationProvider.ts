import * as vscode from "vscode";
import type { BugZoneAnalyzer } from "../analysis/BugZoneAnalyzer";

/**
 * Renders bug-zone percentiles as badges on files and directories in
 * the explorer: "97" on a file means it is in the 97th percentile of
 * exception-frame hits. Hotter zones get warning/error colors.
 */
export class BugZoneFileDecorationProvider implements vscode.FileDecorationProvider, vscode.Disposable {
    private readonly changeEmitter = new vscode.EventEmitter<vscode.Uri | vscode.Uri[] | undefined>();
    public readonly onDidChangeFileDecorations = this.changeEmitter.event;

    private readonly registration: vscode.Disposable;
    private readonly subscription: vscode.Disposable;

    public constructor(private readonly analyzer: BugZoneAnalyzer) {
        this.registration = vscode.window.registerFileDecorationProvider(this);
        this.subscription = analyzer.onDidAnalyze(() => this.changeEmitter.fire(undefined));
    }

    public provideFileDecoration(uri: vscode.Uri): vscode.FileDecoration | undefined {
        const report = this.analyzer.getReport();
        const file = report.files.get(uri.fsPath);
        if (file) {
            return this.decoration(file.percentile, file.totalHits, "file");
        }
        const directory = report.directories.get(uri.fsPath);
        if (directory) {
            return this.decoration(directory.percentile, directory.totalHits, "directory");
        }
        return undefined;
    }

    private decoration(percentile: number, hits: number, kind: string): vscode.FileDecoration {
        // Explorer badges are limited to two characters, so 100 renders as 99.
        const badge = String(Math.min(99, Math.max(1, percentile)));
        const color = percentile >= 80
            ? new vscode.ThemeColor("list.errorForeground")
            : percentile >= 40
                ? new vscode.ThemeColor("list.warningForeground")
                : new vscode.ThemeColor("descriptionForeground");
        const decoration = new vscode.FileDecoration(
            badge,
            `Bug zone (${kind}): ${hits} exception frame hit${hits === 1 ? "" : "s"} — ${percentile}th percentile`,
            color,
        );
        decoration.propagate = false;
        return decoration;
    }

    public dispose(): void {
        this.registration.dispose();
        this.subscription.dispose();
        this.changeEmitter.dispose();
    }
}
