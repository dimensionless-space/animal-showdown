import { zPieceInvariants } from "./piece";
import { z } from "zod";

export const zHandPiece = zPieceInvariants;

export type HandPiece = z.infer<typeof zHandPiece>;
