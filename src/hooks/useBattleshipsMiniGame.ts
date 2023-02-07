import { useCallback, useMemo, useState } from "react";
import { generateBoard } from "./utils/generateBoard";
import { generateFleet } from "./utils/generateFleet";
import { Ship, ShipType } from "../types/Ship";
import { BoardCell } from "../types/Board";

type UseBattleshipsMiniGameHook = (options: {
  fleetCompositionTypes: ShipType[];
}) => any;

export const useBattleshipsMinigame: UseBattleshipsMiniGameHook = ({
  fleetCompositionTypes,
}) => {
  const cells = useMemo(() => generateBoard(), []);
  const [fleet, setFleet] = useState<Ship[]>(
    generateFleet(fleetCompositionTypes)
  );
  const [shots, setShots] = useState<number[]>([]);

  const hasGameEnded = useMemo(() => {
    return fleet.every((s) =>
      s.cells.every((cellId) => shots.includes(cellId))
    );
  }, [fleet, shots]);

  const fireShot = useCallback(
    (cellName: string) => {
      const cellIndex = normalizeCellId(cellName);
      if (!validateCellName(cellName, cells)) {
        throw new Error("No");
      }

      if (shots.includes(cellIndex)) {
        return;
      }

      setShots([...shots, cellIndex]);
    },
    [cells, shots, setShots]
  );

  const restart = useCallback(() => {
    // Generate and place a new fleet on the board.
    setFleet(generateFleet(fleetCompositionTypes));

    // Reset the fired shots.
    setShots([]);
  }, [generateFleet, setFleet]);

  return {
    cells,
    fireShot,
    fleet,
    hasGameEnded,
    restart,
    shots,
    validate: useCallback(
      (inputValue: string) => validateCellName(inputValue, cells),
      [cells]
    ),
  };
};

function normalizeCellId(cellName: string, areaSize: number = 10): number {
  // Extract column letter and row number.
  const [maybeColumn, maybeRow] = [
    cellName.slice(0, 1).toUpperCase(),
    parseInt(cellName.slice(1), 10),
  ];

  // Transform the letter into the index in the alphabet:
  const maybeColumnIndex = maybeColumn.charCodeAt(0) - 65;
  // Row is 1-indexed, adjust it before computation:
  const maybeRowIndex = maybeRow - 1;

  // Compute the cell index that we can use for accessing the cell by key.
  return maybeRowIndex * areaSize + maybeColumnIndex;
}

function validateCellName(cellName: string, cells: BoardCell[]) {
  const maybeCellId = normalizeCellId(cellName);

  return 0 <= maybeCellId && maybeCellId < cells.length;
}
