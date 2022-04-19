import { ColorValue, ImageSourcePropType } from "react-native";
import { PieceMoveSet } from "../core/pieceMoveSet";

export type PieceForm = {
  imageSource: ImageSourcePropType;
  innerColor: ColorValue;
  outerColor: ColorValue;
  moveSet: PieceMoveSet;
};

export type PieceSet = {
  [pieceName: string]: {
    baseForm: PieceForm;
    promotedForm?: PieceForm;
  };
};
