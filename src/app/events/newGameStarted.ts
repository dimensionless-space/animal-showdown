import { startingBoard } from "../../core/startingBoard";
import { BoardState } from "../states/boardState";
import { CurrentPlayerState } from "../states/currentPlayerState";
import { GameOverState } from "../states/gameOverState";
import { HandsState } from "../states/handsState";
import { SelectedPieceState } from "../states/selectedPieceState";

export function newGameStarted(
  state: BoardState &
    HandsState &
    CurrentPlayerState &
    SelectedPieceState &
    GameOverState
) {
  state.board = startingBoard;
  state.currentPlayer = "bottom";
  state.currentPieceSelection = null;
  state.hands = {
    top: [],
    bottom: [],
  };
  state.gameOver = null;
}
