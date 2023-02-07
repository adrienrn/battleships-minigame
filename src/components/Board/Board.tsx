import clsx from "clsx";
import React from "react";
import { BoardCell, BoardCellState } from "../../types/Board";
import { Ship, ShipType } from "../../types/Ship";
import styles from "./Board.module.css";
import { ReactComponent as BoardCellStateHitIcon } from "../../assets/board-cell-hit.svg";
import { ReactComponent as BoardCellStateUnkIcon } from "../../assets/board-cell-unknown.svg";
import { ReactComponent as ShipBattleshipIcon } from "../../assets/ship-battleship.svg";
import { ReactComponent as ShipDestroyerIcon } from "../../assets/ship-destroyer.svg";

export const Board: React.FC<{
  cells: BoardCell[];
  debug?: boolean;
  ships: Ship[];
}> = ({ cells = [], debug = false, ships = [] }) => {
  return (
    <div className={styles["Board__grid"]}>
      {cells.map((currentCell, i) => {
        return (
          <React.Fragment key={currentCell.id}>
            {currentCell.state === BoardCellState.MISS && (
              <BoardCellEmpty cell={currentCell} debug={debug} ships={ships} />
            )}
            {currentCell.state === BoardCellState.HIT && (
              <BoardCellHit cell={currentCell} debug={debug} ships={ships} />
            )}
            {currentCell.state === BoardCellState.UNKNOWN && (
              <BoardCellUnknown
                cell={currentCell}
                debug={debug}
                ships={ships}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const BoardCellDebugOverlay: React.FC<{
  cell: BoardCell;
  ships: Ship[];
}> = ({ cell, ships }) => {
  const hasShipAtCoordinates = ships.find((value) => {
    return value.cells.some((e: any) => e === cell.id);
  });

  return (
    <React.Fragment>
      {!!hasShipAtCoordinates && (
        <span className={styles["Board__cell__ship"]}>
          {hasShipAtCoordinates.type === ShipType.BATTLESHIP && (
            <ShipBattleshipIcon />
          )}
          {hasShipAtCoordinates.type === ShipType.DESTROYER && (
            <ShipDestroyerIcon />
          )}
        </span>
      )}
    </React.Fragment>
  );
};

export const BoardCellHit: React.FC<{
  cell: BoardCell;
  debug?: boolean;
  ships: Ship[];
}> = ({ cell, debug = false, ships }) => {
  return (
    <div className={clsx(styles["Board__cell"], styles["Board__cell--hit"])}>
      <span className={styles["Board__cell__label"]}>{cell.label}</span>
      <BoardCellStateHitIcon />
      <span
        className={clsx(
          styles["Board__cell__state"],
          styles["Board__cell__state--hit"]
        )}
      >
        Hit!
      </span>
      {debug && <BoardCellDebugOverlay cell={cell} ships={ships} />}
    </div>
  );
};

export const BoardCellEmpty: React.FC<{
  cell: BoardCell;
  debug?: boolean;
  ships: Ship[];
}> = ({ cell, debug = false, ships }) => {
  return (
    <div className={clsx(styles["Board__cell"], styles["Board__cell--empty"])}>
      <span className={styles["Board__cell__label"]}>{cell.label}</span>
      <span
        className={clsx(
          styles["Board__cell__state"],
          styles["Board__cell__state--empty"]
        )}
      >
        Miss!
      </span>
      {debug && <BoardCellDebugOverlay cell={cell} ships={ships} />}
    </div>
  );
};

export const BoardCellUnknown: React.FC<{
  cell: BoardCell;
  debug?: boolean;
  ships: Ship[];
}> = ({ cell, debug = false, ships }) => {
  return (
    <div
      className={clsx(styles["Board__cell"], styles["Board__cell--unknown"])}
    >
      <span className={styles["Board__cell__label"]}>{cell.label}</span>
      <BoardCellStateUnkIcon />
      {debug && <BoardCellDebugOverlay cell={cell} ships={ships} />}
    </div>
  );
};
