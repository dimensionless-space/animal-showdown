import { ImageSourcePropType } from "react-native";
import { ActivePieceType, activeTypeOfPiece } from "../../core/activePiece";
import { BoardPiece, BoardPieceTypeInfo } from "../../core/board";

const pieceTypeImages: { [pieceType: string]: ImageSourcePropType } = {
  chick: require("animal-showdown/assets/chick.png"),
  elephant: require("animal-showdown/assets/elephant.png"),
  giraffe: require("animal-showdown/assets/giraffe.png"),
  hen: require("animal-showdown/assets/hen.png"),
  lion: require("animal-showdown/assets/lion.png"),
};

export function imageForActivePieceType(activePieceType: ActivePieceType) {
  return pieceTypeImages[activePieceType];
}

export function imageForBoardPiece(piece: BoardPieceTypeInfo) {
  return imageForActivePieceType(activeTypeOfPiece(piece));
}
