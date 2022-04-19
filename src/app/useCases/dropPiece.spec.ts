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
  describe("with a piece in hand", () => {
    beforeEach(() => {
      interactor = createInteractor({
        commands,
        events,
        state: {
          board: [
            [gtt, ltt, ett],
            [null, null, null],
            [null, cbb, null],
            [ebb, lbb, gbb],
          ],
          hands: {
            top: [],
            bottom: [{ baseType: "chicken", startingOwner: "top" }],
          },
          currentPlayer: "bottom",
          currentPieceSelection: null,
          currentlyAvailableMoves: null,
          gameOver: null,
        },
      });
    });

    describe("when the destination is available", () => {
      it("drops the piece", () => {
        const expectedBoard = [
          [gtt, ltt, ett],
          [null, null, null],
          [null, cbb, ctb],
          [ebb, lbb, gbb],
        ];
        interactor.movePiece({ handPieceIndex: 0 }, { row: 2, column: 2 });
        expect(interactor.board).toStrictEqual(expectedBoard);
      });

      it("removes the piece from the player's hand", () => {
        interactor.movePiece({ handPieceIndex: 0 }, { row: 2, column: 2 });
        expect(interactor.hands.bottom).toHaveLength(0);
      });

      describe("and the current player is top", () => {
        beforeEach(() => {
          interactor = createInteractor({
            commands,
            events,
            state: {
              board: [
                [gtt, ltt, ett],
                [null, ctt, null],
                [null, null, null],
                [ebb, lbb, gbb],
              ],
              hands: {
                top: [{ baseType: "chicken", startingOwner: "bottom" }],
                bottom: [],
              },
              currentPlayer: "top",
              currentPieceSelection: null,
              currentlyAvailableMoves: null,
              gameOver: null,
            },
          });
        });

        it("drops the piece", () => {
          const expectedBoard = [
            [gtt, ltt, ett],
            [cbt, ctt, null],
            [null, null, null],
            [ebb, lbb, gbb],
          ];
          interactor.movePiece({ handPieceIndex: 0 }, { row: 1, column: 0 });
          expect(interactor.board).toStrictEqual(expectedBoard);
        });

        it("removes the piece from the player's hand", () => {
          interactor.movePiece({ handPieceIndex: 0 }, { row: 2, column: 2 });
          expect(interactor.hands.bottom).toHaveLength(0);
        });
      });
    });

    describe("with a current selection", () => {
      beforeEach(() => {
        interactor = createInteractor({
          commands,
          events,
          state: {
            board: [
              [gtt, ltt, ett],
              [null, null, null],
              [null, cbb, null],
              [ebb, lbb, gbb],
            ],
            hands: {
              top: [],
              bottom: [{ baseType: "chicken", startingOwner: "top" }],
            },
            currentPlayer: "bottom",
            currentPieceSelection: {
              handPieceIndex: 0,
            },
            currentlyAvailableMoves: null,
            gameOver: null,
          },
        });
      });

      it("clears the current selection", () => {
        interactor.movePiece({ handPieceIndex: 0 }, { row: 2, column: 2 });

        expect(interactor.currentPieceSelection).toBeNull();
      });
    });
  });
});
