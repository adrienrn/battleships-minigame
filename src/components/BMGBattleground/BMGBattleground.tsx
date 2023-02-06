import Preact from "preact";
import type { Ship } from "../../types/Ship";
import styles from "./BMGBattleground.module.css";

export const BMGBattleground: Preact.FunctionComponent<{
  cells: string[];
  ships: Ship[];
}> = ({ cells = [], ships = [] }) => {
  return (
    <div class={styles["BMGBattleground__grid"]}>
      {cells.map((e, i) => {
        const hasShipAtCoordinates = ships.some((value) => {
          return value.cells.some((e: any) => e === i);
        });
        return (
          <div class={styles["BMGBattleground__cell"]}>
            <span class={styles["BMGBattleground__cell__label"]}>
              {i + " / " + e}
            </span>
            {hasShipAtCoordinates && (
              <span class={styles["BMGBattleground__cell__ship"]}>S</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
