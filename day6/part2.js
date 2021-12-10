const fs = require("fs");

const rawFile = fs.readFileSync("./raw.txt", "utf-8");
const rawNumbers = rawFile.split(",").map((n) => parseInt(n));

let fishes = rawNumbers.map((v) => Object.assign({ count: 1, value: v }));

let t = 0;
while (t < 256) {
  console.log("Day:", t);
  // console.log("Day ${t}:", fishes.map(({ value }) => value).join());

  // Optimise
  const sortedFishes = fishes.sort((a, b) => a.value - b.value);
  const optimisedFishes = [];
  for (const fish of sortedFishes) {
    if (!optimisedFishes.length) {
      optimisedFishes.push(fish);
    } else if (
      optimisedFishes[optimisedFishes.length - 1].value === fish.value
    ) {
      optimisedFishes[optimisedFishes.length - 1].count += fish.count;
    } else {
      optimisedFishes.push(fish);
    }
  }

  fishes = optimisedFishes;

  // console.log(fishes);

  // 2.
  const oldFishLength = fishes.length;
  for (let i = 0; i < oldFishLength; i++) {
    fishes[i].value--;
    if (fishes[i].value < 0) {
      fishes[i].value = 6;

      //
      fishes.push(Object.assign({ count: fishes[i].count, value: 8 }));
    }
  }

  t++;
}

console.log(
  "Fishes after 256 days:",
  fishes.map((obj) => obj.count).reduce((prev, curr) => prev + curr, 0)
);
