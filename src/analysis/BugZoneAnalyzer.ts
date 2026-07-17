import * as path from "path";
import * as vscode from "vscode";
import type { WorkspacePathResolver } from "../linking/WorkspacePathResolver";
import type { TraceRepository } from "../store/TraceRepository";
import { percentileByScore } from "./percentile";

/** How buggy one file is: total frame hits, per-line hits, and its rank. */
export interface FileBugZone {
    readonly uri: vscode.Uri;
    readonly totalHits: number;
    /** 1-100; the percentage of tracked files at or below this hit count. */
    readonly percentile: number;
    readonly lineHits: ReadonlyMap<number, number>;
}

/** Aggregated bugginess of a directory (sum of contained file hits). */
export interface DirectoryBugZone {
    readonly uri: vscode.Uri;
    readonly totalHits: number;
    readonly percentile: number;
}

/** One full analysis pass over every trace in the repository. */
export interface BugZoneReport {
    /** Keyed by fsPath. */
    readonly files: ReadonlyMap<string, FileBugZone>;
    readonly directories: ReadonlyMap<string, DirectoryBugZone>;
    /** Highest per-line hit count across all files; scales decoration intensity. */
    readonly maxLineHits: number;
}

const EMPTY_REPORT: BugZoneReport = { files: new Map(), directories: new Map(), maxLineHits: 0 };

/**
 * Aggregates stack-trace frames into "bug zones": per-line hit counts
 * for editor decorations, and per-file / per-directory percentiles for
 * explorer badges. Recomputes whenever the repository changes.
 */
export class BugZoneAnalyzer implements vscode.Disposable {
    private report: BugZoneReport = EMPTY_REPORT;
    private running = false;
    private queued = false;

    private readonly analyzeEmitter = new vscode.EventEmitter<BugZoneReport>();
    public readonly onDidAnalyze = this.analyzeEmitter.event;
    private readonly subscription: vscode.Disposable;

    public constructor(
        private readonly repository: TraceRepository,
        private readonly resolver: WorkspacePathResolver,
    ) {
        this.subscription = repository.onDidChange(() => void this.recompute());
    }

    public getReport(): BugZoneReport {
        return this.report;
    }

    public async recompute(): Promise<void> {
        if (this.running) {
            this.queued = true;
            return;
        }
        this.running = true;
        try {
            this.report = await this.analyze();
            this.analyzeEmitter.fire(this.report);
        } finally {
            this.running = false;
        }
        if (this.queued) {
            this.queued = false;
            await this.recompute();
        }
    }

    private async analyze(): Promise<BugZoneReport> {
        const files = new Map<string, { uri: vscode.Uri; totalHits: number; lineHits: Map<number, number> }>();

        for (const trace of this.repository.all()) {
            for (const entry of trace.log.entries) {
                if (entry.kind !== "traceback") {
                    continue;
                }
                for (const block of entry.blocks) {
                    for (const frame of block.frames) {
                        const uri = await this.resolver.resolve(frame.filename);
                        if (!uri) {
                            continue;
                        }
                        const zone = files.get(uri.fsPath) ?? { uri, totalHits: 0, lineHits: new Map() };
                        zone.totalHits += 1;
                        zone.lineHits.set(frame.line, (zone.lineHits.get(frame.line) ?? 0) + 1);
                        files.set(uri.fsPath, zone);
                    }
                }
            }
        }

        const directories = this.aggregateDirectories(files);
        const filePercentiles = percentileByScore(
            new Map([...files].map(([fsPath, zone]) => [fsPath, zone.totalHits])),
        );
        const directoryPercentiles = percentileByScore(
            new Map([...directories].map(([fsPath, hits]) => [fsPath, hits])),
        );

        let maxLineHits = 0;
        const fileZones = new Map<string, FileBugZone>();
        for (const [fsPath, zone] of files) {
            for (const count of zone.lineHits.values()) {
                maxLineHits = Math.max(maxLineHits, count);
            }
            fileZones.set(fsPath, { ...zone, percentile: filePercentiles.get(fsPath) ?? 0 });
        }
        const directoryZones = new Map<string, DirectoryBugZone>();
        for (const [fsPath, totalHits] of directories) {
            directoryZones.set(fsPath, {
                uri: vscode.Uri.file(fsPath),
                totalHits,
                percentile: directoryPercentiles.get(fsPath) ?? 0,
            });
        }
        return { files: fileZones, directories: directoryZones, maxLineHits };
    }

    /** Sums file hits into every ancestor directory inside the workspace. */
    private aggregateDirectories(
        files: ReadonlyMap<string, { uri: vscode.Uri; totalHits: number }>,
    ): Map<string, number> {
        const directories = new Map<string, number>();
        for (const zone of files.values()) {
            const root = vscode.workspace.getWorkspaceFolder(zone.uri)?.uri.fsPath;
            let directory = path.dirname(zone.uri.fsPath);
            while (root && directory.startsWith(root) && directory !== root) {
                directories.set(directory, (directories.get(directory) ?? 0) + zone.totalHits);
                const parent = path.dirname(directory);
                if (parent === directory) {
                    break;
                }
                directory = parent;
            }
        }
        return directories;
    }

    public dispose(): void {
        this.subscription.dispose();
        this.analyzeEmitter.dispose();
    }
}
