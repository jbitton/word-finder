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

function handleAlreadyClicked(
  index: number,
  selectedLetters: Array<Array<string>>
) {
  if (index + 1 === selectedLetters.length) {
    selectedLetters.splice(index, 1);
  } else if (Math.min(index, selectedLetters.length - index - 1) === index) {
    selectedLetters.splice(0, index + 1);
  } else {
    selectedLetters.splice(index);
  }
}

function handleAddedLetter(
  similarIdx: number,
  selectedLetters: Array<Array<string>>,
  idx1: number,
  idx2: number
) {
  if (similarIdx === -1) {
    const curSimilarIndex = getSimilarIndexLast(selectedLetters, idx1, idx2);
    if (curSimilarIndex === -1) {
      alert('Error: You can only select horizontally or vertically adjacent letters');
      return;
    }
    selectedLetters.push([idx1, idx2]);

    return curSimilarIndex;
  }

  const curSimilarIndexFirst = getSimilarIndexFirst(selectedLetters, idx1, idx2);
  const curSimilarIndexLast = getSimilarIndexLast(selectedLetters, idx1, idx2);

  if (
    similarIdx !== curSimilarIndexFirst
    && similarIdx !== curSimilarIndexLast
  ) {
    alert('Error: You can only select horizontally or vertically adjacent letters');
    return;
  }

  if (similarIdx === curSimilarIndexFirst) {
    selectedLetters.unshift([idx1, idx2]);
  }

  if (similarIdx === curSimilarIndexLast) {
    selectedLetters.push([idx1, idx2]);
  }

  return null;
}

export {
  performRotation,
  containsIndex,
  getSimilarIndexFirst,
  getSimilarIndexLast,
  handleAddedLetter,
  handleAlreadyClicked
};
