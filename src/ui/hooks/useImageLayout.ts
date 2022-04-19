import { useLayout } from "@react-native-community/hooks";
import { useMemo } from "react";
import { Image, ImageSourcePropType } from "react-native";

// only implemented for resizeMode="contain"
export function useImageLayout(imageSource: ImageSourcePropType) {
  const resolvedSource = Image.resolveAssetSource(imageSource);
  const testMode = (resolvedSource as any).testUri != null;

  const { onLayout, ...layout } = useLayout();
  const hasLayout = testMode || (layout.width != 0 && layout.height != 0);

  const imageLayout = useMemo(() => {
    if (testMode) {
      return {
        imageX: 0,
        imageY: 0,
        imageScaleX: 1,
        imageScaleY: 1,
        imageWidth: 100,
        imageHeight: 100,
      };
    }

    if (!hasLayout) {
      return {
        imageX: 0,
        imageY: 0,
        imageScaleX: 1,
        imageScaleY: 1,
        imageWidth: 0,
        imageHeight: 0,
      };
    }

    const { width: sourceWidth, height: sourceHeight } = resolvedSource;

    const layoutAspectRatio = layout.width / layout.height; // e.g. 6/4
    const imageAspectRatio = sourceWidth / sourceHeight; // e.g. 8/4; height will be reduced to fit

    if (
      Math.abs(layoutAspectRatio - imageAspectRatio) <
      Number.EPSILON * 100000
    ) {
      return {
        imageX: layout.x,
        imageY: layout.y,
        imageScaleX: layout.width / sourceWidth,
        imageScaleY: layout.height / sourceHeight,
        imageWidth: layout.width,
        imageHeight: layout.height,
      };
    }

    if (imageAspectRatio > layoutAspectRatio) {
      // height has been reduced to fit in the container
      const imageWidth = layout.width;
      const imageHeight =
        (layout.height * layoutAspectRatio) / imageAspectRatio;
      const imageY = (layout.height - imageHeight) / 2 + layout.y;
      return {
        imageX: layout.x,
        imageY,
        imageScaleX: imageWidth / sourceWidth,
        imageScaleY: imageHeight / sourceHeight,
        imageWidth,
        imageHeight,
      };
    }

    // width has been reduced to fit in the container
    const imageWidth = (layout.width * imageAspectRatio) / layoutAspectRatio;
    const imageHeight = layout.height;
    const imageX = (layout.width - imageWidth) / 2 + layout.x;
    return {
      imageX,
      imageY: layout.y,
      imageScaleX: imageWidth / sourceWidth,
      imageScaleY: imageHeight / sourceHeight,
      imageWidth,
      imageHeight,
    };
  }, [hasLayout, layout.x, layout.y, layout.width, layout.height]);

  return { onLayout, hasLayout, ...imageLayout };
}
