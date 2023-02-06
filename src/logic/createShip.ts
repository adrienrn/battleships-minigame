import { Ship, ShipOrientation, ShipType } from "../types/Ship";
import { detectCollisionWithObjects } from "./detectCollisionWithOtherObjects";
import { findSuitableSpaceForObject } from "./findSuitableSpaceForObject";

const shipLengths = {
  [ShipType.BATTLESHIP]: 5,
  [ShipType.DESTROYER]: 4,
};

export function createShip(
  type: ShipType,
  direction: ShipOrientation,
  ships: Ship[] = []
) {
  const lengthOfShip = shipLengths[type];

  let selectedCells: number[] = [];
  while (selectedCells.length === 0) {
    const origin = findSuitableSpaceForObject(shipLengths[type], direction);
    const cells = [];
    if (direction === ShipOrientation.HORIZONTAL) {
      while (cells.length < lengthOfShip) {
        cells.push(origin + cells.length);
      }
    } else {
      while (cells.length < lengthOfShip) {
        cells.push(origin + 10 * cells.length);
      }
    }

    const isCollisionDetected = detectCollisionWithObjects(ships, { cells });
    if (!isCollisionDetected) {
      // We found a suitable position that fits the ship ship.
      selectedCells = cells;
    }
  }

  return {
    cells: selectedCells,
  };
}
