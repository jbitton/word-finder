import spelling from 'spelling';
import dictionary from 'spelling/dictionaries/en_US';
import letterValues from './data/letterValues.json';

const ACTIONS = [
  'up',
  'down',
  'left',
  'right',
  'swap',
];

const words = new spelling(dictionary);

const getRandomMove = board => {
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  let swap = null;

  if (action === 'swap') {
    const keys = Object.keys(letterValues);
    const idx = Math.floor(Math.random() * keys.length);
    swap = keys[idx];
  }

  return {
    action,
    idx1: Math.floor(Math.random() * board.length),
    idx2: Math.floor(Math.random() * board.length),
    word: [],
    swap,
  };
};

class RandomAgent {
  getMove(board) {
    return getRandomMove(board);
  }
}

class DoubleAgent {
  static isDoubleWord(idx1, idx2, end1, end2, board) {
    const word = board[idx1][idx2] + board[end1][end2];
    return words.lookup(word).found;
  }

  getMove(board) {
    let idx1 = 0;
    let idx2 = 0;

    for (idx1; idx1 < board.length; idx1 += 1) {
      for (idx2; idx2 < board.length; idx2 += 1) {
        const toCheck = [];

        if (idx1 + 1 < board.length) {
          toCheck.push([idx1 + 1, idx2]);
        }

        if (idx2 + 1 < board.length) {
          toCheck.push([idx1, idx2 + 1]);
        }

        for (let idx = 0; idx < toCheck.length; idx += 1) {
          const point = toCheck[idx];
          if (DoubleAgent.isDoubleWord(idx1, idx2, point[0], point[1], board)) {
            return {
              action: 'swap',
              idx1: 0,
              idx2: 0,
              word: [[idx1, idx2], point],
              swap: board[0][0],
            };
          }
        }
      }
    }

    return getRandomMove(board);
  }
}

export { RandomAgent, DoubleAgent };
