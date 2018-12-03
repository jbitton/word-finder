import React, { Component } from 'react';
import Controls from './Controls';
import Board from './Board';

type Props = {
  boardSize: number
};

type State = {
  letters: Array<Array<string>>,
  currentAction: string
};

class Game extends Component<Props, State> {
  state: State = {
    letters: [...Array(this.props.boardSize).keys()].map(() => (
      [...Array(this.props.boardSize).keys()].map(() => this.generateRandomLetter())
    )),
    currentAction: ''
  }

  constructor(props: Props) {
    super(props);
    this.fillLetters = this.fillLetters.bind(this);
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

  onControlSelected(command: string) {
    this.setState({ currentAction: command });
    // function to show modal to select a letter to perform the command on
    // another modal to show which letter to swap with
  }

  performAction(idx1, idx2) {
    const { currentAction } = this.state;
    if (currentAction === 'up') {

    } else if (currentAction === 'down') {

    } else if (currentAction === 'left') {

    } else if (currentAction === 'right') {

    } else if (currentAction === 'swap') {

    }
  }


  render() {
    const { boardSize } = this.props;
    return (
      <div>
        <Controls onControlSelected={this.onControlSelected} />
        <Board
          boardSize={boardSize}
          fillLetters={this.fillLetters}
          letters={this.state.letters}
        />
      </div>
    );
  }
}

export default Game;
