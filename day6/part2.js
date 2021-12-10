const fs = require("fs");

const rawFile = fs.readFileSync("./raw.txt", "utf-8");
const lines = rawFile.split("\n");
