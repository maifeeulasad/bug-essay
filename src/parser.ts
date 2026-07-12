import antlr4, { CharStream } from "antlr4";
import fs from "fs";

import PythonTracebackLexer from "./grammar/python/PythonTracebackLexer";
import PythonTracebackParser from "./grammar/python/PythonTracebackParser";

export function parseTraceback(text: string) {
    const chars = new antlr4.InputStream(text);

    const lexer = new PythonTracebackLexer(chars as CharStream);

    const tokens = new antlr4.CommonTokenStream(lexer);

    const parser = new PythonTracebackParser(tokens);

    parser.buildParseTrees = true;

    const tree = parser.log();

    return {
        tree,
        parser,
        lexer,
        tokens,
    };
}

// path for in file
// src/test/smoke/grammar/python/1.in
// src/test/smoke/grammar/python/2.in

const files = [
    "src/test/smoke/grammar/python/1.in",
    "src/test/smoke/grammar/python/2.in",
];

function readFile(filePath: string): string {
    return fs.readFileSync(filePath, "utf-8");
}

function testParseTraceback() {
    for (const file of files) {
        const text = readFile(file);
        const { tree, parser, lexer, tokens } = parseTraceback(text);

        // console.log(`Parsed file: ${file}`);
        // console.log(`Parse tree: ${tree.toStringTree(parser.ruleNames, parser)}`);
        // console.log(`Tokens: ${tokens.tokens.map(token => token.text).join(", ")}`);

        tokens.fill();

        for (const token of tokens.tokens) {
            console.log(
                `${token.line}:${token.column}`,
                parser.symbolicNames[token.type],
                JSON.stringify(token.text)
            );
        }


        console.log("---------------")
    }
}

testParseTraceback();