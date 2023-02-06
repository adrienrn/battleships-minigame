import React from "react";
import type { Ship } from "../../types/Ship";
import styles from "./BMGBattleground.module.css";

export const BMGBattleground: React.FC<{
  cells: string[];
  ships: Ship[];
}> = ({ cells = [], ships = [] }) => {
  return (
    <div className={styles["BMGBattleground__grid"]}>
      {cells.map((e, i) => {
        const hasShipAtCoordinates = ships.some((value) => {
          return value.cells.some((e: any) => e === i);
        });
        return (
          <div className={styles["BMGBattleground__cell"]} key={i}>
            <span className={styles["BMGBattleground__cell__label"]}>
              {i + " / " + e}
            </span>
            {hasShipAtCoordinates && (
              <span className={styles["BMGBattleground__cell__ship"]}>S</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
