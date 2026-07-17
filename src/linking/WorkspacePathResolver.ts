import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

/**
 * Maps file paths found in stack traces back to files in the open
 * workspace, so frames stay clickable even when the trace was produced
 * on another machine or inside a container.
 *
 * Resolution order:
 *  1. the path as-is, when it exists on disk;
 *  2. a workspace search by the longest matching path suffix.
 *
 * Results (including misses) are cached until {@link invalidate}.
 */
export class WorkspacePathResolver {
    private readonly cache = new Map<string, vscode.Uri | null>();

    public async resolve(traceFilename: string): Promise<vscode.Uri | undefined> {
        if (!traceFilename || traceFilename.startsWith("<")) {
            return undefined; // "<stdin>", "<string>", ... are not files
        }
        const cached = this.cache.get(traceFilename);
        if (cached !== undefined) {
            return cached ?? undefined;
        }
        const resolved = await this.locate(traceFilename);
        this.cache.set(traceFilename, resolved ?? null);
        return resolved;
    }

    public invalidate(): void {
        this.cache.clear();
    }

    private async locate(traceFilename: string): Promise<vscode.Uri | undefined> {
        if (path.isAbsolute(traceFilename) && fs.existsSync(traceFilename)) {
            return vscode.Uri.file(traceFilename);
        }
        const segments = traceFilename.replace(/\\/g, "/").split("/").filter(Boolean);
        for (let take = Math.min(3, segments.length); take >= 1; take--) {
            const suffix = segments.slice(-take).join("/");
            const matches = await vscode.workspace.findFiles(`**/${suffix}`, "**/node_modules/**", 4);
            if (matches.length > 0) {
                // Prefer the shortest path: least likely to be a vendored copy.
                return [...matches].sort((a, b) => a.fsPath.length - b.fsPath.length)[0];
            }
        }
        return undefined;
    }
}
