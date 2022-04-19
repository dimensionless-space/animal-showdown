import { GameOverState } from "../states/gameOverState";

export type StartNewGameEvents = {
  newGameStarted(): void;
};

export default function movePiece(
  state: GameOverState,
  events: StartNewGameEvents
) {
  if (state.gameOver == null) {
    return;
  }

  events.newGameStarted();
}
