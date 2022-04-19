import { storiesOf } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";
import CenterView from "../CenterView";
import PieceComponent from "../../../src/ui/components/PieceComponent";
import { BoardSetContext } from "../../../src/content/boardSetContext";
import { basicBoard } from "../../../src/content/basicBoard";

storiesOf("Piece", module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("piece", () => {
    function Piece() {
      const [top, setTop] = useState(0);
      const [left, setLeft] = useState(200);

      function onPress() {
        setTop((t) => t + 100);
      }

      return (
        <BoardSetContext.Provider value={basicBoard}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            {/* <View
              style={{
                backgroundColor: "rebeccapurple",
                aspectRatio: 1,
                flex: 1,
              }}
            /> */}
            <PieceComponent
              pieceType="elephant"
              isPromoted={false}
            ></PieceComponent>
          </View>
        </BoardSetContext.Provider>
      );
    }
    return <Piece />;
  });
