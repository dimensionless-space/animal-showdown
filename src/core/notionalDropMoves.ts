import { Grid4x3 } from "../util/grid";
import { Board, BoardPiece } from "./board";
import { mapGrid4x3, NotionalDropMoveType } from "./notionalBoardMoves";

export function notionalDropMoves({
  board,
}: {
  board: Board;
}): Grid4x3<NotionalDropMoveType> {
  return mapGrid4x3<BoardPiece | null, NotionalDropMoveType>(board, (piece) => {
    if (piece) return "Blocked";
    return "Available";
  });
}
