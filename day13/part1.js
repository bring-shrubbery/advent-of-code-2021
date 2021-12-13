const fs = require("fs");

const rawFile = fs.readFileSync("./raw.txt", "utf-8");
const [rawValues, rawFolds] = rawFile.split("\n\n");

const values = rawValues
  .split("\n")
  .map((line) => line.split(",").map((v) => parseInt(v)));
const folds = rawFolds.split("\n").map((line) =>
  line
    .split(" ")[2]
    .split("=")
    .map((v, i) => (i === 0 ? v : parseInt(v)))
);

console.log(values);
console.log(folds);

const width = Math.max(...values.map(([x, y]) => x)) + 1;
const height = Math.max(...values.map(([x, y]) => y)) + 1;

console.log(width);
console.log(height);

// Paper is transposed
const paper = new Array(height)
  .fill(0)
  .map(() => new Array(width).fill(0).fill(new String(".")));

values.forEach(([x, y]) => {
  paper[y][x] = "#";
});

const renderPaper = (p) => {
  for (const line of p) {
    console.log(line.join(""));
  }
};

const foldX = (p, fx) => {
  const pp = p.map((line) => [...line]);
  const ph2 = pp.map((line) => line.slice(fx + 1));
  const ph1 = pp.map((line) => line.slice(0, fx));
  // console.log(ph1.length, ph1[0].length);
  // console.log(ph2.length, ph2[0].length);
  const foldedPh2 = ph2.map((line) => line.reverse());
  const mergedPaper = ph1.map((line, y) =>
    line.map((c, x) => (c == "#" || foldedPh2[y][x] === "#" ? "#" : "."))
  );
  return mergedPaper;
};

const foldY = (p, fy) => {
  const pp = p.map((line) => [...line]);
  const ph2 = pp.slice(fy + 1);
  const ph1 = pp.slice(0, fy);
  console.log(ph1.length, ph1[0].length);
  console.log(ph2.length, ph2[0].length);
  const foldedPh2 = ph2.reverse();
  const mergedPaper = ph1.map((line, y) =>
    line.map((c, x) => (c == "#" || foldedPh2[y][x] == "#" ? "#" : "."))
  );
  return mergedPaper;
};

let currentPaper = paper;
const [dir, loc] = folds[0];

if (dir == "x") {
  currentPaper = foldX(currentPaper, loc);
} else if (dir == "y") {
  currentPaper = foldY(currentPaper, loc);
} else {
  throw new Error("wtf");
}

console.log(
  "Marks after first fold:",
  currentPaper.flat().filter((c) => c == "#").length
);
