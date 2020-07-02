import React from 'react';
import Button from '../atoms/Button';

interface iRowProps {
  row: iSquare[];
  rowInd: number;
  currPlayer: number;
  handleCurrPiece: iHandlePiece;
  handleMovePiece: iHandlePiece;
}

const Row: React.FC<iRowProps> = ({
  row,
  rowInd,
  currPlayer,
  handleCurrPiece,
  handleMovePiece,
}) => {
  const ColCount = row.map((col, colInd) => {
    const playerDisplay =
      col.player === 1 ? 'p1' : col.player === 2 ? 'p2' : '';
    const currDisplay = col.current ? 'curr' : '';
    const possMoveDisplay = col.possible ? 'poss-move' : '';
    const handleClick = () => {
      if (col.player === currPlayer) handleCurrPiece([rowInd, colInd]);
      if (col.possible) handleMovePiece([rowInd, colInd]);
    };

    return (
      <Button
        key={`col-${colInd}`}
        type='button'
        className={`${playerDisplay} ${currDisplay} ${possMoveDisplay}`}
        onClick={handleClick}
      />
    );
  });

  return <div className='row'>{ColCount}</div>;
};

export default Row;
