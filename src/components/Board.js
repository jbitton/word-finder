import React from 'react';
import letterValues from '../assets/data/letterValues.json';
import '../assets/css/Board.css';

type Props = {
  letters: Array<Array<string>>
};

const Board = (props: Props) => {
  const { letters } = props;

  return (
    <div className="box">
      {letters.map((row, idx) => (
        <div className="row" key={idx}>
          {row.map((letter, idx) => (
            <div className="tile" key={idx}>
              <span className="letter">{letter}</span>
              <span className="value">{letterValues[letter]}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
