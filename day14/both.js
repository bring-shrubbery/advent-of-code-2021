const fs = require("fs");

const rawFile = fs.readFileSync("./raw.txt", "utf-8");
const [temp, _mapping] = rawFile.split("\n\n");

const mapping = _mapping.split("\n").map((line) => line.split(" -> "));
const mMap = {};
const mMapReverse = {};
for (const [key, value] of mapping) {
  mMap[key] = value;
  mMapReverse[value] = key;
}

// console.log(mMap);

let str = temp;
console.log("Template:\t", str);

for (let j = 0; j < 40; j++) {
  const toInject = [];

  console.time("identifying");
  for (let i = 0; i < str.length - 1; i++) {
    const pair = str.slice(i, i + 2);
    const char = mMap[pair];
    if (typeof char !== "undefined") {
      toInject.push([i, char]);
    }
  }
  console.timeEnd("identifying");

  console.log(j + 1, "Injecting", toInject.length, "characters");

  console.time("injecting");
  let lastInd = 0;
  let toJoin = [];

  for (let i = 0; i < toInject.length; i++) {
    const [index, value] = toInject[i];
    // const injectionIndex = index + 1 + i;

    toJoin.push(str.slice(lastInd, index + 1) + value);
    lastInd = index + 1;

    // str = str.slice(0, injectionIndex) + value + str.slice(injectionIndex);
  }

  // console.log(toJoin);
  str = toJoin.join("");
  console.timeEnd("injecting");

  // console.log(`Step ${j + 1}:  \t`, str);
}

const letterCounts = {};
for (const char of str) {
  const val = letterCounts[char];
  if (typeof val === "undefined") {
    letterCounts[char] = 1;
  } else {
    letterCounts[char]++;
  }
}

const letterCountsArr = Object.keys(letterCounts).map((key) => ({
  count: letterCounts[key],
  letter: key,
}));

letterCountsArr.sort((a, b) => a.count - b.count);

console.log(
  "Most common minus least common: ",
  letterCountsArr[letterCountsArr.length - 1].count - letterCountsArr[0].count
);
