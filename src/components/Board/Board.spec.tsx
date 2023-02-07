import { render } from "@testing-library/react";
import { generateBoard } from "../../logic/generateBoard";
import { Board } from "./Board";

describe("Board", () => {
  it("Renders the board", () => {
    const screen = render(<Board cells={generateBoard(10)} ships={[]} />);

    expect(screen.getByText("0 / A1")).toBeDefined();
    expect(screen.getByText("24 / E3")).toBeDefined();
    expect(screen.getByText("99 / J10")).toBeDefined();
  });
});
