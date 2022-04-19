import { GridLocation } from "../util/grid";

export type BoardPieceSelection = {
  boardPiece: GridLocation;
};

export type HandPieceSelection = {
  handPieceIndex: number;
};

export type PieceSelection = BoardPieceSelection | HandPieceSelection;
