const fs = require("fs");

const rawFile = fs.readFileSync("./raw.txt", "utf-8");
const values = rawFile.split("\n");

const LINE_WIDTH = values[0].length;

const onesCounter = new Array(LINE_WIDTH).fill(0);
const zerosCounter = new Array(LINE_WIDTH).fill(0);

for (let i = 0; i < values.length; i++) {
  const value = values[i];
  const chars = value.split("");

  chars.forEach((val, i) => {
    if (val === "1") onesCounter[i]++;
    if (val === "0") zerosCounter[i]++;
  });
}

const combinedMostCommonBits = new Array(LINE_WIDTH).fill(0);

for (let i = 0; i < LINE_WIDTH; i++) {
  const ones = parseInt(onesCounter[i]);
  const zeros = parseInt(zerosCounter[i]);
  combinedMostCommonBits[i] = ones > zeros ? "1" : "0";
}

const leastCommonBits = combinedMostCommonBits.map((val) =>
  val === "1" ? "0" : "1"
);

const gammaRate = parseInt(combinedMostCommonBits.join(""), 2);
const epsilonRate = parseInt(leastCommonBits.join(""), 2);

console.log(gammaRate, epsilonRate);

console.log("Result:", gammaRate * epsilonRate);
