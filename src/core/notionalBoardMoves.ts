import _ from "lodash";
import { ActivePieceType, activeTypeOfPiece } from "./activePiece";
import { Board, BoardPiece } from "./board";
import { Grid, Grid4x3, GridLocation } from "../util/grid";
import { PlayerSeat } from "./playerSeat";
import { relativeMoveGridByActivePieceType } from "./relativeMoves";
import { z } from "zod";

export const zNotionalMoveType = z.enum([
  "Available",
  "Blocked",
  "Capture",
  "Lose",
  "Origin",
  "Promote",
  "Unreachable",
  "Win",
]);

export type NotionalMoveType = z.infer<typeof zNotionalMoveType>;
export type NotionalDropMoveType = "Available" | "Blocked";

export function mapGrid<Rows extends number, Columns extends number, T, U>(
  grid: Grid<Rows, Columns, T>,
  iteratee: (value: T, row: number, column: number) => U
): Grid<Rows, Columns, U> {
  return _.map(grid, (row, rowIndex) => {
    return _.map(row, (value, columnIndex) => {
      return iteratee(value, rowIndex, columnIndex);
    });
  }) as Grid<Rows, Columns, U>;
}

export function mapGrid4x3<T, U>(
  grid: Grid4x3<T>,
  iteratee: (value: T, row: number, column: number) => U
): Grid4x3<U> {
  return _.map(grid, (row, rowIndex) => {
    return _.map(row, (value, columnIndex) => {
      return iteratee(value, rowIndex, columnIndex);
    });
  }) as Grid4x3<U>;
}

export function notionalBoardMovesForPieceAtSpace({
  board,
  space,
}: {
  board: Board;
  space: GridLocation;
}): Grid4x3<NotionalMoveType> {
  const movingPiece = board[space.row][space.column];
  if (movingPiece == null) {
    return mapGrid4x3<BoardPiece | null, NotionalMoveType>(
      board,
      () => "Unreachable"
    );
  }
  const pieceType = activeTypeOfPiece(movingPiece);
  // const pieceType = movingPiece.pieceType;
  const relativeMoves = relativeMoveGridByActivePieceType[pieceType];
  return mapGrid4x3<BoardPiece | null, NotionalMoveType>(
    board,
    (destinationPiece, destinationBoardRow, destinationBoardColumn) => {
      // how far away the pieces are, on the board
      const boardRowDifference = destinationBoardRow - space.row;
      const boardColumnDifference = destinationBoardColumn - space.column;

      // flip the vertical offset if we're operating from the perspective of the top player
      const isBottom = movingPiece.currentOwner == "bottom";
      const playerSeatRowDifference = isBottom
        ? boardRowDifference
        : -boardRowDifference;
      const playerSeatColumnDifference = boardColumnDifference;

      // moving piece is in the center of the 3x3 relative move grid
      const relativeMoveOrigin = { row: 1, column: 1 };

      // offsets will range from [0, 0] to [2, 2]
      const relativeMoveRowIndex =
        relativeMoveOrigin.row + playerSeatRowDifference;
      const relativeMoveColumnOffset =
        relativeMoveOrigin.column + playerSeatColumnDifference;

      const isDestinationWithinMoveGrid =
        relativeMoveRowIndex >= 0 &&
        relativeMoveRowIndex < relativeMoves.length &&
        relativeMoveColumnOffset >= 0 &&
        relativeMoveColumnOffset < relativeMoves.length;
      if (!isDestinationWithinMoveGrid) {
        return "Unreachable";
      }

      const isDestinationSameAsStart =
        relativeMoveRowIndex == relativeMoveOrigin.row &&
        relativeMoveColumnOffset == relativeMoveOrigin.column;
      if (isDestinationSameAsStart) {
        return "Origin";
      }

      const isValidMovePattern =
        relativeMoves[relativeMoveRowIndex][relativeMoveColumnOffset] == 1;
      if (!isValidMovePattern) {
        return "Unreachable";
      }

      const isDestinationOccupied = destinationPiece != null;
      if (!isDestinationOccupied) {
        const isDestinationAPromotionZone =
          destinationBoardRow ==
          promotionRowOffsetForPlayer(movingPiece.currentOwner);

        if (
          isDestinationAPromotionZone &&
          isPromotableActivePieceType(pieceType)
        ) {
          return "Promote";
        } else {
          return "Available";
        }
      }

      const isDestinationPieceAnEnemy =
        destinationPiece.currentOwner != movingPiece.currentOwner;
      if (isDestinationPieceAnEnemy) {
        return "Capture";
      } else {
        return "Blocked";
      }
    }
  );
}

export function isSpaceThreatened({
  board,
  space,
  vulnerablePlayer,
}: {
  board: Board;
  space: GridLocation;
  vulnerablePlayer: PlayerSeat;
}) {
  //
}

export function isPromotableActivePieceType(pieceType: ActivePieceType) {
  return pieceType == "chick";
}

export function promotionRowOffsetForPlayer(currentOwner: PlayerSeat) {
  return currentOwner == "bottom" ? 0 : 3;
}
