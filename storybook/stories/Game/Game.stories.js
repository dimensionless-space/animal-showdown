import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import CenterView from "../CenterView";
import BoardComponent from "../../../src/ui/components/BoardComponent";
import {
  boardImage,
  gridDimensions,
} from "../../../src/ui/util/boardImageInfo";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "purple",
  },
});

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

function GameWrapper() {
  console.log("story Game()");
  const [selectedPiece, setSelectedPiece] = useState(null);

  const onSpacePressed = useCallback(
    function onSpacePressed(space) {
      if (selectedPiece) {
        const currentPiece = pieces[selectedPiece.row][selectedPiece.column];
        pieces[selectedPiece.row][selectedPiece.column] =
          pieces[space.row][space.column];
        pieces[space.row][space.column] = currentPiece;
        setSelectedPiece(null);
      } else {
        setSelectedPiece(space);
      }
    },
    [selectedPiece]
  );

  return (
    <View style={styles.container}>
      <BoardComponent
        background={boardImage}
        gridDimensions={gridDimensions}
        pieces={pieces}
        piecePadding={10}
        selectedPiece={selectedPiece}
        onSpacePressed={onSpacePressed}
      />
    </View>
  );
}

storiesOf("Game", module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("board", () => {
    return <GameWrapper />;
  });
