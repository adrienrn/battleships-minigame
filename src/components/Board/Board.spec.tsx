import { render, within } from "@testing-library/react";
import { generateBoard } from "../../logic/generateBoard";
import { BoardCellState } from "../../types/Board";
import { Board } from "./Board";

describe("Board", () => {
  it("Renders the board", () => {
    const screen = render(<Board cells={generateBoard(10)} ships={[]} />);

    // Check we render from A1 to J10
    expect(screen.getByText("A1")).toBeDefined();
    expect(screen.getByText("E3")).toBeDefined();
    expect(screen.getByText("J10")).toBeDefined();

    // Check that the board is pristine!
    expect(screen.queryByText("Hit!")).toBeFalsy();
    expect(screen.queryByText("Miss!")).toBeFalsy();
  });

  it("renders hit marker if cell state is HIT", () => {
    const boardCells = generateBoard(10);
    // Update a cell to "Hit!"
    boardCells[11].state = BoardCellState.HIT;

    const screen = render(<Board cells={boardCells} ships={[]} />);

    const missElement = screen.getByText("Hit!").parentElement as HTMLElement;
    expect(missElement).toBeDefined();
    expect(within(missElement).getByText("B2")).toBeDefined();
  });

  it("renders miss marker if cell state is MISS", () => {
    const boardCells = generateBoard(10);
    // Update a cell to "Miss!"
    boardCells[29].state = BoardCellState.MISS;

    const screen = render(<Board cells={boardCells} ships={[]} />);

    const missElement = screen.getByText("Miss!").parentElement as HTMLElement;
    expect(missElement).toBeDefined();
    expect(within(missElement).getByText("J3")).toBeDefined();
  });
});
