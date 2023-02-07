export type BoardCell = {
  id: number;
  label: string;
  state: BoardCellState;
};

export enum BoardCellState {
  UNKNOWN,
  MISS,
  HIT,
}
