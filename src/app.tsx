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
  const [isDebugEnabled, setIsDebugEnabled] = useState<boolean>(false);
  const battlegroundCells = useMemo(() => generateBoard(), []);
  const [ships, setShips] = useState<Ship[]>(generateShips(startingArmada));

  // This is a temporary minimal input for playing, this will be addressed in next PR.
  const [shotsAsString, setShotsAsString] = useState<string>("23,24");

  const reset = useCallback(() => {
    setShips(generateShips(startingArmada));
  }, []);

  return (
    <>
      <button onClick={reset} type="button">
        Reset
      </button>
      <input
        checked={isDebugEnabled}
        onChange={() => {
          setIsDebugEnabled(!isDebugEnabled);
        }}
        type="checkbox"
      />
      <input
        onChange={(e) => {
          setShotsAsString(e.target.value);
        }}
        value={shotsAsString}
        type="text"
      />
      <Board
        cells={battlegroundCells}
        debug={isDebugEnabled}
        ships={ships}
        shots={shotsAsString.split(",").map((v) => parseInt(v, 10))}
      />
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
