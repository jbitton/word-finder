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
    this.setState({ currentAction: command, modalVisible: true, mode: 'modal'});
    // function to show modal to select a letter to perform the command on
    // another modal to show which letter to swap with
  }

  onCancel() {
    this.setState({ modalVisible: false, mode: 'action'});
  }

  performAction(idx1, idx2) {
    console.log(idx1, idx2);
    const { currentAction } = this.state;
    this.setState({ modalVisible: false, mode: 'action'});
    if (currentAction === 'up') {

    } else if (currentAction === 'down') {

    } else if (currentAction === 'left') {

    } else if (currentAction === 'right') {

    } else if (currentAction === 'swap') {

    }
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
            minHeight: `${60 * boardSize + 50}px`,
            minWidth: `${60 * boardSize}px`
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
          <Controls onControlSelected={this.onControlSelected} />
          <Board
            boardSize={boardSize}
            fillLetters={this.fillLetters}
            letters={this.state.letters}
            mode={mode}
            performAction={this.performAction}
          />
        </div>
      );
  }
}

export default Game;
