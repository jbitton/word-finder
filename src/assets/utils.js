function performRotation(
  currentAction: string,
  idx1: number,
  idx2: number,
  letters: Array<Array<string>>,
  boardSize: number
) {
  if (currentAction === 'up') {
    const temp = letters[0][idx2];
    for (let i = 1; i < boardSize; i++) {
      letters[i-1][idx2] = letters[i][idx2];
    }
    letters[boardSize-1][idx2] = temp;
  } else if (currentAction === 'down') {
    const temp = letters[boardSize-1][idx2];
    for (let i = boardSize-2; i >= 0; i--) {
      letters[i+1][idx2] = letters[i][idx2];
    }
    letters[0][idx2] = temp;
  } else if (currentAction === 'left') {
    const temp = letters[idx1][0];
    for (let i = 1; i < boardSize; i++) {
      letters[idx1][i-1] = letters[idx1][i];
    }
    letters[idx1][boardSize-1] = temp;
  } else if (currentAction === 'right') {
    const temp = letters[idx1][boardSize-1];
    for (let i = boardSize-2; i >= 0; i--) {
      letters[idx1][i+1] = letters[idx1][i];
    }
    letters[idx1][0] = temp;
  }
}

function containsIndex(
  selectedLetters: Array<Array<number>>,
  idx1: number,
  idx2: number
) {
  let indexFound = -1;

  selectedLetters.forEach((idxs, i) => {
    if (idxs[0] === idx1 && idxs[1] === idx2) {
      indexFound = i;
    }
  });

  return indexFound;
}

function getSimilarIndexFirst(
  selectedLetters: Array<Array<number>>,
  idx1: number,
  idx2: number
) {
  if (
    selectedLetters[0][0] === idx1
    && Math.abs(idx2 - selectedLetters[0][1]) === 1
  ) {
    return idx1;
  }

  if (
    selectedLetters[0][1] === idx2
    && Math.abs(idx1 - selectedLetters[0][0]) === 1
  ) {
    return idx2;
  }

  return -1;
}

function getSimilarIndexLast(
  selectedLetters: Array<Array<number>>,
  idx1: number,
  idx2: number
) {
  const lastIdx = selectedLetters.length - 1;

  if (
    selectedLetters[lastIdx][0] === idx1
    && Math.abs(idx2 - selectedLetters[lastIdx][1]) === 1
  ) {
    return idx1;
  }

  if (
    selectedLetters[lastIdx][1] === idx2
    && Math.abs(idx1 - selectedLetters[lastIdx][0]) === 1
  ) {
    return idx2;
  }

  return -1;
}

export {
  performRotation,
  containsIndex,
  getSimilarIndexFirst,
  getSimilarIndexLast
};
