import { ShipType, Ship } from "../../types/Ship";
import { createShipAtRandomPosition } from "./createShip";

export function generateFleet(shipTypes: ShipType[]) {
  const ships: Ship[] = [];

  shipTypes.forEach((currentType: ShipType) => {
    const newlyCreatedShip = createShipAtRandomPosition(currentType, ships);
    if (!!newlyCreatedShip) {
      ships.push(newlyCreatedShip);
    }
  });

  return ships;
}
