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
import { startingBoard } from "../../core/startingBoard";

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
          board: startingBoard,
          hands: { top: [], bottom: [] },
          currentPlayer: "bottom",
          currentPieceSelection: null,
          currentlyAvailableMoves: null,
          gameOver: null,
        },
      });
    });

    it("forbids players from moving out-of-turn", () => {
      interactor.movePiece(
        { boardPiece: { row: 1, column: 1 } },
        { row: 2, column: 1 }
      );
      expect(interactor.board).toStrictEqual(startingBoard);
    });

    describe("when the destination is available", () => {
      it("moves the piece", () => {
        const expectedBoard = [
          [gtt, ltt, ett],
          [null, ctt, null],
          [null, cbb, gbb],
          [ebb, lbb, null],
        ];

        interactor.movePiece(
          { boardPiece: { row: 3, column: 2 } },
          { row: 2, column: 2 }
        );

        expect(interactor.board).toStrictEqual(expectedBoard);
      });

      it("makes it the next player's turn", () => {
        interactor.movePiece(
          { boardPiece: { row: 3, column: 2 } },
          { row: 2, column: 2 }
        );

        expect(interactor.currentPlayer).toBe("top");
      });
    });

    describe("with a current selection", () => {
      beforeEach(() => {
        interactor = createInteractor({
          commands,
          events,
          state: {
            board: startingBoard,
            hands: { top: [], bottom: [] },
            currentPlayer: "bottom",
            currentPieceSelection: {
              boardPiece: { row: 3, column: 2 },
            },
            currentlyAvailableMoves: null,
            gameOver: null,
          },
        });
      });

      it("clears the current selection", () => {
        interactor.movePiece(
          { boardPiece: { row: 3, column: 2 } },
          { row: 2, column: 2 }
        );

        expect(interactor.currentPieceSelection).toBeNull();
      });
    });

    describe("when the destination is blocked by a piece owned by this player", () => {
      it("refuses to move", () => {
        interactor.movePiece(
          { boardPiece: { row: 3, column: 2 } },
          { row: 3, column: 1 }
        );
        expect(interactor.board).toStrictEqual(startingBoard);
      });
    });
  });
});
