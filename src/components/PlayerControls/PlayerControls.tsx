import { useState } from "react";
import styles from "./PlayerControls.module.css";

export const PlayerControls: React.FC<{
  hasGameEnded?: boolean;
  onAttemptedSubmit?: (submittedValue: string) => void;
  onRestart?: () => void;
  onSubmit?: (submittedValue: string) => void;
  validate?: (inputString: string) => boolean;
}> = ({
  hasGameEnded = false,
  onAttemptedSubmit = () => undefined,
  onRestart = () => undefined,
  onSubmit = () => undefined,
  validate = () => true,
}) => {
  const [value, setValue] = useState<string>("");
  return (
    <form
      className={styles["PlayerControls"]}
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        const isUserInputValid = validate(value);
        if (!isUserInputValid) {
          onAttemptedSubmit(value);

          return;
        }

        onSubmit(value);
        setValue("");
      }}
    >
      <button onClick={onRestart} type="button">
        Restart
      </button>
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Enter tile..."
        type="text"
        value={value}
      />
      <button type="submit" disabled={hasGameEnded || !value}>
        Shoot!
      </button>
    </form>
  );
};
