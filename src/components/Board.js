import React from 'react';
import letterValues from '../assets/data/letterValues.json';
import '../assets/css/Board.css';

type Props = {
  letters: Array<Array<string>>
};

const Board = (props: Props) => {
  const { letters } = props;

  return (
    <div class="box">
      {letters.map(row => (
        <div class="row">
          {row.map(letter => (
            <div class="tile">
              <span class="letter">{letter}</span>
              <span class="value">{letterValues[letter]}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
