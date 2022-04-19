import selectPiece from "../commands/selectPiece";
import {
  ShorthandDropMoves,
  shorthandMoves,
  ShorthandMoves,
} from "../../core/shorthand";
import { startingBoard } from "../../core/startingBoard";
import availableMovesChanged from "../events/availableMovesChanged";
import pieceSelected from "../events/pieceSelected";
import { createInteractor, Interactor } from "../../framework/interax";
import { gtt, ltt, ett, ctt, cbb, ebb, lbb, gbb } from "../../core/shorthand";

const commands = { selectPiece };
const events = { pieceSelected: [pieceSelected, availableMovesChanged] };

let interactor: Interactor<typeof commands, typeof events>;

describe(availableMovesChanged.name, () => {
  describe("when starting giraffe gets selected", () => {
    beforeEach(() => {
      interactor = createInteractor({
        commands,
        events,
        state: {
          board: startingBoard,
          hands: {
            top: [],
            bottom: [],
          },
          currentPlayer: "bottom",
          currentPieceSelection: null,
          currentlyAvailableMoves: null,
        },
      });
    });

    it("shows the available moves", () => {
      const expectedMoves = [
        ["U", "U", "U"],
        ["U", "U", "U"],
        ["U", "U", "A"],
        ["U", "B", "O"],
      ] as ShorthandMoves;

      interactor.selectPiece({ boardPiece: { row: 3, column: 2 } });

      expect(shorthandMoves(interactor.currentlyAvailableMoves!)).toStrictEqual(
        expectedMoves
      );
    });
  });

  describe("when chick in hand gets selected", () => {
    beforeEach(() => {
      interactor = createInteractor({
        commands,
        events,
        state: {
          board: [
            [null, ltt, ett],
            [gtt, cbb, null],
            [null, null, null],
            [ebb, lbb, gbb],
          ],
          hands: {
            top: [],
            bottom: [{ baseType: "chicken", startingOwner: "top" }],
          },
          currentPlayer: "bottom",
          currentPieceSelection: null,
          currentlyAvailableMoves: null,
        },
      });
    });

    it("shows the available drops", () => {
      const expectedMoves = [
        ["A", "B", "B"],
        ["B", "B", "A"],
        ["A", "A", "A"],
        ["B", "B", "B"],
      ] as ShorthandDropMoves;

      interactor.selectPiece({ handPieceIndex: 0 });

      expect(shorthandMoves(interactor.currentlyAvailableMoves!)).toStrictEqual(
        expectedMoves
      );
    });
  });
});
