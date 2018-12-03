import React, { Component } from 'react';
import { Button } from 'antd';
import letterValues from '../assets/data/letterValues.json';
import spelling from 'spelling';
import dictionary from 'spelling/dictionaries/en_US';
import '../assets/css/Board.css';

const words = new spelling(dictionary);

type Props = {
  letters: Array<Array<string>>
};

type State = {
  selectedLetters: Array<Array<number>>
};

class Board extends Component<Props, State> {
  state: State = {
    selectedLetters: [],
    similarIdx: -1
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getSimilarIndexFirst(idx1, idx2) {
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

  getSimilarIndexLast(idx1, idx2) {
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

  containsIndex(idx1, idx2) {
    const { selectedLetters } = this.state;
    let indexFound = -1;

    selectedLetters.forEach((idxs, i) => {
      if (idxs[0] === idx1 && idxs[1] === idx2) {
        indexFound = i;
      }
    });

    return indexFound;
  }

  onLetterClick(idx1, idx2, letter) {
    const { selectedLetters, similarIdx } = this.state;

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
    const { letters } = this.props;
    let proposedWord = '';

    selectedLetters.forEach(idxs => {
      proposedWord += letters[idxs[0]][idxs[1]]
    });

    const isWord = words.lookup(proposedWord).found;

    if (isWord) {
      // increment score
      // remove letters in words from board
      // clear selectedLetters
      alert('yay')
    } else {
      this.setState({ selectedLetters: []});
      alert('Error: You submitted an invalid word')
    }
  }

  render() {
    const { selectedLetters } = this.state;
    const { letters } = this.props;

    return (
      <div className="box">
        {letters.map((row, idx1) => (
          <div className="row" key={idx1}>
            {row.map((letter, idx2) => (
              <div
                className="tile"
                key={idx2}
                onClick={() => this.onLetterClick(idx1, idx2, letter)}
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
        {selectedLetters.length
          ? <Button
              icon="right-square"
              onClick={this.onSubmit}
              type="primary"
            >
              Submit Word
            </Button>
          : null}
      </div>
    );
  }
}

export default Board;
