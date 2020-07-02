interface iSquare {
  player: number;
  current: boolean;
  possible: boolean;
  isKing: boolean;
}

interface iSettings {
  shape: string;
  theme: string;
}

interface iCurrent {
  player: number;
  piece: [number, number] | [];
}

interface iHandleGridSize {
  (gridInput: number): void;
}

interface iHandlePiece {
  ([rowInd, colInd]: [number, number]): void;
}
