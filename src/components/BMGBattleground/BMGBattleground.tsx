import Preact from "preact";
import styles from "./BMGBattleground.module.css";

export const BMGBattleground: Preact.FunctionComponent<{
  cells: string[];
  ships: any[];
}> = ({ cells = [], ships = [] }) => {
  return (
    <div class={styles["BMGBattleground__grid"]}>
      {cells.map((e, i) => {
        const hasShipAtCoordinates = ships.some((value) => {
          console.log(
            value,
            value.cells.some((e: any) => e === i)
          );
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
