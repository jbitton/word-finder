import React, { Component } from 'react';
import Board from './Board';

type State = {
  boardSize: number,
  letters: Array<Array<string>>
};

class App extends Component<State> {
  state: State = {
    boardSize: 5,
    letters: [
      ['A', 'B', 'C', 'D', 'E'],
      ['F', 'G', 'H', 'I', 'J'],
      ['K', 'L', 'M', 'N', 'O'],
      ['P', 'Q', 'R', 'S', 'T'],
      ['U', 'V', 'W', 'X', 'Y']
    ]
  }

  render() {
    return (
      <Board letters={this.state.letters} />
    );
  }
}

export default App;
