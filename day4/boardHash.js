// Calculates unique string from the board.
module.exports = (board) => {
  return board.map((line) => line.join("-")).join("+");
};
