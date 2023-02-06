import { useMemo } from "preact/hooks";
import "./app.css";
import { BMGBattleground } from "./components/BMGBattleground/BMGBattleground";
import { createShip } from "./logic/createShip";
import { Ship, ShipOrientation, ShipType } from "./types/Ship";

function generateBattleground() {
  const alphabet = [...new Array(26)].map((_, i) => i + 65);
  return [...Array(100)].map((_, i) => {
    return String.fromCharCode(alphabet[i % 10]) + Math.floor(i / 10 + 1);
  });
}

function generateShips() {
  const ships: Ship[] = [];

  [ShipType.BATTLESHIP, ShipType.DESTROYER, ShipType.DESTROYER].forEach(
    (currentType: ShipType) => {
      ships.push(
        createShip(
          currentType,
          Math.floor(Math.random() * 2) === 0
            ? ShipOrientation.HORIZONTAL
            : ShipOrientation.VERTICAL,
          ships
        )
      );
    }
  );

  return ships;
}

export function App() {
  const battlegroundCells = useMemo(() => generateBattleground(), []);
  const ships = useMemo(() => generateShips(), []);

  return (
    <>
      <BMGBattleground cells={battlegroundCells} ships={ships} />
    </>
  );
}
