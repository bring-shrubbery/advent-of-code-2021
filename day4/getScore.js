module.exports = (board, winningNumber) => {
  const unmarkedNums = board.flat(2).filter((val) => !val.marked);
  let sum = unmarkedNums.reduce((prev, curr) => prev + curr.value, 0);
  return sum * winningNumber;
};
