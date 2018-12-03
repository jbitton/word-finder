import React, { Component } from 'react';
import Board from './Board';

type Props = {
  boardSize: number
};

type State = {
  letters: Array<Array<string>>
};

class Game extends Component<Props, State> {
  state: State = {
    letters: [...Array(this.props.boardSize).keys()].map(() => (
      [...Array(this.props.boardSize).keys()].map(() => this.generateRandomLetter())
    ))
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

  render() {
    const { boardSize } = this.props;
    return (
      <Board
        boardSize={boardSize}
        fillLetters={this.fillLetters}
        letters={this.state.letters}
      />
    );
  }
}

export default Game;
