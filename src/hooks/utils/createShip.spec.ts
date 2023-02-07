import { ShipOrientation, ShipType } from "../../types/Ship";
import { createShip, detectCollisionWithObjects } from "./createShip";

describe("createShip", () => {
  it("can create a ship -- horizontal", () => {
    const ship = createShip(
      15,
      ShipType.BATTLESHIP,
      ShipOrientation.HORIZONTAL
    );

    expect(ship.cells).toEqual([15, 16, 17, 18, 19]);
    expect(ship.orientation).toBe(ShipOrientation.HORIZONTAL);
    expect(ship.type).toBe(ShipType.BATTLESHIP);
  });

  it("can create a ship -- vertical", () => {
    const ship = createShip(12, ShipType.DESTROYER, ShipOrientation.VERTICAL);

    expect(ship.cells).toEqual([12, 22, 32, 42]);
    expect(ship.orientation).toBe(ShipOrientation.VERTICAL);
    expect(ship.type).toBe(ShipType.DESTROYER);
  });
});

describe("detectCollisionWithObjects", () => {
  it("returns true if collision", () => {
    const existingShip = createShip(
      15,
      ShipType.BATTLESHIP,
      ShipOrientation.HORIZONTAL
    );
    const newShip = createShip(5, ShipType.DESTROYER, ShipOrientation.VERTICAL);

    // Both will collide at coordinate 15 / F2
    const isCollisionDetected = detectCollisionWithObjects(
      [existingShip],
      newShip
    );

    expect(isCollisionDetected).toBe(true);
  });

  it("returns false if NO collision", () => {
    const existingShip = createShip(
      15,
      ShipType.BATTLESHIP,
      ShipOrientation.HORIZONTAL
    );
    const newShip = createShip(
      40,
      ShipType.DESTROYER,
      ShipOrientation.VERTICAL
    );

    // No collision, exisiting ship is roughly top-right, newShip is roughly bottom-left
    const isCollisionDetected = detectCollisionWithObjects(
      [existingShip],
      newShip
    );

    expect(isCollisionDetected).toBe(false);
  });
});
