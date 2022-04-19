import { useCallback } from "react";
import { ColorValue, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { z } from "zod";
import {
  NotionalMoveType,
  zNotionalMoveType,
} from "../../core/notionalBoardMoves";
import { useDrop } from "../util/dragAndDrop";

export const zBoardSpaceComponentProps = z.object({
  spaceName: z.string(),
  left: z.number(),
  top: z.number(),
  width: z.number(),
  height: z.number(),
  isSelected: z.boolean(),
  availableMove: zNotionalMoveType.nullable().optional(),
  onPress: z.function().optional(),
});

export type BoardSpaceComponentProps = z.infer<
  typeof zBoardSpaceComponentProps
>;

const moveColors = {
  Available: "#0000CC99",
  Blocked: "#44444499",
  Capture: "#CC000099",
  Lose: null,
  Origin: "#00CC0099",
  Promote: "#D18F0099",
  Unreachable: null,
  Win: null,
} as { [moveType in NotionalMoveType]: ColorValue | null };

export default function BoardSpaceComponent(props: BoardSpaceComponentProps) {
  const { left, top, width, height, isSelected, availableMove, onPress } =
    zBoardSpaceComponentProps.parse(props);

  const backgroundColor = isSelected
    ? moveColors.Origin
    : availableMove == null
    ? undefined
    : moveColors[availableMove]!;

  const onDrop = useCallback(function () {
    //
  }, []);
  const { ref, isHovering } = useDrop(onDrop);
  const isHovering2 = useSharedValue(false);

  const highlightStyle = useAnimatedStyle(() => {
    return { backgroundColor: isHovering.value ? "blue" : "red" };
  });

  return (
    <TouchableWithoutFeedback
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
      }}
      onPress={onPress}
    >
      <Animated.View
        ref={ref}
        style={[
          {
            position: "absolute",
            left,
            top,
            width,
            height,
            backgroundColor,
          },
          // highlightStyle,
        ]}
      />
    </TouchableWithoutFeedback>
  );
}
