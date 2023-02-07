import clsx from "clsx";
import React from "react";
import { ReactComponent as TileHitStateIcon } from "../../assets/board-cell-hit.svg";
import { ReactComponent as TileUnknownStateIcon } from "../../assets/board-cell-unknown.svg";
import { BoardCell } from "../../types/Board";
import styles from "./Tile.module.css";

export const TileWithHit: React.FC<{
  cell: BoardCell;
}> = ({ cell }) => {
  return (
    <div className={clsx(styles["Tile"], styles["Tile--hit"])}>
      <span className={styles["Tile__label"]}>{cell.label}</span>
      <TileHitStateIcon />
      <span className={clsx(styles["Tile__state"], styles["Tile__state--hit"])}>
        Hit!
      </span>
    </div>
  );
};

export const TileWithMiss: React.FC<{
  cell: BoardCell;
}> = ({ cell }) => {
  return (
    <div className={clsx(styles["Tile"], styles["Tile--empty"])}>
      <span className={styles["Tile__label"]}>{cell.label}</span>
      <span
        className={clsx(styles["Tile__state"], styles["Tile__state--empty"])}
      >
        Miss!
      </span>
    </div>
  );
};

export const TileWithFog: React.FC<{
  cell: BoardCell;
}> = ({ cell }) => {
  return (
    <div className={clsx(styles["Tile"], styles["Tile--unknown"])}>
      <span className={styles["Tile__label"]}>{cell.label}</span>
      <TileUnknownStateIcon />
    </div>
  );
};
