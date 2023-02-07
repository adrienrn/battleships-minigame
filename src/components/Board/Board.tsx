import React from "react";
import { ReactComponent as ShipBattleshipIcon } from "../../assets/ship-battleship.svg";
import { ReactComponent as ShipDestroyerIcon } from "../../assets/ship-destroyer.svg";
import { BoardCell, BoardCellState } from "../../types/Board";
import { Ship, ShipType } from "../../types/Ship";
import { TileWithFog, TileWithHit, TileWithMiss } from "../Tile/Tile";
import styles from "./Board.module.css";

export const Board: React.FC<{
  cells: BoardCell[];
  debug?: boolean;
  ships: Ship[];
  shots?: number[];
}> = ({ cells = [], debug = false, ships = [], shots = [] }) => {
  return (
    <div className={styles["Board__grid"]}>
      {cells.map((currentCell) => (
        <BoardGridItem
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

const BoardGridItem: React.FC<{
  cell: BoardCell;
  debug?: boolean;
  ships?: Ship[];
  shots?: number[];
}> = ({ cell, debug, ships = [], shots = [] }) => {
  const cellState = computeTileState(cell, ships, shots);

  return (
    <div className={styles["Board__grid__item"]}>
      {cellState === BoardCellState.MISS && <TileWithMiss cell={cell} />}
      {cellState === BoardCellState.HIT && <TileWithHit cell={cell} />}
      {cellState === BoardCellState.UNKNOWN && <TileWithFog cell={cell} />}
      {debug && <BoardCellDebugOverlay cell={cell} ships={ships} />}
    </div>
  );
};

export const BoardCellDebugOverlay: React.FC<{
  cell: BoardCell;
  ships: Ship[];
}> = ({ cell, ships }) => {
  const matchingShip: Ship | undefined = findMatchingShip(cell, ships);
  if (!matchingShip) {
    return null;
  }

  return (
    <span className={styles["Board__grid__ship-marker"]}>
      {matchingShip.type === ShipType.BATTLESHIP && (
        <ShipBattleshipIcon
          className={styles["Board__grid__ship-marker__icon"]}
        />
      )}
      {matchingShip.type === ShipType.DESTROYER && (
        <ShipDestroyerIcon
          className={styles["Board__grid__ship-marker__icon"]}
        />
      )}
    </span>
  );
};

function computeTileState(cell: BoardCell, ships: Ship[], shots: number[]) {
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

function findMatchingShip(cell: BoardCell, ships: Ship[]) {
  return ships.find((value) => {
    return value.cells.some((e: any) => e === cell.id);
  });
}
