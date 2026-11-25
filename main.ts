import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The warning label: a deadpan safety notice about the grandfather
// paradox. The setup is pure official calm ("please remain calm"),
// and the punchline lands in the very last words — the notice itself
// has never existed, because the reader erased their own grandfather.
// One line, no trailing newline, 112 characters, within the limit.
const LABEL =
  "NOTICE: If your grandfather disappears, please remain calm. You have never existed, and neither has this notice.";

// Fail loudly instead of submitting an invalid entry: the gate scores
// anything over 120 characters as 0, so never write a label that long.
if (LABEL.length > 120) {
  throw new Error(`Label is ${LABEL.length} characters, over the 120 limit`);
}

// Paths are built from import.meta.url, never from the working directory,
// so the program works no matter where the grader runs it from.
const scriptDir = dirname(fileURLToPath(import.meta.url));

// Output directory comes from the environment (MAKEFUN_OUTPUT_DIR),
// falling back to /output. A relative value is resolved against the
// script's own directory, not the caller's working directory.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(scriptDir, process.env.MAKEFUN_OUTPUT_DIR)
  : "/output";
const entryPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, LABEL, "utf8");
