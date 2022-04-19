import { isValidMove } from "../../core/isValidMove";
import { notionalBoardMovesForPieceAtSpace } from "../../core/notionalBoardMoves";
import { isBoardPieceSelection } from "../../core/notionalMoves";
import { GridLocation } from "../../util/grid";
import { BoardState } from "../states/boardState";
import { CurrentPlayerState } from "../states/currentPlayerState";
import { PieceSelection } from "../../core/pieceSelection";
import { PlayerSeat } from "../../core/playerSeat";

export type MovePieceEvents = {
  pieceMoved(fromSelection: PieceSelection, toSpace: GridLocation): void;
  gameEnded(victor: PlayerSeat | null): void;
};

export default function movePiece(
  state: BoardState & CurrentPlayerState,
  events: MovePieceEvents,
  fromSelection: PieceSelection,
  toSpace: GridLocation
) {
  if (isBoardPieceSelection(fromSelection)) {
    moveBoardPiece(state, events, fromSelection.boardPiece, toSpace);
    return;
  }

  dropHandPiece(state, events, fromSelection.handPieceIndex, toSpace);
}

function moveBoardPiece(
  state: BoardState & CurrentPlayerState,
  events: MovePieceEvents,
  from: GridLocation,
  to: GridLocation
) {
  const { board, currentPlayer } = state;

  if (!isValidMove({ board, from, to })) return;

  const fromPiece = board[from.row][from.column];
  const toPiece = board[to.row][to.column];

  if (fromPiece == null) return;
  if (fromPiece.currentOwner != currentPlayer) return;
  if (toPiece != null && toPiece.currentOwner == fromPiece.currentOwner) {
    return;
  }

  const availableMoves = notionalBoardMovesForPieceAtSpace({
    board: board,
    space: from,
  });

  const move = availableMoves[to.row][to.column];
  if (move == "Blocked" || move == "Origin" || move == "Unreachable") {
    return;
  }

  if (toPiece?.baseType == "lion") {
    events.gameEnded(currentPlayer);
    return;
  }

  events.pieceMoved({ boardPiece: from }, to);
}

function dropHandPiece(
  state: BoardState,
  events: MovePieceEvents,
  handPieceIndex: number,
  to: GridLocation
) {
  events.pieceMoved({ handPieceIndex }, to);
}
