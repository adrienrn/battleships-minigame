import { ShipOrientation } from "../types/Ship";

export function findSuitableSpaceForObject(
  length: number,
  direction: ShipOrientation
) {
  if (direction === ShipOrientation.HORIZONTAL) {
    // Pick a spot that fits an horizontal ship of given length.
    const maybeOriginX = Math.floor(Math.random() * (10 - length));
    const maybeOriginY = Math.floor(Math.random() * 10);

    return 10 * maybeOriginY + maybeOriginX;
  }

  // Otherwise, pick a spot that fits a vertical ship of given length.
  const maybeOriginX = Math.floor(Math.random() * 10);
  const maybeOriginY = Math.floor(Math.random() * (10 - length));

  return 10 * maybeOriginY + maybeOriginX;
}
