import { render, within } from "@testing-library/react";
import { createShip } from "../../hooks/utils/createShip";
import { generateBoard } from "../../hooks/utils/generateBoard";
import { ShipOrientation, ShipType } from "../../types/Ship";
import { Board } from "./Board";

describe("Board", () => {
  it("Renders the board", () => {
    const screen = render(
      <Board cells={generateBoard()} ships={[]} shots={[]} />
    );

    // Check we render from A1 to J10
    expect(screen.getByText("A1")).toBeDefined();
    expect(screen.getByText("E3")).toBeDefined();
    expect(screen.getByText("J10")).toBeDefined();

    // Check that the board is pristine!
    expect(screen.queryByText("Hit!")).toBeFalsy();
    expect(screen.queryByText("Miss!")).toBeFalsy();
  });

  it("renders hit marker if cell state is HIT", () => {
    const screen = render(
      <Board
        cells={generateBoard()}
        ships={[
          createShip(11, ShipType.BATTLESHIP, ShipOrientation.HORIZONTAL),
        ]}
        shots={[11]}
      />
    );

    const missElement = screen.getByText("Hit!").parentElement as HTMLElement;
    expect(missElement).toBeDefined();
    expect(within(missElement).getByText("B2")).toBeDefined();
  });

  it("renders miss marker if cell state is MISS", () => {
    const screen = render(
      <Board
        cells={generateBoard()}
        ships={[
          createShip(11, ShipType.BATTLESHIP, ShipOrientation.HORIZONTAL),
        ]}
        shots={[29]}
      />
    );

    const missElement = screen.getByText("Miss!").parentElement as HTMLElement;
    expect(missElement).toBeDefined();
    expect(within(missElement).getByText("J3")).toBeDefined();
  });
});
