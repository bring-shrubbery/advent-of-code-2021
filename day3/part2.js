const fs = require("fs");

const rawFile = fs.readFileSync("./raw.txt", "utf-8");
const values = rawFile.split("\n");

const print = console.log;

const LINE_WIDTH = values[0].length;

const findMostCommon = (arr) => {
  const onesCounter = new Array(LINE_WIDTH).fill(0);
  const zerosCounter = new Array(LINE_WIDTH).fill(0);

  for (let i = 0; i < arr.length; i++) {
    const chars = arr[i].split("");

    chars.forEach((val, i) => {
      if (val === "1") onesCounter[i]++;
      if (val === "0") zerosCounter[i]++;
    });
  }

  const combinedMostCommonBits = new Array(LINE_WIDTH).fill(0);

  for (let i = 0; i < LINE_WIDTH; i++) {
    const ones = onesCounter[i];
    const zeros = zerosCounter[i];
    combinedMostCommonBits[i] = ones < zeros ? "0" : "1";
  }

  return combinedMostCommonBits.join("");
};

const findLeastCommon = (arr, keepOnes) => {
  const onesCounter = new Array(LINE_WIDTH).fill(0);
  const zerosCounter = new Array(LINE_WIDTH).fill(0);

  for (let i = 0; i < arr.length; i++) {
    const chars = arr[i].split("");

    chars.forEach((val, i) => {
      if (val === "1") onesCounter[i]++;
      if (val === "0") zerosCounter[i]++;
    });
  }

  const combinedMostCommonBits = new Array(LINE_WIDTH).fill(0);

  for (let i = 0; i < LINE_WIDTH; i++) {
    const ones = onesCounter[i];
    const zeros = zerosCounter[i];
    combinedMostCommonBits[i] = ones <= zeros ? "0" : "1";
    if (keepOnes && ones === zeros) combinedMostCommonBits[i] = "1";
  }

  return combinedMostCommonBits.join("");
};

// Oxygen generator rating
let ogr = [...values];

for (let i = 0; i < LINE_WIDTH; i++) {
  if (ogr.length === 1) break;

  const mostCommonBits = findMostCommon(ogr, true);
  ogr = ogr.filter((val) => val[i] == mostCommonBits[i]);
}

const oxygenGeneratorRating = parseInt(ogr[0], 2);

console.log("oxygenGeneratorRating: ", oxygenGeneratorRating);

// CO2 scrubber rating
let csr = [...values];

for (let i = 0; i < LINE_WIDTH; i++) {
  if (csr.length === 1) break;

  const mostCommonBits = findMostCommon(csr);
  csr = csr.filter((val) => val[i] != mostCommonBits[i]);
}

const co2ScrubberRating = parseInt(csr[0], 2);
console.log("co2ScrubberRating:", co2ScrubberRating);

const lifeSupportRating = co2ScrubberRating * oxygenGeneratorRating;

console.log("Result:", lifeSupportRating);
