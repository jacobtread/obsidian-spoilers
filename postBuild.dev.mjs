// Script for copying files to the build directory after build

import files from "fs/promises";
import path from "path";

const pluginDir = "test-vault/.obsidian/plugins/spoiler-block-obsidian";

await files.copyFile("src/styles.css", "build/styles.css");
await files.copyFile("build/styles.css", path.resolve(pluginDir, "styles.css"));
await files.copyFile("build/main.js", path.resolve(pluginDir, "main.js"));
