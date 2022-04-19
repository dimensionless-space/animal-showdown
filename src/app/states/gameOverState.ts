import { PlayerSeat } from "../../core/playerSeat";

export type GameOverState = {
  gameOver: {
    victor: PlayerSeat | null;
  } | null;
};
