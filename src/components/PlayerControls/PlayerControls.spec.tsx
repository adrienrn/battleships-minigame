import { fireEvent, render, waitFor, within } from "@testing-library/react";
import { createShip } from "../../hooks/utils/createShip";
import { generateBoard } from "../../hooks/utils/generateBoard";
import { ShipOrientation, ShipType } from "../../types/Ship";
import { PlayerControls } from "./PlayerControls";

describe("PlayerControls", () => {
  it("renders controls", () => {
    const screen = render(<PlayerControls />);

    expect(screen.getByText("Restart")).toBeDefined();
    expect(screen.getByText("Shoot!")).toBeDefined();
    expect(screen.getByPlaceholderText("Enter tile name...")).toBeDefined();
  });

  it("can submit form", async () => {
    const submitFn = jest.fn();
    const screen = render(<PlayerControls onSubmit={submitFn} />);

    const inputElement = screen.getByPlaceholderText("Enter tile name...");
    fireEvent.input(inputElement, { target: { value: "C7" } });

    await waitFor(() => screen.getByDisplayValue("C7"));

    const submitButtonElement = screen.getByText("Shoot!");
    fireEvent.click(submitButtonElement);

    expect(submitFn).toHaveBeenCalledTimes(1);
  });

  it("can pass validation function", async () => {
    const validateFn = jest.fn(() => false);
    const submitFn = jest.fn();
    const screen = render(
      <PlayerControls onSubmit={submitFn} validate={validateFn} />
    );

    const inputElement = screen.getByPlaceholderText("Enter tile name...");
    fireEvent.input(inputElement, { target: { value: "azerty" } });

    await waitFor(() => screen.getByDisplayValue("azerty"));

    const submitButtonElement = screen.getByText("Shoot!");
    fireEvent.click(submitButtonElement);

    expect(validateFn).toHaveBeenCalledTimes(1);
    expect(submitFn).not.toHaveBeenCalled();
  });

  it("executes onAttemptedSubmit function", async () => {
    const validateFn = jest.fn(() => false);
    const onAttemptedSubmitFn = jest.fn();
    const screen = render(
      <PlayerControls
        onAttemptedSubmit={onAttemptedSubmitFn}
        validate={validateFn}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter tile name...");
    fireEvent.input(inputElement, { target: { value: "azerty" } });

    await waitFor(() => screen.getByDisplayValue("azerty"));

    const submitButtonElement = screen.getByText("Shoot!");
    fireEvent.click(submitButtonElement);

    expect(onAttemptedSubmitFn).toHaveBeenCalledTimes(1);
  });

  it("can click 'Restart' button", async () => {
    const onRestartFn = jest.fn();
    const submitFn = jest.fn();
    const screen = render(
      <PlayerControls onSubmit={submitFn} onRestart={onRestartFn} />
    );

    const restartButtonElement = screen.getByText("Restart");
    fireEvent.click(restartButtonElement);

    expect(onRestartFn).toHaveBeenCalledTimes(1);
    expect(submitFn).not.toHaveBeenCalled();
  });
});
