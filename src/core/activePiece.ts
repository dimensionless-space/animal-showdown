import { z } from "zod";
import { GridLocation } from "../util/grid";
import { BoardPiece, BoardPieceTypeInfo } from "./board";
import { Piece } from "./piece";

export const zActivePieceType = z.enum([
  "chick",
  "elephant",
  "giraffe",
  "hen",
  "lion",
]);

export type ActivePieceType = z.infer<typeof zActivePieceType>;

export type ActivePiece = Piece & {
  currentlyPromoted: boolean;
  currentLocation: GridLocation;
};

export function activeTypeOfPiece(piece: BoardPieceTypeInfo): ActivePieceType {
  if (piece.baseType === "chicken") {
    if (piece.isPromoted) {
      return "hen";
    } else {
      return "chick";
    }
  } else {
    if (piece.isPromoted) {
      throw new Error(
        `piece's base type ${piece.baseType} does not have a promoted type`
      );
    }
    return piece.baseType;
  }
}

export function activePieceTypeToBaseType(
  activePieceType: ActivePieceType
): Pick<BoardPiece, "baseType" | "isPromoted"> {
  if (activePieceType === "chick") {
    return { baseType: "chicken", isPromoted: false };
  }
  if (activePieceType === "hen") {
    return { baseType: "chicken", isPromoted: true };
  }
  return { baseType: activePieceType, isPromoted: false };
}
