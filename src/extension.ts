import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {

    console.log("Bug Essay activated.");

    const disposable = vscode.commands.registerCommand(
        "bug-essay.hello",
        async () => {

            vscode.window.showInformationMessage(
                "Hello from Bug Essay!"
            );

        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate(): void {
    console.log("Bug Essay deactivated.");
}