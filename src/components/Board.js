import React, { Component } from 'react';
import { Button } from 'antd';
import Controls from './Controls';
import letterValues from '../assets/data/letterValues.json';
import spelling from 'spelling';
import dictionary from 'spelling/dictionaries/en_US';
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

  getSimilarIndexFirst(idx1: number, idx2: number) {
    const { selectedLetters } = this.state;

    if (
      selectedLetters[0][0] === idx1
      && Math.abs(idx2 - selectedLetters[0][1]) === 1
    ) {
      return idx1;
    }

    if (
      selectedLetters[0][1] === idx2
      && Math.abs(idx1 - selectedLetters[0][0]) === 1
    ) {
      return idx2;
    }

    return -1;
  }

  getSimilarIndexLast(idx1: number, idx2: number) {
    const { selectedLetters } = this.state;
    const lastIdx = selectedLetters.length - 1;

    if (
      selectedLetters[lastIdx][0] === idx1
      && Math.abs(idx2 - selectedLetters[lastIdx][1]) === 1
    ) {
      return idx1;
    }

    if (
      selectedLetters[lastIdx][1] === idx2
      && Math.abs(idx1 - selectedLetters[lastIdx][0]) === 1
    ) {
      return idx2;
    }

    return -1;
  }

  containsIndex(idx1: number, idx2: number) {
    const { selectedLetters } = this.state;
    let indexFound = -1;

    selectedLetters.forEach((idxs, i) => {
      if (idxs[0] === idx1 && idxs[1] === idx2) {
        indexFound = i;
      }
    });

    return indexFound;
  }

  onLetterClick(idx1: number, idx2: number) {
    const { selectedLetters, similarIdx } = this.state;
    const { mode } = this.props;

    const index = this.containsIndex(idx1, idx2);

    if (index !== -1) {
      if (index + 1 === selectedLetters.length) {
        selectedLetters.splice(index, 1);
      } else if (Math.min(index, selectedLetters.length - index - 1) === index) {
        selectedLetters.splice(0, index + 1);
      } else {
        selectedLetters.splice(index);
      }

      if (selectedLetters.length === 0) {
        this.setState({similarIdx: -1});
      }
      this.setState({ selectedLetters });
      return;
    }

    if ((mode === 'action' || mode === 'swap') && selectedLetters.length === 0) {
      selectedLetters.push([idx1, idx2]);
      this.setState({ selectedLetters });
      return;
    } else if (mode === 'action' || mode === 'swap') {
      alert('Error: Cannot select more than one letter');
      return;
    }

    if (selectedLetters.length === 0) {
      selectedLetters.push([idx1, idx2]);
    } else if (similarIdx === -1) {
      const curSimilarIndex = this.getSimilarIndexLast(idx1, idx2);

      if (curSimilarIndex === -1) {
        alert('Error: You can only select horizontally or vertically adjacent letters');
        return;
      }

      selectedLetters.push([idx1, idx2]);
      this.setState({similarIdx: curSimilarIndex});
    } else {
      const curSimilarIndexFirst = this.getSimilarIndexFirst(idx1, idx2);
      const curSimilarIndexLast = this.getSimilarIndexLast(idx1, idx2);

      if (
        similarIdx !== curSimilarIndexFirst
        && similarIdx !== curSimilarIndexLast
      ) {
        alert('Error: You can only select horizontally or vertically adjacent letters');
        return;
      }

      if (similarIdx === curSimilarIndexFirst) {
        selectedLetters.unshift([idx1, idx2]);
      }

      if (similarIdx === curSimilarIndexLast) {
        selectedLetters.push([idx1, idx2]);
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
                    this.containsIndex(idx1, idx2) === -1
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
