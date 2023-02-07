import { Ship, ShipOrientation, ShipType } from "../types/Ship";
import { getRandomInt } from "../utils/getRandomInt";

const shipLengths = {
  [ShipType.BATTLESHIP]: 5,
  [ShipType.DESTROYER]: 4,
};

export function createShip(
  origin: number,
  type: ShipType,
  orientation: ShipOrientation
): Ship {
  const lengthOfShip = shipLengths[type];
  const cells = [];
  if (orientation === ShipOrientation.HORIZONTAL) {
    while (cells.length < lengthOfShip) {
      cells.push(origin + cells.length);
    }
  } else {
    while (cells.length < lengthOfShip) {
      cells.push(origin + 10 * cells.length);
    }
  }

  return {
    cells,
    orientation,
    type,
  };
}

export function createShipAtRandomPosition(type: ShipType, ships: Ship[] = []) {
  let ship: Ship | undefined = undefined;
  let attempts = 0;
  while (!ship && attempts < 10) {
    const orientation = pickOrientationForObject();
    const origin = pickOriginForObject(shipLengths[type], orientation);

    const maybeShip = createShip(origin, type, orientation);

    const isCollisionDetected = detectCollisionWithObjects(ships, maybeShip);
    if (!isCollisionDetected) {
      // We found a suitable position that fits the ship.
      ship = maybeShip;
    }
    ++attempts;
  }

  if (attempts === 10) {
    throw new Error(
      `Could not find a suitable position for ship of type "${type}" after ${attempts} tries`
    );
  }

  return ship;
}

export function pickOriginForObject(
  length: number,
  orientation: ShipOrientation,
  areaSize = 10
) {
  // Pick a spot that fits an horizontal ship of given length.
  if (orientation === ShipOrientation.HORIZONTAL) {
    // We pick a (X, Y), where Y can range from 0 to max and X is restricted
    // to accomodate the ship length
    // i.e. if areaSize=10 and length=5, we pick a X between 0 and 5
    const maybeOriginX = getRandomInt(0, areaSize - length);
    const maybeOriginY = getRandomInt(0, areaSize);

    return 10 * maybeOriginY + maybeOriginX;
  }

  // Otherwise, pick a spot that fits a vertical ship of given length.
  // We pick a (X, Y), where X can range from 0 to max and Y is restricted
  // to accomodate the ship length
  // i.e. if areaSize=10 and length=4, we pick a Y between 0 and 6
  const maybeOriginX = getRandomInt(0, areaSize);
  const maybeOriginY = getRandomInt(0, areaSize - length);

  return 10 * maybeOriginY + maybeOriginX;
}

export function pickOrientationForObject() {
  return getRandomInt(0, 2) === 0
    ? ShipOrientation.HORIZONTAL
    : ShipOrientation.VERTICAL;
}

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
