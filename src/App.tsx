import React, { useState, useEffect } from 'react';
import GridSize from './components/organisms/GridSize';
import Board from './components/organisms/Board';
import Settings from './components/organisms/Settings';
import './styles/styles.scss';

function App() {
  const initSettings = {
    shape: 'circle',
    theme: 'fire',
  };
  const initCurrent: iCurrent = {
    player: 1,
    piece: [],
  };

  const [grid, setGrid] = useState<iSquare[][]>([]);
  const [settings, setSettings] = useState(initSettings);
  const [current, setCurrent] = useState(initCurrent);

  // square constructor
  class Square {
    player: number;
    current: boolean;
    possible: boolean;
    isKing: boolean;

    constructor(player: number) {
      this.player = player;
      this.current = false;
      this.possible = false;
      this.isKing = false;
    }
  }

  // create the grid
  const newGrid = (gridInput: number) => {
    const grid = [];

    // create the grid rows
    for (let i = 0; i < gridInput; i += 1) {
      const gridRow = [];

      // create the grid columns
      // if top 2 rows, then add p2 pieces
      if (i === 0) {
        for (let j = 0; j < gridInput; j += 1) {
          if (j % 2 === 0) {
            gridRow.push(new Square(0));
          } else {
            gridRow.push(new Square(2));
          }
        }
      } else if (i === 1) {
        for (let j = 0; j < gridInput; j += 1) {
          if (j % 2 === 0) {
            gridRow.push(new Square(2));
          } else {
            gridRow.push(new Square(0));
          }
        }
        // if bottom 2 rows, then add p1 pieces
      } else if (i === gridInput - 1) {
        for (let j = 0; j < gridInput; j += 1) {
          if (j % 2 === 0) {
            gridRow.push(new Square(1));
          } else {
            gridRow.push(new Square(0));
          }
        }
      } else if (i === gridInput - 2) {
        for (let j = 0; j < gridInput; j += 1) {
          if (j % 2 === 0) {
            gridRow.push(new Square(0));
          } else {
            gridRow.push(new Square(1));
          }
        }
      } else {
        for (let j = 0; j < gridInput; j += 1) {
          gridRow.push(new Square(0));
        }
      }
      grid.push(gridRow);
    }

    return grid;
  };

  // update grid size and instantiate grid
  const handleGridSize = (gridInput: number) => {
    setGrid(newGrid(gridInput));
  };

  // update current piece, possible moves, and grid
  const handleCurrPiece = ([rowInd, colInd]: [number, number]) => {
    let gridCopy = [...grid];
    const target = gridCopy[rowInd][colInd];

    // remove previous current piece
    if (current.piece.length) {
      gridCopy[current.piece[0]][current.piece[1]].current = false;
    }

    // add new current piece
    if (target.player) {
      gridCopy[rowInd][colInd].current = true;
    }

    // remove previous possible moves
    gridCopy = gridCopy.map((row) =>
      row.map((col) => {
        if (col.possible) return { ...col, possible: false };
        else return col;
      })
    );

    // add possible moves
    if (target.player === 1) {
      // for player 1
      const upLeft = gridCopy[rowInd - 1][colInd - 1];
      const upRight = gridCopy[rowInd - 1][colInd + 1];

      if (upLeft && upLeft.player === 0) {
        upLeft.possible = true;
      }
      if (upRight && upRight.player === 0) {
        upRight.possible = true;
      }
    } else if (target.player === 2) {
      // for player 2
      const downLeft = gridCopy[rowInd + 1][colInd - 1];
      const downRight = gridCopy[rowInd + 1][colInd + 1];

      if (downLeft && downLeft.player === 0) {
        downLeft.possible = true;
      }
      if (downRight && downRight.player === 0) {
        downRight.possible = true;
      }
    }

    setGrid(gridCopy);
    setCurrent({
      ...current,
      piece: [rowInd, colInd],
    });
  };

  const handleMovePiece = ([rowInd, colInd]: [number, number]) => {
    let gridCopy = [...grid];
    const target = { ...gridCopy[current.piece[0]!][current.piece[1]!] };

    // remove previous possible moves
    gridCopy = gridCopy.map((row) =>
      row.map((col) => {
        if (col.possible) return { ...col, possible: false };
        else return col;
      })
    );

    // remove previous piece
    gridCopy[current.piece[0]!][current.piece[1]!].player = 0;

    // move current piece over
    gridCopy[rowInd][colInd] = target;
    gridCopy[rowInd][colInd].current = false;

    // switch player turn
    const turn = current.player === 1 ? 2 : 1;

    setGrid(gridCopy);
    setCurrent({
      player: turn,
      piece: [],
    });
  };

  // save game into local storage
  const handleSave = () => {
    localStorage.setItem('grid', JSON.stringify(grid));
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('current', JSON.stringify(current));
  };

  // reset game and clear local storage
  const handleReset = () => {
    setGrid([]);
    setSettings(initSettings);
    setCurrent(initCurrent);
    localStorage.clear();
  };

  // on mount, fetch grid and current piece from local storage
  useEffect(() => {
    const localGrid = localStorage.getItem('grid');
    const localSettings = localStorage.getItem('settings');
    const localCurrent = localStorage.getItem('current');

    if (localGrid) setGrid(JSON.parse(localGrid));
    if (localSettings) setSettings(JSON.parse(localSettings));
    if (localCurrent) setCurrent(JSON.parse(localCurrent));
  }, []);

  // conditionally render if user has set the grid size
  let step;
  if (grid.length) {
    // display board
    step = (
      <div className='game'>
        <Board
          grid={grid}
          settings={settings}
          currPlayer={current.player}
          handleCurrPiece={handleCurrPiece}
          handleMovePiece={handleMovePiece}
        />
        <Settings
          settings={settings}
          setSettings={setSettings}
          handleReset={handleReset}
          handleSave={handleSave}
        />
      </div>
    );
  } else {
    // request board size
    step = <GridSize handleGridSize={handleGridSize} />;
  }

  return (
    <div className='App'>
      <h1>Budeckers</h1>
      {step}
    </div>
  );
}

export default App;
