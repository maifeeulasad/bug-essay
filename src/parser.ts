import fs from "fs";
import { parseTraceback } from "./parseTraceback";

const files = [
    "src/test/smoke/grammar/python/1.in",
    "src/test/smoke/grammar/python/2.in",
];

function readFile(filePath: string): string {
    return fs.readFileSync(filePath, "utf-8");
}

function main() {
    for (const file of files) {
        const text = readFile(file);
        const result = parseTraceback(text);
        const { errors, ...log } = result;

        console.log(`Parsed file: ${file}`);
        // if (errors.length > 0) {
        //     console.log("Parser errors:", errors);
        // }
        // console.log(JSON.stringify(log, null, 2));
        // console.log("---------------");

        // const outName = path.basename(file, ".in") + ".json";
        const outName = file.replace(".in", ".out.json");
        fs.writeFileSync(outName, JSON.stringify(log, null, 2));
    }
}

main();