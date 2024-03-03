// Script for copying files to the build directory after build

import files from "fs/promises";

await files.copyFile("src/styles.css", "build/styles.css");
