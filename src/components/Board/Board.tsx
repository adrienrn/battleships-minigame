import React from "react";
import { ReactComponent as ShipBattleshipIcon } from "../../assets/ship-battleship.svg";
import { ReactComponent as ShipDestroyerIcon } from "../../assets/ship-destroyer.svg";
import { BoardCell as BoardCellType, BoardCellState } from "../../types/Board";
import { Ship, ShipType } from "../../types/Ship";
import { TileWithFog, TileWithHit, TileWithMiss } from "../Tile/Tile";
import styles from "./Board.module.css";

export const Board: React.FC<{
  cells: BoardCellType[];
  debug?: boolean;
  ships: Ship[];
  shots?: number[];
}> = ({ cells = [], debug = false, ships = [], shots = [] }) => {
  return (
    <div className={styles["Board"]}>
      {cells.map((currentCell) => (
        <BoardCell
          cell={currentCell}
          debug={debug}
          key={currentCell.id}
          ships={ships}
          shots={shots}
        />
      ))}
    </div>
  );
};

const BoardCell: React.FC<{
  cell: BoardCellType;
  debug?: boolean;
  ships?: Ship[];
  shots?: number[];
}> = ({ cell, debug, ships = [], shots = [] }) => {
  const cellState = computeTileState(cell, ships, shots);

  return (
    <div className={styles["Board__cell"]}>
      {cellState === BoardCellState.MISS && <TileWithMiss cell={cell} />}
      {cellState === BoardCellState.HIT && <TileWithHit cell={cell} />}
      {cellState === BoardCellState.UNKNOWN && <TileWithFog cell={cell} />}
      {debug && <BoardCellDebug cell={cell} ships={ships} />}
    </div>
  );
};

export const BoardCellDebug: React.FC<{
  cell: BoardCellType;
  ships: Ship[];
}> = ({ cell, ships }) => {
  const matchingShip: Ship | undefined = findMatchingShip(cell, ships);
  if (!matchingShip) {
    return null;
  }

  return (
    <span className={styles["Board__cell__ship-marker"]}>
      {matchingShip.type === ShipType.BATTLESHIP && (
        <ShipBattleshipIcon
          className={styles["Board__cell__ship-marker__icon"]}
        />
      )}
      {matchingShip.type === ShipType.DESTROYER && (
        <ShipDestroyerIcon
          className={styles["Board__cell__ship-marker__icon"]}
        />
      )}
    </span>
  );
};

function computeTileState(cell: BoardCellType, ships: Ship[], shots: number[]) {
  const matchingShip = findMatchingShip(cell, ships);
  const hasCellBeenShot = shots.includes(cell.id);

  if (hasCellBeenShot && !!matchingShip) {
    return BoardCellState.HIT;
  }
  if (hasCellBeenShot && !matchingShip) {
    return BoardCellState.MISS;
  }

  return BoardCellState.UNKNOWN;
}

function findMatchingShip(cell: BoardCellType, ships: Ship[]) {
  return ships.find((value) => {
    return value.cells.some((e: any) => e === cell.id);
  });
}
