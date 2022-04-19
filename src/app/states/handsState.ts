import { HandPiece } from "../../core/handPiece";
import { PlayerSeat } from "../../core/playerSeat";

export type HandsState = {
  hands: { [player in PlayerSeat]: HandPiece[] };
};
