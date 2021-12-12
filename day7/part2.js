const fs = require("fs");
const BigNumber = require("big-number");

const rawFile = fs.readFileSync("./raw.txt", "utf-8");
const crabs = rawFile.split(",").map((v) => parseInt(v));

const maxValue = Math.max(...crabs);

console.log(maxValue);

var f = [1, 1];
function factorial(n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  if (f[n] > 0) return f[n];
  f[n] = factorial(n - 1) + n;
  return f[n];
}

function getTotalFuel(crabs, position) {
  let sum = 0;
  for (let i = 0; i < crabs.length; i++) {
    sum += factorial(Math.abs(crabs[i] - position));
  }
  return sum;
}

const allSums = [];

for (let i = 0; i < maxValue; i++) {
  console.log("step", i, "of", maxValue);
  allSums.push(getTotalFuel(crabs, i));
}

console.log("Cheapest fuel:", Math.min(...allSums));
