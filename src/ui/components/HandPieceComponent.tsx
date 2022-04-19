import { useRef, useState } from "react";
import { ImageStyle, StyleProp, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { z } from "zod";
import { zPlayerSeat } from "../../core/playerSeat";
import { useDrag } from "../util/dragAndDrop";
import { imageForBoardPiece } from "../util/imageForPiece";
import PieceComponent from "./PieceComponent";

export const zHandPieceComponentProps = z.object({
  piece: z.any(),
  owner: zPlayerSeat,
  isSelected: z.boolean(),
  onPress: z.function(),
});

export type HandPieceComponentProps = z.infer<typeof zHandPieceComponentProps>;

export default function HandPieceComponent(props: HandPieceComponentProps) {
  const { piece, owner, isSelected, onPress } =
    zHandPieceComponentProps.parse(props);

  const defaultStyle = {
    height: "100%",
    width: undefined,
    // maxHeight: "100%",
    // maxWidth: "100%",
    // height: 50,
    // width: 50,
    aspectRatio: 1,
  } as StyleProp<Animated.AnimateStyle<StyleProp<ImageStyle>>>;

  const gesture = Gesture.Tap()
    .onStart(() => {
      // runOnJS(onPress)();
    })
    .onEnd(() => {
      runOnJS(onPress)();
    });

  // const { ref, gesture, isPressed, offset } = useDrag();

  // const isPressed = useSharedValue(false);
  // const offset = useSharedValue({ x: 0, y: 0 });
  // const start = useSharedValue({ x: 0, y: 0 });
  // if (!isPressed) {
  //   offset.value = {
  //     x: withSpring(start.value.x),
  //     y: withSpring(start.value.y),
  //   };
  // }
  // const damping = 20;
  // const stiffness = 50;
  // const overshootClamping = true;

  const isSelectedShared = useSharedValue(isSelected);
  isSelectedShared.value = isSelected;

  const rotateZ = owner == "bottom" ? "0deg" : "180deg";
  const rotateZShared = useSharedValue(rotateZ);
  rotateZShared.value = rotateZ;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        // {
        //   translateX: isPressed.value
        //     ? offset.value.x
        //     : withSpring(0, { damping, stiffness, overshootClamping }),
        // },
        // {
        //   translateY: isPressed.value
        //     ? offset.value.y
        //     : withSpring(0, { damping, stiffness, overshootClamping }),
        // },
        { rotateZ: rotateZShared.value },
        { scale: withSpring(isSelectedShared.value ? 1.2 : 1) },
      ],
      // backgroundColor: isPressed.value ? "yellow" : "blue",
    };
  });

  // const sf = () => {
  //   foo.current = foo.current + 1;
  // };

  // const gesture = Gesture.Pan()
  //   .onBegin(() => {
  //     isPressed.value = true;
  //   })
  //   .onUpdate((e) => {
  //     offset.value = {
  //       x: e.translationX + start.value.x,
  //       y: e.translationY + start.value.y,
  //     };
  //     // e.
  //     // runOnJS(sf)();
  //   })
  //   .onEnd(() => {
  //     // offset.value = withSpring(offset.value);
  //     // offset.value = {
  //     //   x: withSpring(start.value.x),
  //     //   y: withSpring(start.value.y),
  //     // };
  //     // start.value = {
  //     //   x: offset.value.x,
  //     //   y: offset.value.y,
  //     // };
  //     // onDrop(offset.value);
  //   })
  //   .onFinalize(() => {
  //     offset.value = { x: 0, y: 0 };
  //     isPressed.value = false;
  //   });

  // if (!hasLayout) return null;

  // const height = layout.height * 0.9;
  // const width = height;
  return (
    <GestureDetector key={piece.id} gesture={gesture}>
      <Animated.View style={[defaultStyle, animatedStyles]}>
        <PieceComponent pieceType={piece.baseType} isPromoted={false} />
      </Animated.View>
    </GestureDetector>
  );
}
