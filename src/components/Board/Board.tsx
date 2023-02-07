import React from "react";
import type { Ship } from "../../types/Ship";
import styles from "./Board.module.css";

export const Board: React.FC<{
  cells: string[];
  ships: Ship[];
}> = ({ cells = [], ships = [] }) => {
  return (
    <div className={styles["Board__grid"]} data-board-size={10}>
      {cells.map((e, i) => {
        const hasShipAtCoordinates = ships.some((value) => {
          return value.cells.some((e: any) => e === i);
        });
        return (
          <div className={styles["Board__cell"]} key={i}>
            <span className={styles["Board__cell__label"]}>
              {i + " / " + e}
            </span>
            {hasShipAtCoordinates && (
              <span className={styles["Board__cell__ship"]}>S</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
