import selectPiece from "../commands/selectPiece";
import pieceSelected from "../events/pieceSelected";
import { createInteractor, Interactor } from "../../framework/interax";
import { HandPiece } from "../../core/handPiece";
import { startingBoard } from "../../core/startingBoard";

const commands = { selectPiece };
const events = { pieceSelected };

let interactor: Interactor<typeof commands, typeof events>;

const chickenHand = [
  { baseType: "chicken", startingOwner: "top" },
] as HandPiece[];

describe(selectPiece.name, () => {
  describe("when no piece is yet selected", () => {
    beforeEach(() => {
      interactor = createInteractor({
        commands,
        events,
        state: {
          board: startingBoard,
          hands: {
            top: [],
            bottom: chickenHand,
          },
          currentPlayer: "bottom",
          currentPieceSelection: null,
        },
      });
    });

    it("forbids players from selecting pieces out-of-turn", () => {
      interactor.selectPiece({ boardPiece: { row: 1, column: 1 } });
      expect(interactor.currentPieceSelection).toBeNull();
    });

    it("selects a board piece", () => {
      interactor.selectPiece({ boardPiece: { row: 3, column: 2 } });
      expect(interactor.currentPieceSelection).toStrictEqual({
        boardPiece: { row: 3, column: 2 },
      });
    });

    it("selects a hand piece", () => {
      interactor.selectPiece({ handPieceIndex: 0 });
      expect(interactor.currentPieceSelection).toStrictEqual({
        handPieceIndex: 0,
      });
    });

    it("prevents selecting an invalid hand piece index", () => {
      interactor.selectPiece({ handPieceIndex: 1 });
      expect(interactor.currentPieceSelection).toBeNull();
    });

    describe("and it is top player's turn", () => {
      beforeEach(() => {
        interactor = createInteractor({
          commands,
          events,
          state: {
            board: startingBoard,
            hands: {
              top: chickenHand,
              bottom: [],
            },
            currentPieceSelection: null,
            currentPlayer: "top",
          },
        });
      });

      it("selects a hand piece", () => {
        interactor.selectPiece({ handPieceIndex: 0 });
        expect(interactor.currentPieceSelection).toStrictEqual({
          handPieceIndex: 0,
        });
      });
    });
  });

  describe("when a board piece is already selected", () => {
    beforeEach(() => {
      interactor = createInteractor({
        commands,
        events,
        state: {
          board: startingBoard,
          hands: {
            top: [],
            bottom: chickenHand,
          },
          currentPlayer: "bottom",
          currentPieceSelection: {
            boardPiece: { row: 3, column: 2 },
          },
        },
      });
    });

    it("selects a new board piece", () => {
      interactor.selectPiece({ boardPiece: { row: 3, column: 1 } });
      expect(interactor.currentPieceSelection).toStrictEqual({
        boardPiece: { row: 3, column: 1 },
      });
    });

    it("keeps the same board piece selected", () => {
      interactor.selectPiece({ boardPiece: { row: 3, column: 2 } });
      expect(interactor.currentPieceSelection).toStrictEqual({
        boardPiece: { row: 3, column: 2 },
      });
    });

    it("selects a hand piece", () => {
      interactor.selectPiece({ handPieceIndex: 0 });
      expect(interactor.currentPieceSelection).toStrictEqual({
        handPieceIndex: 0,
      });
    });
  });

  describe("when a bottom hand piece is already selected", () => {
    beforeEach(() => {
      interactor = createInteractor({
        commands,
        events,
        state: {
          board: startingBoard,
          hands: {
            top: [],
            bottom: [
              { baseType: "chicken", startingOwner: "top" },
              { baseType: "giraffe", startingOwner: "bottom" },
            ],
          },
          currentPlayer: "bottom",
          currentPieceSelection: {
            handPieceIndex: 0,
          },
        },
      });
    });

    it("selects a board piece", () => {
      interactor.selectPiece({ boardPiece: { row: 3, column: 1 } });
      expect(interactor.currentPieceSelection).toStrictEqual({
        boardPiece: { row: 3, column: 1 },
      });
    });

    it("selects a new hand piece", () => {
      interactor.selectPiece({ handPieceIndex: 1 });
      expect(interactor.currentPieceSelection).toStrictEqual({
        handPieceIndex: 1,
      });
    });

    it("keeps the same hand piece selected", () => {
      interactor.selectPiece({ handPieceIndex: 0 });
      expect(interactor.currentPieceSelection).toStrictEqual({
        handPieceIndex: 0,
      });
    });
  });
});
