import type { FrameNavigator } from "../navigation/FrameNavigator";
import type { ICommand } from "./ICommand";

/** Command: jump one frame deeper into the active stack trace. */
export class NextFrameCommand implements ICommand {
    public readonly id = "bug-essay.nextFrame";
    public constructor(private readonly navigator: FrameNavigator) { }
    public execute(): Promise<void> {
        return this.navigator.nextFrame();
    }
}

/** Command: jump one frame back toward the entry point. */
export class PreviousFrameCommand implements ICommand {
    public readonly id = "bug-essay.previousFrame";
    public constructor(private readonly navigator: FrameNavigator) { }
    public execute(): Promise<void> {
        return this.navigator.previousFrame();
    }
}

/** Command: revisit the previously opened location (history back). */
export class NavigateBackCommand implements ICommand {
    public readonly id = "bug-essay.navigateBack";
    public constructor(private readonly navigator: FrameNavigator) { }
    public execute(): Promise<void> {
        return this.navigator.goBack();
    }
}

/** Command: return to the location left via back (history forward). */
export class NavigateForwardCommand implements ICommand {
    public readonly id = "bug-essay.navigateForward";
    public constructor(private readonly navigator: FrameNavigator) { }
    public execute(): Promise<void> {
        return this.navigator.goForward();
    }
}
