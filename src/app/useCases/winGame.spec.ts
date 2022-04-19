import movePiece from "../commands/movePiece";
import {
  cbb,
  cbt,
  ctb,
  ctt,
  ebb,
  ett,
  gbb,
  gtt,
  lbb,
  ltt,
} from "../../core/shorthand";
import pieceMoved from "../events/pieceMoved";
import gameEnded from "../events/gameEnded";
import { createInteractor, Interactor } from "../../framework/interax";

const commands = { movePiece };
const events = { pieceMoved, gameEnded };

let interactor: Interactor<typeof commands, typeof events>;

describe(movePiece.name, () => {
  describe("when the move captures a lion", () => {
    beforeEach(() => {
      interactor = createInteractor({
        commands,
        events,
        state: {
          board: [
            [gtt, null, ett],
            [null, ltt, null],
            [null, cbb, null],
            [ebb, lbb, gbb],
          ],
          hands: {
            top: [{ baseType: "chicken", startingOwner: "top" }],
            bottom: [],
          },
          currentPlayer: "bottom",
          currentPieceSelection: null,
          currentlyAvailableMoves: null,
          gameOver: null,
        },
      });
    });

    it("ends the game", () => {
      interactor.movePiece(
        {
          boardPiece: { row: 2, column: 1 },
        },
        { row: 1, column: 1 }
      );

      expect(interactor.gameOver).toStrictEqual({ victor: "bottom" });
    });
  });
});
