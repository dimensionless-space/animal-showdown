import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import CenterView from "../CenterView";
import HandComponent from "../../../src/ui/components/HandComponent";
import BoardComponent from "../../../src/ui/components/BoardComponent";
import {
  boardImage,
  gridDimensions,
} from "../../../src/ui/util/boardImageInfo";
import { GestureHandlerRootView } from "react-native-gesture-handler";

storiesOf("Hand", module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("hand", () => {
    const g = { type: "giraffe" };
    const l = { type: "lion" };
    const e = { type: "elephant" };
    const c = { type: "chick" };

    const gtt = { ...g, owner: "top", id: "gtt" };
    const ltt = { ...l, owner: "top", id: "ltt" };
    const ett = { ...e, owner: "top", id: "ett" };
    const ctt = { ...c, owner: "top", id: "ctt" };

    const gbb = { ...g, owner: "bottom", id: "gbb" };
    const lbb = { ...l, owner: "bottom", id: "lbb" };
    const ebb = { ...e, owner: "bottom", id: "ebb" };
    const cbb = { ...c, owner: "bottom", id: "cbb" };

    const pieces = [
      [gtt, ltt, ett],
      [null, ctt, null],
      [null, cbb, null],
      [gbb, lbb, ebb],
    ];

    const styles = StyleSheet.create({
      container: {
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        alignItems: "stretch",
        backgroundColor: "purple",
      },
    });

    function Hand() {
      const [topPieces, setTopPieces] = useState([]);
      const [bottomPieces, setBottomPieces] = useState([
        {
          baseType: "chicken",
          startingOwner: "top",
        },
        {
          baseType: "giraffe",
          startingOwner: "top",
        },
      ]);

      function onSpacePressed(offset) {
        //
      }

      return (
        <View style={styles.container}>
          <HandComponent owner="top" pieces={topPieces} />
          <BoardComponent
            background={boardImage}
            gridDimensions={gridDimensions}
            pieces={pieces}
            piecePadding={10}
            onSpacePressed={onSpacePressed}
          />
          <HandComponent owner="bottom" pieces={bottomPieces} />
        </View>
      );
    }

    return (
      <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
        <Hand />
      </GestureHandlerRootView>
    );
  });
