import React, { Component } from 'react';
import { Button } from 'antd';
import Controls from './Controls';
import letterValues from '../assets/data/letterValues.json';
import spelling from 'spelling';
import dictionary from 'spelling/dictionaries/en_US';
import {
  containsIndex,
  handleAddedLetter,
  handleAlreadyClicked
} from '../assets/utils';
import '../assets/css/Board.css';

const words = new spelling(dictionary);

type Props = {
  letters: Array<Array<string>>,
  mode: 'action' | 'swap' | 'word',
  fillLetters: (selectedLetters: Array<Array<number>>) => void,
  performAction: (currentAction: string, idx1: number, idx2: number) => void,
  returnToAction: () => void
};

type State = {
  selectedLetters: Array<Array<number>>,
  similarIdx: number
};

class Board extends Component<Props, State> {
  state: State = {
    selectedLetters: [],
    similarIdx: -1
  }

  constructor(props: Props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.performAction = this.performAction.bind(this);
  }

  onLetterClick(idx1: number, idx2: number) {
    const { selectedLetters, similarIdx } = this.state;
    const { mode } = this.props;

    const index = containsIndex(selectedLetters, idx1, idx2);

    if (index !== -1) {
      handleAlreadyClicked(index, selectedLetters);
      if (selectedLetters.length === 0) {
        this.setState({similarIdx: -1});
      }
      this.setState({ selectedLetters });
      return;
    }

    if (mode !== 'word' && selectedLetters.length === 0) {
      selectedLetters.push([idx1, idx2]);
      this.setState({ selectedLetters });
      return;
    } else if (mode !== 'word') {
      alert('Error: Cannot select more than one letter');
      return;
    }

    if (selectedLetters.length === 0) {
      selectedLetters.push([idx1, idx2]);
    } else {
      const curSimilarIndex =
        handleAddedLetter(similarIdx, selectedLetters, idx1, idx2);
      if (curSimilarIndex) {
        this.setState({similarIdx: curSimilarIndex});
      }
    }

    this.setState({ selectedLetters });
  }

  onSubmit() {
    const { selectedLetters } = this.state;
    const { letters, returnToAction } = this.props;
    let proposedWord = '';

    selectedLetters.forEach(idxs => {
      proposedWord += letters[idxs[0]][idxs[1]]
    });

    const isWord = words.lookup(proposedWord).found;

    if (isWord) {
      let score = 0;
      [...proposedWord].forEach(letter => score += letterValues[letter]);
      this.props.fillLetters(selectedLetters);
      this.setState({ selectedLetters: [], similarIdx: -1});
      alert(`Congratulations! You found a ${score} point word`);
      returnToAction();
    } else {
      this.setState({ selectedLetters: [], similarIdx: -1});
      alert('Error: You submitted an invalid word');
    }
  }

  performAction(currentAction: string) {
    const { selectedLetters } = this.state;

    if (selectedLetters.length === 0) {
      alert('Error: Please select a letter to perform an action on');
      return;
    }

    this.props.performAction(
      currentAction,
      selectedLetters[0][0],
      selectedLetters[0][1]
    );
    this.setState({selectedLetters: []});

  }

  render() {
    const { selectedLetters } = this.state;
    const { letters, mode } = this.props;

    return (
      <div>
        <Controls
          mode={mode}
          performAction={this.performAction}
          onSkipWord={this.props.returnToAction}
        />
        <div className="box">
          {letters.map((row, idx1) => (
            <div className="row" key={idx1}>
              {row.map((letter, idx2) => (
                <div
                  className="tile"
                  key={idx2}
                  onClick={() => this.onLetterClick(idx1, idx2)}
                  style={
                    containsIndex(selectedLetters, idx1, idx2) === -1
                    ? {}
                    : {boxShadow: '0 0 0 3pt #4286f4'}
                  }
                >
                  <span className="letter">{letter}</span>
                  <span className="value">{letterValues[letter]}</span>
                </div>
              ))}
            </div>
          ))}
          {selectedLetters.length && mode === 'word'
            ? <Button
                icon="right-square"
                onClick={this.onSubmit}
                type="primary"
              >
                Submit Word
              </Button>
            : null}
        </div>
      </div>
    );
  }
}

export default Board;
