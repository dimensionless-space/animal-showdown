import { z } from "zod";
import { GridLocation } from "../util/grid";
import { zBasePieceType } from "./basePieceType";
import { PlayerSeat, zPlayerSeat } from "./playerSeat";

export const zPieceInvariants = z.object({
  baseType: zBasePieceType,
  startingOwner: zPlayerSeat,
});

export type PieceInvariants = z.infer<typeof zPieceInvariants>;

export type Piece = PieceInvariants & {
  currentOwner: PlayerSeat;
  currentLocation: GridLocation | null;
};

export type InactivePiece = Piece & {
  currentLocation: null;
};
