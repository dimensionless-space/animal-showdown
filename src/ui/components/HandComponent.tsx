import { Merge } from "type-fest";
import _ from "lodash";
import { StyleProp, View, ViewStyle } from "react-native";
import { z } from "zod";
import HandPieceComponent from "./HandPieceComponent";
import { zHandPiece } from "../../core/handPiece";
import { zPlayerSeat } from "../../core/playerSeat";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export const zHandComponentProps = z.object({
  style: z.any(),
  owner: zPlayerSeat,
  pieces: z.array(zHandPiece),
  enabled: z.boolean(),
  selectedPiece: z.number().nullable().optional(),
  onPieceSelected: z.function(z.tuple([z.number()]), z.void()),
});

export type HandComponentProps = Merge<
  z.infer<typeof zHandComponentProps>,
  {
    style?: StyleProp<ViewStyle>;
  }
>;

export default function HandComponent(props: HandComponentProps) {
  const { style, owner, pieces, enabled, selectedPiece, onPieceSelected } =
    zHandComponentProps.parse(props) as HandComponentProps;

  const defaultStyle = {
    justifyContent: owner == "top" ? "flex-start" : "flex-end",
    alignItems: "stretch",
    zIndex: 3,
    // height: "100%",
    // aspectRatio: 1,
  } as StyleProp<ViewStyle>;

  const ownerShared = useSharedValue(owner);
  ownerShared.value = owner;

  const enabledShared = useSharedValue(enabled);
  enabledShared.value = enabled;

  const flexShared = useSharedValue(1);
  // flexShared.value = withSpring(enabled ? 2 : 1);
  flexShared.value = enabled ? 2 : 1;

  const backgroundActive = useDerivedValue(() => {
    return withTiming(enabledShared.value ? 1 : 0);
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // flex: flexShared.value,
      height: withSpring(enabledShared.value ? "100%" : "75%"),
      width: "100%",
      borderTopStartRadius: ownerShared.value == "bottom" ? 15 : 0,
      borderTopEndRadius: ownerShared.value == "bottom" ? 15 : 0,
      borderBottomStartRadius: ownerShared.value == "top" ? 15 : 0,
      borderBottomEndRadius: ownerShared.value == "top" ? 15 : 0,
      backgroundColor: interpolateColor(
        backgroundActive.value,
        [0, 1],
        ["#444444", "#DDDDDD"]
      ),
    };
  });

  // const pieceComponents = _.map(pieces, (piece, index) => {
  //   const pieceImage = imageForBoardPiece({
  //     baseType: piece.baseType,
  //     isPromoted: false,
  //   });
  //   return (
  //     <Image
  //       key={index}
  //       style={{
  //         width: 100,
  //         height: 100,
  //         // width: "100%",
  //         // height: "100%",
  //         resizeMode: "contain",
  //       }}
  //       source={pieceImage}
  //     />
  //   );
  // });

  // const data = pieces;

  // const { onLayout, ...layout } = useLayout();
  // const hasLayout = layout.width != 0 && layout.height != 0;

  // const pieceComponents = _.map(pieces, (piece, index) => {
  //   const pieceImage = imageForBoardPiece({
  //     baseType: piece.baseType,
  //     isPromoted: false,
  //   });

  //   const isPressed = useSharedValue(false);
  //   const offset = useSharedValue({ x: 0, y: 0 });
  //   const start = useSharedValue({ x: 0, y: 0 });
  //   // if (!isPressed) {
  //   //   offset.value = {
  //   //     x: withSpring(start.value.x),
  //   //     y: withSpring(start.value.y),
  //   //   };
  //   // }
  //   const damping = 20;
  //   const stiffness = 50;
  //   const overshootClamping = true;
  //   const animatedStyles = useAnimatedStyle(() => {
  //     return {
  //       transform: [
  //         {
  //           translateX: isPressed.value
  //             ? offset.value.x
  //             : withSpring(0, { damping, stiffness, overshootClamping }),
  //         },
  //         {
  //           translateY: isPressed.value
  //             ? offset.value.y
  //             : withSpring(0, { damping, stiffness, overshootClamping }),
  //         },
  //         { scale: withSpring(isPressed.value ? 1.2 : 1) },
  //       ],
  //       backgroundColor: isPressed.value ? "yellow" : "blue",
  //     };
  //   });
  //   const gesture = Gesture.Pan()
  //     .onBegin(() => {
  //       isPressed.value = true;
  //     })
  //     .onUpdate((e) => {
  //       offset.value = {
  //         x: e.translationX + start.value.x,
  //         y: e.translationY + start.value.y,
  //       };
  //     })
  //     .onEnd(() => {
  //       // offset.value = withSpring(offset.value);
  //       // offset.value = {
  //       //   x: withSpring(start.value.x),
  //       //   y: withSpring(start.value.y),
  //       // };
  //       // start.value = {
  //       //   x: offset.value.x,
  //       //   y: offset.value.y,
  //       // };
  //     })
  //     .onFinalize(() => {
  //       offset.value = { x: 0, y: 0 };
  //       isPressed.value = false;
  //     });

  //   if (!hasLayout) return null;

  //   const height = layout.height * 0.9;
  //   const width = height;

  //   return (
  //     <GestureDetector key={piece.id} gesture={gesture}>
  //       <Animated.Image
  //         style={[
  //           {
  //             width,
  //             height,
  //             // width: "90%",
  //             // height: "90%",
  //             // width: "100%",
  //             // height: "100%",
  //             alignSelf: "center",
  //             resizeMode: "contain",
  //             backgroundColor: "blue",
  //           },
  //           animatedStyles,
  //         ]}
  //         source={pieceImage}
  //       />
  //     </GestureDetector>
  //   );
  // });

  const pieceComponents = _.map(pieces, (piece, pieceIndex) => {
    const key = `${piece.baseType[0]}${piece.startingOwner}`;
    const isSelected = pieceIndex == selectedPiece;

    function onPress() {
      if (enabled) {
        onPieceSelected(pieceIndex);
      }
    }

    return (
      <HandPieceComponent
        key={key}
        owner={owner}
        piece={piece}
        isSelected={isSelected}
        onPress={onPress}
      />
    );
  });

  return (
    <View style={[defaultStyle, style]}>
      <Animated.View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-around",
          },
          animatedStyle,
        ]}
      >
        {pieceComponents}
      </Animated.View>
    </View>
  );
}
