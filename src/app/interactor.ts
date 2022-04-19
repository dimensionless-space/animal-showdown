import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import movePiece from "./commands/movePiece";
import selectPiece from "./commands/selectPiece";
import { startingBoard } from "../core/startingBoard";
import availableMovesChanged from "./events/availableMovesChanged";
import pieceMoved from "./events/pieceMoved";
import pieceSelected from "./events/pieceSelected";
import gameEnded from "./events/gameEnded";
import { createInteractor, useInteractor } from "../framework/interax";
import startNewGame from "./commands/startNewGame";
import { newGameStarted } from "./events/newGameStarted";

export function createAppInteractor() {
  return createInteractor({
    commands: {
      selectPiece,
      movePiece,
      startNewGame,
    },
    events: {
      pieceSelected: [pieceSelected, availableMovesChanged],
      pieceMoved: [pieceMoved, availableMovesChanged],
      gameEnded,
      newGameStarted,
    },
    state: {
      board: startingBoard,
      hands: {
        bottom: [],
        top: [],
      },
      currentPlayer: "bottom",
      currentPieceSelection: null,
      currentlyAvailableMoves: null,
      gameOver: null,
    },
  });
}

export const interactor = createAppInteractor();
export const store = interactor.reduxStore;

export type AppInteractor = typeof interactor;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppInteractor = () => useInteractor<AppInteractor>();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
