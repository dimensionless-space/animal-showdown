import { z } from "zod";

export const zPlayerSeat = z.enum(["top", "bottom"]);

export type PlayerSeat = z.infer<typeof zPlayerSeat>;

export function nextPlayer(currentPlayer: PlayerSeat) {
  if (currentPlayer == "top") return "bottom";
  if (currentPlayer == "bottom") return "top";
  throw new Error(`invalid player seat ${currentPlayer}`);
}
