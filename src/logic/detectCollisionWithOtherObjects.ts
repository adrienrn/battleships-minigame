import { Ship } from "../types/Ship";

export function detectCollisionWithObjects(ships: Ship[], newShip: Ship) {
  const occupiedCells = new Set(
    ships.reduce<number[]>(
      (accumulator: number[], currentShip: Ship) =>
        accumulator.concat(currentShip.cells),
      []
    )
  );

  const collisionDetected = newShip.cells.some((value: number) => {
    return occupiedCells.has(value);
  });

  return collisionDetected;
}
