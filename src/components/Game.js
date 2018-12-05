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
  modalVisible: boolean
};

class Game extends Component<Props, State> {
  state: State = {
    letters: [...Array(this.props.boardSize).keys()].map(() => (
      [...Array(this.props.boardSize).keys()].map(() => this.generateRandomLetter())
    )),
    currentAction: '',
    mode: 'action',
    modalVisible: false
  }

  constructor(props: Props) {
    super(props);
    this.fillLetters = this.fillLetters.bind(this);
    this.onControlSelected = this.onControlSelected.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.performAction = this.performAction.bind(this);
    this.returnToAction = this.returnToAction.bind(this);
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

    }
    this.setState({ letters: letters, modalVisible: false, mode: 'word'});
  }


  render() {
    const { boardSize } = this.props;
    const { modalVisible, mode } = this.state;

    return modalVisible
      ? (
        <Modal
          title="Please Select a Letter to Perform the Action"
          visible={true}
          onCancel={this.onCancel}
          footer={null}
          style={{
            height: `${60 * boardSize + 50}px`,
            minWidth: `${50 * boardSize + 50}px`,
            maxWidth: `${50 * boardSize + 50}px`
          }}
        >
          <Board
            boardSize={boardSize}
            fillLetters={this.fillLetters}
            letters={this.state.letters}
            mode={mode}
            performAction={this.performAction}
          />
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
