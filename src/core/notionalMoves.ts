import {
  BoardPieceSelection,
  HandPieceSelection,
  PieceSelection,
} from "./pieceSelection";
import { Board } from "./board";
import { notionalBoardMovesForPieceAtSpace } from "./notionalBoardMoves";
import { notionalDropMoves } from "./notionalDropMoves";

export function isBoardPieceSelection(
  selection: PieceSelection
): selection is BoardPieceSelection {
  return (selection as BoardPieceSelection).boardPiece !== undefined;
}

export function isHandPieceSelection(
  selection: PieceSelection
): selection is HandPieceSelection {
  return (selection as HandPieceSelection).handPieceIndex !== undefined;
}

export function notionalMovesForSelection({
  board,
  selection,
}: {
  board: Board;
  selection: PieceSelection;
}) {
  if (isBoardPieceSelection(selection)) {
    return notionalBoardMovesForPieceAtSpace({
      board,
      space: selection.boardPiece,
    });
  }
  if (isHandPieceSelection(selection)) {
    return notionalDropMoves({ board });
  }
  throw new Error("Unrecognized selection");
}
