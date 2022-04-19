import { BoardState } from "../states/boardState";
import { SelectedPieceState } from "../states/selectedPieceState";
import { Grid4x3 } from "../../util/grid";
import { NotionalMoveType } from "../../core/notionalBoardMoves";
import { notionalMovesForSelection } from "../../core/notionalMoves";
import { HandsState } from "../states/handsState";

export type AvailableMovesState = {
  currentlyAvailableMoves: Grid4x3<NotionalMoveType> | null;
};

export default function availableMovesChanged(
  state: SelectedPieceState & BoardState & HandsState & AvailableMovesState
) {
  const { currentPieceSelection, board } = state;

  if (currentPieceSelection == null) {
    state.currentlyAvailableMoves = null;
    return;
  }

  const moves = notionalMovesForSelection({
    board,
    selection: currentPieceSelection,
  });

  state.currentlyAvailableMoves = moves;
}
