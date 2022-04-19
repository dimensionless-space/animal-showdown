import { Grid4x3 } from "../util/grid";
import { BasePieceType } from "./basePieceType";
import { PlayerSeat } from "./playerSeat";

// export type BoardPieceType = BasePieceType;

export type BoardPieceTypeInfo = {
  baseType: BasePieceType;
  isPromoted: boolean;
};

export type BoardPiece = BoardPieceTypeInfo & {
  startingOwner: PlayerSeat;
  currentOwner: PlayerSeat;
};

export type Board = Grid4x3<BoardPiece | null>;
