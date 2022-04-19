import { GridLocation } from "../util/grid";
import { Board } from "./board";
import { notionalBoardMovesForPieceAtSpace } from "./notionalBoardMoves";

export function isValidMove({
  board,
  from,
  to,
}: {
  board: Board;
  from: GridLocation;
  to: GridLocation;
}): boolean {
  // const moves = notionalBoardMovesForPieceAtSpace({ board, space: from });
  return true;
}
