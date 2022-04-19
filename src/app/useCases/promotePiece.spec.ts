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
  hbb,
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
  describe("with a normal starting board", () => {
    beforeEach(() => {
      interactor = createInteractor({
        commands,
        events,
        state: {
          board: [
            [gtt, null, null],
            [ltt, cbb, gbb],
            [ett, null, null],
            [ebb, lbb, null],
          ],
          hands: { top: [], bottom: [] },
          currentPlayer: "bottom",
          currentPieceSelection: null,
          currentlyAvailableMoves: null,
          gameOver: null,
        },
      });
    });

    describe("when the destination is a promotion zone", () => {
      describe("and the piece is promotable", () => {
        it("promotes the piece", () => {
          const expectedBoard = [
            [gtt, hbb, null],
            [ltt, null, gbb],
            [ett, null, null],
            [ebb, lbb, null],
          ];

          interactor.movePiece(
            { boardPiece: { row: 1, column: 1 } },
            { row: 0, column: 1 }
          );

          expect(interactor.board).toStrictEqual(expectedBoard);
        });
      });

      describe("and the piece is not promotable", () => {
        it("moves the piece as normal", () => {
          const expectedBoard = [
            [gtt, null, gbb],
            [ltt, cbb, null],
            [ett, null, null],
            [ebb, lbb, null],
          ];

          interactor.movePiece(
            { boardPiece: { row: 1, column: 2 } },
            { row: 0, column: 2 }
          );

          expect(interactor.board).toStrictEqual(expectedBoard);
        });
      });
    });
  });
});
