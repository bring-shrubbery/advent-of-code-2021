const fs = require("fs");

const rawFile = fs.readFileSync("./raw.txt", "utf-8");
const lines = rawFile.split("\n");
const pairs = lines.map((line) => line.split(" -> "));

// Convert to object with x1, x2, y1, y2
const coordinates = pairs.map(([fromRaw, toRaw]) => {
  const [x1, y1] = fromRaw.split(",").map((v) => parseInt(v));
  const [x2, y2] = toRaw.split(",").map((v) => parseInt(v));

  return { x1, y1, x2, y2 };
});

// Find max values for X and Y. +1 to replace max index with the width/height of the board.
const width =
  Math.max(...coordinates.map((obj) => Math.max(obj.x1, obj.x2))) + 1;
const height =
  Math.max(...coordinates.map((obj) => Math.max(obj.y1, obj.y2))) + 1;

// Filter out values that are not horizontal/vertical
// const cleanCoordinates = coordinates.filter(
//   (obj) => obj.x1 === obj.x2 || obj.y1 === obj.y2
// );

// Create board
const board = [...new Array(height).fill(0)].map(() =>
  new Array(width).fill(0).map(() => ".")
);

// Draw the board with option to render out only a part of the board.
const renderBoard = (board, { x = 0, y = 0, w = width, h = width } = {}) => {
  const brd = JSON.parse(JSON.stringify(board));
  let boardStr = "";
  for (const line of brd.splice(y, y + h)) {
    boardStr += line.splice(x, x + w).join("") + "\n";
  }
  return boardStr;
};

const orientation = (line) => {
  if (line.x1 === line.x2) return "vertical";
  if (line.y1 === line.y2) return "horizontal";
  return "diagonal";
};

const processLines = (board, lines) => {
  const bc = JSON.parse(JSON.stringify(board));

  lines.forEach((obj) => {
    const o = orientation(obj);

    if (o === "horizontal") {
      for (
        let x = Math.min(obj.x1, obj.x2);
        x <= Math.max(obj.x1, obj.x2);
        x++
      ) {
        bc[obj.y1][x] = bc[obj.y1][x] === "." ? 1 : bc[obj.y1][x] + 1;
      }
    } else if (o === "vertical") {
      for (
        let y = Math.min(obj.y1, obj.y2);
        y <= Math.max(obj.y1, obj.y2);
        y++
      ) {
        // console.log(obj.x1);
        bc[y][obj.x1] = bc[y][obj.x1] === "." ? 1 : bc[y][obj.x1] + 1;
      }
    } else {
      let x = obj.x1;
      let y = obj.y1;

      const cond1 = () => (obj.x1 > obj.x2 ? x >= obj.x2 : x <= obj.x2);
      const cond2 = () => (obj.y1 > obj.y2 ? y >= obj.y2 : y <= obj.y2);

      while (cond1() && cond2()) {
        bc[y][x] = bc[y][x] === "." ? 1 : bc[y][x] + 1;

        x += obj.x1 > obj.x2 ? -1 : 1;
        y += obj.y1 > obj.y2 ? -1 : 1;
      }
    }
  });

  return bc;
};

console.log("Width:", width);
console.log("Height:", height);

const boardWithLines = processLines(board, coordinates);

// console.log(renderBoard(boardWithLines, { x: 0, y: 0, w: 100, h: 500 }));

const numOfMoreThanTwoLines = boardWithLines
  .map((line) => line.filter((val) => val >= 2))
  .flat().length;

console.log(
  "Number of points with more than 2 or more lines crossing:",
  numOfMoreThanTwoLines
);
