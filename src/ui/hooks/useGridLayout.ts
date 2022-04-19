import { useMemo } from "react";
import { ImageSourcePropType } from "react-native";
import { useImageLayout } from "./useImageLayout";

export function useGridLayout(
  imageSource: ImageSourcePropType,
  gridDimensions: {
    left: number;
    top: number;
    width: number;
    height: number;
  }
) {
  const {
    onLayout,
    hasLayout,
    imageX,
    imageY,
    imageScaleX,
    imageScaleY,
    imageWidth,
    imageHeight,
  } = useImageLayout(imageSource);

  const gridLayout = useMemo(() => {
    if (!hasLayout) {
      return {
        gridX: 0,
        gridY: 0,
        gridWidth: 0,
        gridHeight: 0,
      };
    }

    const gridX = imageScaleX * gridDimensions.left + imageX;
    const gridY = imageScaleY * gridDimensions.top + imageY;
    const gridWidth = imageScaleX * gridDimensions.width;
    const gridHeight = imageScaleY * gridDimensions.height;

    return {
      gridX,
      gridY,
      gridWidth,
      gridHeight,
    };
  }, [hasLayout, imageX, imageY, imageWidth, imageHeight]);

  return { onLayout, hasLayout, ...gridLayout };
}
