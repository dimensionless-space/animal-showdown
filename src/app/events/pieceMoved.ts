import { BoardState } from "../states/boardState";
import { CurrentPlayerState } from "../states/currentPlayerState";
import { SelectedPieceState } from "../states/selectedPieceState";
import { PieceSelection } from "../../core/pieceSelection";
import { GridLocation } from "../../util/grid";
import { nextPlayer } from "../../core/playerSeat";
import { isBoardPieceSelection } from "../../core/notionalMoves";
import _ from "lodash";
import { HandsState } from "../states/handsState";
import isPromotionMove from "../../core/isPromotionMove";

export default function pieceMoved(
  state: BoardState & HandsState & CurrentPlayerState & SelectedPieceState,
  fromSelection: PieceSelection,
  toSpace: GridLocation
) {
  if (isBoardPieceSelection(fromSelection)) {
    boardPieceMoved(state, fromSelection.boardPiece, toSpace);
  } else {
    handPieceDropped(state, fromSelection.handPieceIndex, toSpace);
  }
  state.currentPieceSelection = null;
  state.currentPlayer = nextPlayer(state.currentPlayer);
}

function boardPieceMoved(
  state: BoardState & HandsState,
  from: GridLocation,
  to: GridLocation
) {
  const fromPiece = state.board[from.row][from.column]!;
  const toPiece = state.board[to.row][to.column];

  const movingPlayer = fromPiece.currentOwner;

  if (toPiece != null) {
    const movingPlayerHand = state.hands[movingPlayer];
    movingPlayerHand.push({
      baseType: toPiece.baseType,
      startingOwner: toPiece.startingOwner,
    });
  }

  if (isPromotionMove(state.board, from, to)) {
    fromPiece.isPromoted = true;
  }

  state.board[to.row][to.column] = fromPiece;
  state.board[from.row][from.column] = null;
}

function handPieceDropped(
  state: BoardState & HandsState & CurrentPlayerState,
  index: number,
  to: GridLocation
) {
  const { hands, currentPlayer } = state;

  const hand = hands[currentPlayer];
  const piece = hand[index];

  state.board[to.row][to.column] = {
    baseType: piece.baseType,
    startingOwner: piece.startingOwner,
    currentOwner: currentPlayer,
    isPromoted: false,
  };

  _.pullAt(hand, index);
}
