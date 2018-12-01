import React, { Component } from 'react';
import Board from './Board';

type State = {
  letters: Array<Array<string>>
};

class App extends Component<State> {
  state: State = {
    letters: [...Array(5).keys()].map(() => (
      [...Array(5).keys()].map(() => this.generateRandomLetter())
    ))
  }

  generateRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)]
  }

  render() {
    return (
      <Board letters={this.state.letters} />
    );
  }
}

export default App;
