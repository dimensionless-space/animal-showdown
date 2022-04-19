import { Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { z } from "zod";
import {
  activePieceTypeToBaseType,
  zActivePieceType,
} from "../../core/activePiece";
import { imageForActivePieceType } from "../util/imageForPiece";
import PieceComponent from "./PieceComponent";

export const zBoardPieceComponentProps = z.object({
  spaceName: z.string().optional(),
  type: zActivePieceType,
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  owner: z.enum(["top", "bottom"]),
});

export type BoardPieceComponentProps = z.infer<
  typeof zBoardPieceComponentProps
>;

export default function BoardPieceComponent(props: BoardPieceComponentProps) {
  const {
    type,
    x: _x,
    y: _y,
    width,
    height,
    owner,
  } = zBoardPieceComponentProps.parse(props);

  const { baseType, isPromoted } = activePieceTypeToBaseType(type);

  const x = _x - width / 2;
  const y = _y - height / 2;

  const xShared = useSharedValue(x);
  xShared.value = withTiming(x);
  const yShared = useSharedValue(y);
  yShared.value = withTiming(y);

  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: xShared.value },
        { translateY: yShared.value },
        { rotateZ: owner == "bottom" ? "0deg" : "180deg" },
      ],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height,
        },
        transformStyle,
      ]}
    >
      <PieceComponent pieceType={baseType} isPromoted={isPromoted} />
    </Animated.View>
  );
}
