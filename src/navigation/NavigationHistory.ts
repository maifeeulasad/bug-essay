import type * as vscode from "vscode";

/** A single jump target inside the workspace. */
export interface CodeLocation {
    readonly uri: vscode.Uri;
    readonly line: number;
}

/**
 * Browser-style back/forward history over visited code locations.
 * Visiting a new location clears the forward stack.
 */
export class NavigationHistory {
    private readonly backStack: CodeLocation[] = [];
    private readonly forwardStack: CodeLocation[] = [];

    public visit(location: CodeLocation): void {
        this.backStack.push(location);
        this.forwardStack.length = 0;
    }

    /** Steps back, returning the location to reveal (or undefined at the start). */
    public goBack(): CodeLocation | undefined {
        if (this.backStack.length < 2) {
            return undefined;
        }
        this.forwardStack.push(this.backStack.pop() as CodeLocation);
        return this.backStack[this.backStack.length - 1];
    }

    /** Steps forward, returning the location to reveal (or undefined at the end). */
    public goForward(): CodeLocation | undefined {
        const next = this.forwardStack.pop();
        if (next) {
            this.backStack.push(next);
        }
        return next;
    }

    public get canGoBack(): boolean {
        return this.backStack.length > 1;
    }

    public get canGoForward(): boolean {
        return this.forwardStack.length > 0;
    }
}
