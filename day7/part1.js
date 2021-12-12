const fs = require("fs");

const rawFile = fs.readFileSync("./raw.txt", "utf-8");
const crabs = rawFile.split(",").map((v) => parseInt(v));

const maxValue = Math.max(...crabs);

console.log(maxValue);

function getTotalFuel(crabs, position) {
  let sum = 0;
  for (let i = 0; i < crabs.length; i++) {
    sum += Math.abs(crabs[i] - position);
  }
  return sum;
}

const allSums = [];

for (let i = 0; i < maxValue; i++) {
  allSums.push(getTotalFuel(crabs, i));
}

console.log("Cheapest fuel:", Math.min(...allSums));
