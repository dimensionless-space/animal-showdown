import movePiece from "../commands/movePiece";
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

    describe("when the destination contains an opposing player's piece", () => {
      it("captures that piece", () => {
        interactor.movePiece(
          { boardPiece: { row: 2, column: 1 } },
          { row: 1, column: 1 }
        );
        const topChicken = { baseType: "chicken", startingOwner: "top" };
        expect(interactor.hands.bottom).toStrictEqual([topChicken]);
      });
    });
  });
});
