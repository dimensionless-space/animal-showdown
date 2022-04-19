import _ from "lodash";
import { isHandPieceSelection } from "../../core/notionalMoves";
import { BoardState } from "../states/boardState";
import { PieceSelection } from "../../core/pieceSelection";
import { SelectedPieceState } from "../states/selectedPieceState";
import { CurrentPlayerState } from "../states/currentPlayerState";
import { HandsState } from "../states/handsState";

export type SelectPieceEvents = {
  pieceSelected(selection: PieceSelection | null): void;
};

export default function selectPiece(
  state: SelectedPieceState & BoardState & HandsState & CurrentPlayerState,
  events: SelectPieceEvents,
  piece: PieceSelection | null
) {
  const { board, hands, currentPlayer, currentPieceSelection } = state;

  if (_.isEqual(piece, currentPieceSelection)) return;

  if (piece != null) {
    if (isHandPieceSelection(piece)) {
      const index = piece.handPieceIndex;
      if (index < 0 || index >= hands[currentPlayer].length) {
        return;
      }
    } else {
      const at = piece.boardPiece;
      const boardPiece = board[at.row][at.column];
      if (boardPiece?.currentOwner != currentPlayer) {
        return;
      }
    }
  }

  events.pieceSelected(piece);
}
