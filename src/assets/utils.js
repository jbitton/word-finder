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

export { performRotation };
