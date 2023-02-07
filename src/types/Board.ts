export type BoardCell = {
  id: number;
  label: string;
};

export enum BoardCellState {
  UNKNOWN,
  MISS,
  HIT,
}
