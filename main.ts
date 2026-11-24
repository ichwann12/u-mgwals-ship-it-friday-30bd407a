import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Reads the entry line from entry.txt next to this script and writes it
// verbatim to output.txt in the output directory named by the environment.
// No network, no wall clock, stdlib only.

const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");
const line = readFileSync(entryPath, "utf8").replace(/\r?\n$/, "");
if (line.length === 0) {
  throw new Error("entry.txt is empty — nothing to write");
}
if (line.length >= 200) {
  throw new Error(`entry line is ${line.length} characters, over the 200 limit`);
}

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_BOT_DIR || here;
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "output.txt"), line + "\n", "utf8");
