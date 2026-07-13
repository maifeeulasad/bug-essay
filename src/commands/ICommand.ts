/**
 * A VS Code command contribution. Implementations are registered by the
 * composition root in extension.ts, keeping command wiring declarative.
 */
export interface ICommand {
    /** Command identifier, matching the contribution in package.json. */
    readonly id: string;

    execute(): Promise<void>;
}
