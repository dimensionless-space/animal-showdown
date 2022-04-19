import { GridLocation } from "../util/grid";
import { Board } from "./board";
import { PlayerSeat } from "./playerSeat";

export function promotionRowForPlayer(player: PlayerSeat) {
  return player == "top" ? 3 : 0;
}

export default function isPromotionMove(
  board: Board,
  from: GridLocation,
  to: GridLocation
) {
  const fromPiece = board[from.row][from.column];

  if (fromPiece == null) return false;
  if (fromPiece.baseType != "chicken") return false;

  const promotionRow = promotionRowForPlayer(fromPiece.currentOwner);

  return to.row == promotionRow;
}
