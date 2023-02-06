import { render } from "@testing-library/react";
import { BMGBattleground } from "./BMGBattleground";

it("is working", () => {
  const screen = render(<BMGBattleground cells={["A1", "A2"]} ships={[]} />);

  expect(screen.getByText("0 / A1")).toBeDefined();
});
