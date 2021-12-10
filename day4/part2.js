const fs = require("fs");
const parseBoards = require("./parseBoard");
const getScore = require("./getScore");

const rawFile = fs.readFileSync("./raw.txt", "utf-8");
const [numberSet, _, ...lines] = rawFile.split("\n");

const pickedNumbers = numberSet.split(",").map((val) => parseInt(val.trim()));

let boards = parseBoards(lines);

const checkCompletion = (board) => {
  // Check vertical completion.
  for (let i = 0; i < 5; i++) {
    const all =
      board[0][i].marked &&
      board[1][i].marked &&
      board[2][i].marked &&
      board[3][i].marked &&
      board[4][i].marked;
    if (all) return true;
  }

  // Check horizontal completion.
  for (let i = 0; i < 5; i++) {
    const all =
      board[i][0].marked &&
      board[i][1].marked &&
      board[i][2].marked &&
      board[i][3].marked &&
      board[i][4].marked;
    if (all) return true;
  }

  return false;
};

const markNumber = (board, number) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].value == number) {
        board[i][j].marked = true;
        return;
      }
    }
  }
};

let finalScore = 0;

for (const num of pickedNumbers) {
  for (let i = 0; i < boards.length; i++) {
    markNumber(boards[i], num);

    if (checkCompletion(boards[i])) {
      finalScore = getScore(boards[i], num);
      boards.splice(i, 1);
      i--;
    }
  }
}

console.log("Final score:", finalScore);
