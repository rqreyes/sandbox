import React from 'react';
import Row from '../molecules/Row';

interface iBoardProps {
  grid: iSquare[][];
  settings: iSettings;
  currPlayer: number;
  handleCurrPiece: iHandlePiece;
  handleMovePiece: iHandlePiece;
}

const Board: React.FC<iBoardProps> = ({
  grid,
  settings,
  currPlayer,
  handleCurrPiece,
  handleMovePiece,
}) => {
  const shapeDisplay =
    settings.shape === 'circle'
      ? 'circle'
      : settings.shape === 'square'
      ? 'square'
      : '';
  const themeDisplay =
    settings.theme === 'fire'
      ? 'fire'
      : settings.theme === 'wood'
      ? 'wood'
      : '';

  const RowCount = grid.map((row, rowInd) => {
    return (
      <Row
        key={`row-${rowInd}`}
        row={row}
        rowInd={rowInd}
        currPlayer={currPlayer}
        handleCurrPiece={handleCurrPiece}
        handleMovePiece={handleMovePiece}
      />
    );
  });

  return (
    <div className='board'>
      <h3>Player {currPlayer}'s Turn</h3>
      <div className={`grid ${shapeDisplay} ${themeDisplay}`}>{RowCount}</div>
    </div>
  );
};

export default Board;
