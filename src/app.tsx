import { useMemo } from "preact/hooks";
import "./app.css";
import { BMGBattleground } from "./components/BMGBattleground/BMGBattleground";

function generateBattleground() {
  const alphabet = [...new Array(26)].map((_, i) => i + 65);
  return [...Array(100)].map((_, i) => {
    return String.fromCharCode(alphabet[i % 10]) + Math.floor(i / 10 + 1);
  });
}

function generateShips() {
  return [
    {
      cells: [0, 1, 2, 3],
      type: "A",
    },
    {
      cells: [46, 56, 66, 76],
      type: "A",
    },
    {
      cells: [80, 81, 82, 83, 84],
      type: "B",
    },
  ];
}

export function App() {
  const battlegroundCells = useMemo(() => generateBattleground(), []);

  return (
    <>
      <BMGBattleground cells={battlegroundCells} ships={generateShips()} />
    </>
  );
}
