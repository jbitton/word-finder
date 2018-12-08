import React, { Component } from 'react';
import { Modal } from 'antd';
import Controls from './Controls';
import Board from './Board';

type Props = {
  boardSize: number
};

type State = {
  letters: Array<Array<string>>,
  currentAction: string,
  mode: 'action' | 'modal' | 'word',
  modalVisible: boolean,
  showAlphabetBoard: boolean,
  swapIdxs: Array<number>
};

const ALPHABET_BOARD = [
  ['A', 'B', 'C', 'D'],
  ['E', 'F', 'G', 'H'],
  ['I', 'J', 'K', 'L'],
  ['M', 'N', 'O', 'P'],
  ['Q', 'R', 'S', 'T'],
  ['U', 'V', 'W', 'X'],
  ['Y', 'Z']
];

class Game extends Component<Props, State> {
  state: State = {
    letters: [...Array(this.props.boardSize).keys()].map(() => (
      [...Array(this.props.boardSize).keys()].map(() => this.generateRandomLetter())
    )),
    currentAction: '',
    mode: 'action',
    modalVisible: false,
    showAlphabetBoard: false,
    swapIdxs: []
  }

  constructor(props: Props) {
    super(props);
    this.fillLetters = this.fillLetters.bind(this);
    this.onControlSelected = this.onControlSelected.bind(this);
    this.onCancel = this.onCancel.bind(this);
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
    this.setState({mode: 'action'});
  }

  onControlSelected(command: string) {
    this.setState({ currentAction: command, modalVisible: true, mode: 'modal'});
  }

  onCancel() {
    this.setState({ modalVisible: false, mode: 'action'});
  }

  performAction(idx1, idx2) {
    const { currentAction, letters } = this.state;
    const { boardSize } = this.props;

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
    } else if (currentAction === 'swap') {
      this.setState({showAlphabetBoard: true, swapIdxs: [idx1, idx2]});
      return;
    }
    this.setState({ letters: letters, modalVisible: false, mode: 'word'});
  }

  swapLetters(idx1, idx2) {
    const { letters, swapIdxs } = this.state;
    letters[swapIdxs[0]][swapIdxs[1]] = ALPHABET_BOARD[idx1][idx2];
    this.setState({
      letters: letters,
      modalVisible: false,
      mode: 'word',
      showAlphabetBoard: false,
      swapIdxs: []
    });
  }


  render() {
    const { boardSize } = this.props;
    const { modalVisible, mode, showAlphabetBoard } = this.state;

    return modalVisible
      ? (
        <Modal
          title="Please Select a Letter to Perform the Action"
          visible={true}
          onCancel={this.onCancel}
          footer={null}
          style={{
            height: `${showAlphabetBoard ? 470 : 60 * boardSize + 50}px`,
            minWidth: `${showAlphabetBoard ? 250 : 50 * boardSize + 50}px`,
            maxWidth: `${showAlphabetBoard ? 250 : 50 * boardSize + 50}px`
          }}
        >
          {
            showAlphabetBoard
              ? (
                <Board
                  boardSize={boardSize}
                  fillLetters={this.fillLetters}
                  letters={ALPHABET_BOARD}
                  mode={mode}
                  performAction={this.swapLetters}
                />
              )
              : (
                <Board
                  boardSize={boardSize}
                  fillLetters={this.fillLetters}
                  letters={this.state.letters}
                  mode={mode}
                  performAction={this.performAction}
                />
              )
          }
        </Modal>
      )
      : (
        <div>
          <Controls
            mode={mode}
            onControlSelected={this.onControlSelected}
            onSkipWord={this.returnToAction}
          />
          <Board
            boardSize={boardSize}
            fillLetters={this.fillLetters}
            letters={this.state.letters}
            mode={mode}
            performAction={this.performAction}
            returnToAction={this.returnToAction}
          />
        </div>
      );
  }
}

export default Game;
