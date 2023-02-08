# Battleships

This is a small battleships mini-game (Touché-Coulé in 🇫🇷)

[Demo](https://battleships-minigame.vercel.app/)

# Get started

I took the opportunity to test pnpm and Vite.js. To install `pnpm`, run `npm install -g pnpm` or swap it for a more vanilla `npm`.

```
npm install -g pnpm
```

To run the application:

```
pnpm run preview
```

# Architecture

The game has roughly two parts: `useBattleshipMiniGame` that encapsulates all the logic and `components/Board` for the UI.

## useBattleshipMiniGame

This is the main hook implementing the logic of the game. It will generate the board, place the ships at random position/orientation and let the user take shots.

- `cells`: this is the board, each cell has a `name` and an `id` , i.e. `{name: "D7", id: 64}`;
- `fireShot`: function that takes a string such as "A7", parses it into coordinate/cell index and store the shot;
- `fleet`: array of ships that have been placed on the board and which cells they occupy;
- `hasGameEnded`: are all the ship destroyed?
- `restart`: function to reset the board, shots taken and shuffle the ships;
- `shots`: array of shots taken, which cells have been played by the user;
- `validate`: function that validates the user input;

## Board component

This is the main UI component that will render the board.

For each cells, it will check the state of the cell checking if a shot as be taken at that position and if a ship has then been hit (or if it is a miss).

## A note on using a state reducer pattern

Another approach would be to use a state reducer pattern. This would have the benefit to be more scalable, move the logic outside of the UI component and add a few other features like keeping a score or implement a history/rollback feature and more.
