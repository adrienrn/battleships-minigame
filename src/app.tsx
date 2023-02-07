import { useEffect, useState } from "react";
import "./app.css";
import { Banner, BannerVariant } from "./components/Banner/Banner";
import { Board } from "./components/Board/Board";
import { PlayerControls } from "./components/PlayerControls/PlayerControls";
import { useBattleshipsMinigame } from "./hooks/useBattleshipsMiniGame";
import { ShipType } from "./types/Ship";

export function App() {
  const { cells, fireShot, hasGameEnded, fleet, restart, shots, validate } =
    useBattleshipsMinigame({
      fleetCompositionTypes: [
        ShipType.BATTLESHIP,
        ShipType.DESTROYER,
        ShipType.DESTROYER,
      ],
    });
  const [isDebugEnabled, setIsDebugEnabled] = useState<boolean>(false);
  const [banner, setBanner] = useState<{
    message: string;
    variant?: BannerVariant;
  }>({ message: "Enemy fleet is upon us, good luck, Captain!" });

  useEffect(() => {
    if (!!hasGameEnded) {
      setBanner({
        message: "All enemy ships are detroyed, hurrah!",
        variant: "success",
      });
    }
  }, [hasGameEnded]);

  return (
    <>
      {banner && <Banner variant={banner.variant}>{banner.message}</Banner>}
      <Board cells={cells} debug={isDebugEnabled} ships={fleet} shots={shots} />
      <PlayerControls
        hasGameEnded={hasGameEnded}
        onAttemptedSubmit={(inputValue: string) => {
          setBanner({
            message: `Sorry, "${inputValue}" is not a valid tile!`,
            variant: "error",
          });
        }}
        onRestart={() => {
          restart();
          setBanner({
            message: "Enemy fleet is upon us, good luck, Captain!",
          });
        }}
        onSubmit={(maybeCellName: string) => {
          try {
            fireShot(maybeCellName);

            setBanner({
              message: `Aye, aye! Shot fired to "${maybeCellName.toUpperCase()}"!`,
            });
          } catch (err) {
            console.error(err);
          }
        }}
        validate={validate}
      />
      <input
        checked={isDebugEnabled}
        onChange={() => {
          setIsDebugEnabled(!isDebugEnabled);
        }}
        type="checkbox"
      />
    </>
  );
}
