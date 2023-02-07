import { useCallback, useMemo, useState } from "react";
import "./app.css";
import { Board } from "./components/Board/Board";
import { createShipAtRandomPosition } from "./logic/createShip";
import { generateBoard } from "./logic/generateBoard";
import { Ship, ShipType } from "./types/Ship";

export function App() {
  const startingArmada = [
    ShipType.BATTLESHIP,
    ShipType.DESTROYER,
    ShipType.DESTROYER,
  ];
  const battlegroundCells = useMemo(() => generateBoard(), []);
  const [ships, setShips] = useState(generateShips(startingArmada));

  const reset = useCallback(() => {
    setShips(generateShips(startingArmada));
  }, []);

  return (
    <>
      <button onClick={reset} type="button">
        Reset
      </button>
      <Board cells={battlegroundCells} ships={ships} />
    </>
  );
}

function generateShips(shipTypes: ShipType[]) {
  const ships: Ship[] = [];

  shipTypes.forEach((currentType: ShipType) => {
    const newlyCreatedShip = createShipAtRandomPosition(currentType, ships);
    if (!!newlyCreatedShip) {
      ships.push(newlyCreatedShip);
    }
  });

  return ships;
}
