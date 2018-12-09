import React, { Component } from 'react';
import Board from './Board';
import { performRotation } from '../assets/utils';
import alphabetBoard from '../assets/data/alphabetBoard.json';

type Props = {
  boardSize: number
};

type State = {
  letters: Array<Array<string>>,
  mode: 'action' | 'swap' | 'word',
  swapIdxs: Array<number>
};

class Game extends Component<Props, State> {
  state: State = {
    letters: [...Array(this.props.boardSize).keys()].map(() => (
      [...Array(this.props.boardSize).keys()].map(() => this.generateRandomLetter())
    )),
    mode: 'action',
    swapIdxs: []
  }

  constructor(props: Props) {
    super(props);
    this.fillLetters = this.fillLetters.bind(this);
    this.performAction = this.performAction.bind(this);
    this.returnToAction = this.returnToAction.bind(this);
    this.swapLetters = this.swapLetters.bind(this);
  }

  generateRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)]
  }

  fillLetters(selectedLetters: Array<Array<number>>) {
    const { letters } = this.state;
    selectedLetters.forEach(idxs => {
      letters[idxs[0]][idxs[1]] = this.generateRandomLetter();
    });
    this.setState({ letters });
  }

  returnToAction() {
    this.setState({ mode: 'action' });
  }

  performAction(currentAction: string, idx1: number, idx2: number) {
    const { letters } = this.state;
    const { boardSize } = this.props;

    if (currentAction === 'swap') {
      this.setState({ mode: 'swap', swapIdxs: [idx1, idx2] });
      return;
    }

    performRotation(currentAction, idx1, idx2, letters, boardSize);
    this.setState({ letters: letters, mode: 'word' });
  }

  swapLetters(currentAction: string, idx1: number, idx2: number) {
    const { letters, swapIdxs } = this.state;
    letters[swapIdxs[0]][swapIdxs[1]] = alphabetBoard[idx1][idx2];
    this.setState({ letters: letters, mode: 'word', swapIdxs: [] });
  }

  render() {
    const { boardSize } = this.props;
    const { mode } = this.state;

    return (
      <div>
        <Board
          boardSize={boardSize}
          fillLetters={this.fillLetters}
          letters={mode === 'swap' ? alphabetBoard : this.state.letters}
          mode={mode}
          performAction={mode === 'swap' ? this.swapLetters : this.performAction}
          returnToAction={this.returnToAction}
        />
      </div>
    );
  }
}

export default Game;
