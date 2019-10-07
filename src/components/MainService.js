const START_ROW = 10;
const START_COL = 10;
const FINISH_ROW = 10;
const FINISH_COL = 40;

const createNode = (col, row) => {
  return {
    row,
    col,
    isStart: col === START_COL && row === START_ROW,
    isFinish: col === FINISH_COL && row === FINISH_ROW,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};

export default {
  createNode,
  START_ROW,
  START_COL,
  FINISH_ROW,
  FINISH_COL
}
