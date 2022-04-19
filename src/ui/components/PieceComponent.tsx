import _ from "lodash";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { z } from "zod";
import usePieceForm from "../hooks/usePieceForm";
import usePieceMoveSummary from "../hooks/usePieceMoveSummary";

export const zPieceComponentProps = z.object({
  pieceType: z.string(),
  isPromoted: z.boolean(),
});

export type PieceComponentProps = z.infer<typeof zPieceComponentProps>;

export default function PieceComponent(props: PieceComponentProps) {
  const { pieceType, isPromoted } = props;

  const pieceForm = usePieceForm(pieceType, isPromoted);
  const pieceMoveSummary = usePieceMoveSummary(pieceForm.moveSet);

  const flexRatio = 4;
  const borderRadius =
    _.max([Dimensions.get("window").width, Dimensions.get("window").height])! /
    2;

  const rows = _.times(3, (r) => {
    const columns = _.times(3, (c) => {
      if (r == 1 && c == 1) {
        return (
          // <View
          //   style={{
          //     padding: "2.5%",
          //     overflow: "hidden",
          //     backgroundColor: pieceForm.innerColor,
          //     borderColor: "black",
          //     borderWidth: 2,
          //     maxHeight: "100%",
          //     flex: flexRatio,
          //   }}
          // >
          //   <Image
          //     style={{
          //       resizeMode: "cover",
          //       aspectRatio: 1,
          //       maxHeight: "95%",
          //       maxWidth: "95%",
          //     }}
          //     source={pieceForm.imageSource}
          //   />
          // </View>
          <View
            key={c}
            style={{
              flex: flexRatio,
              padding: "3%",
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                overflow: "hidden",
                maxHeight: "100%",
                flex: flexRatio,
              }}
              source={pieceForm.imageSource}
            />
          </View>
        );
      }
      const move = pieceForm.moveSet[r + 1][c + 1];
      const isStepMove = move == 1;
      const isRangeMove = move == 2;
      const isJumpMove = r == 0 && pieceForm.moveSet[0][c + 1] == 1;
      return (
        <View
          key={c}
          style={[
            styles.column,
            c == 1
              ? { flex: flexRatio, flexDirection: "column" }
              : { flex: 1, flexDirection: "row" },
          ]}
        >
          {isStepMove ? (
            <View style={[styles.circle, { borderRadius }]} />
          ) : null}
        </View>
      );
    });
    return (
      <View key={r} style={[styles.row, { flex: r == 1 ? flexRatio : 1 }]}>
        {columns}
      </View>
    );
  });

  return (
    <View
      style={{
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: pieceForm.outerColor,
        flex: 1,
        aspectRatio: 1,
        padding: "7.5%",
      }}
    >
      <View
        style={{
          backgroundColor: pieceForm.innerColor,
          borderColor: "black",
          borderWidth: 0.25,
          borderRadius: 5,
          flex: 1,
          aspectRatio: 1,
          flexDirection: "column",
        }}
      >
        {rows}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  column: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    aspectRatio: 1,
    backgroundColor: "#CC351A",
    width: "65%",
    height: "65%",
    borderColor: "#912512",
    borderWidth: 1,
  },
});
