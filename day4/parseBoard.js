// Parses raw lines into a board
module.exports = (rawLines) => {
  const boards = [];
  let boardAcc = [];

  for (const line of rawLines) {
    if (line.length < 3) {
      boards.push([...boardAcc]);
      boardAcc = new Array();
      continue;
    }

    const nums = line
      .split(" ")
      .filter((s) => s !== "")
      .map((s) => s.trim())
      .map((s) => parseInt(s));

    boardAcc.push([...nums].map((value) => ({ value, marked: false })));
  }

  return boards;
};
