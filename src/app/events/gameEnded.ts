import { PlayerSeat } from "../../core/playerSeat";
import { GameOverState } from "../states/gameOverState";
import { SelectedPieceState } from "../states/selectedPieceState";
import { AvailableMovesState } from "./availableMovesChanged";

export default function gameEnded(
  state: GameOverState & SelectedPieceState & AvailableMovesState,
  victor: PlayerSeat | null
) {
  state.gameOver = { victor };
  state.currentPieceSelection = null;
  state.currentlyAvailableMoves = null;
}
