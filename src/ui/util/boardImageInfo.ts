import { Image } from "react-native";

export const boardImage = require("animal-showdown/assets/board.png");

const boardImageSource = Image.resolveAssetSource(boardImage);

export const boardDimensions = {
  width: boardImageSource.width ?? 2246,
  height: boardImageSource.height ?? 3273,
};

export const gridDimensions = {
  left: 100,
  top: 279,
  width: boardDimensions.width - (100 + 110),
  height: boardDimensions.height - (277 + 279),
};
