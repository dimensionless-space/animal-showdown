import { SelectedPieceState } from "../states/selectedPieceState";
import { PieceSelection } from "../../core/pieceSelection";

export default function pieceSelected(
  state: SelectedPieceState,
  piece: PieceSelection | null
) {
  state.currentPieceSelection = piece;
}
