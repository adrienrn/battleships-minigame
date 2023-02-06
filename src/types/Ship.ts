export enum ShipOrientation {
  HORIZONTAL = 0,
  VERTICAL = 1,
}

export enum ShipType {
  BATTLESHIP = 1,
  DESTROYER = 2,
}

export type Ship = {
  cells: number[];
};
