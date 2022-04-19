import { createContext } from "react";
import { Image } from "react-native";
import { basicPieceSet } from "./basicPieces";
import { BoardSet } from "./boardSet";

const background = require("animal-showdown/assets/board.png");

const backgroundResolved = Image.resolveAssetSource(background);

const backgroundDimensions = {
  width: backgroundResolved.width ?? 2246,
  height: backgroundResolved.height ?? 3273,
};

export const basicBoard: BoardSet = {
  background,
  gridDimensions: {
    left: 100,
    top: 279,
    width: backgroundDimensions.width - (100 + 100),
    height: backgroundDimensions.height - (277 + 279),
  },
  pieceSet: basicPieceSet,
  startingBoard: [
    [
      { baseType: "giraffe", startingOwner: "top" },
      { baseType: "lion", startingOwner: "top" },
      { baseType: "elephant", startingOwner: "top" },
    ],
    [null, { baseType: "chicken", startingOwner: "top" }, null],
    [null, { baseType: "chicken", startingOwner: "bottom" }, null],
    [
      { baseType: "giraffe", startingOwner: "bottom" },
      { baseType: "lion", startingOwner: "bottom" },
      { baseType: "elephant", startingOwner: "bottom" },
    ],
  ],
};

export const BasicBoardContext = createContext(basicBoard);
