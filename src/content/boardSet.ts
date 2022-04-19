import { ImageSourcePropType } from "react-native";
import { PieceInvariants } from "../core/piece";
import { GridN } from "../util/grid";
import { PieceSet } from "./pieceSet";

export type BoardSet = {
  background: ImageSourcePropType;
  gridDimensions: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  pieceSet: PieceSet;
  startingBoard: GridN<PieceInvariants | null>;
};
