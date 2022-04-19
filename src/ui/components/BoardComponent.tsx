import _ from "lodash";
import { Image, StyleProp, View, ViewStyle } from "react-native";
import { z } from "zod";
import { zActivePieceType } from "../../core/activePiece";
import { gridLocationToBoardSpaceName } from "../util/boardSpaceName";
import { zNotionalMoveType } from "../../core/notionalBoardMoves";
import { flatMap2D } from "../../util/grid";
import BoardPieceComponent from "./BoardPieceComponent";
import BoardSpaceComponent from "./BoardSpaceComponent";
import { useGridLayout } from "../hooks/useGridLayout";
import { Merge } from "type-fest";
import { zPlayerSeat } from "../../core/playerSeat";

export const zSpaceOffset = z.object({
  row: z.number().min(0),
  column: z.number().min(0),
});

export type SpaceOffset = z.infer<typeof zSpaceOffset>;

export const zBoardComponentProps = z.object({
  style: z.any(),
  background: z.any(),
  gridDimensions: z.object({
    left: z.number(),
    top: z.number(),
    width: z.number(),
    height: z.number(),
  }),
  pieces: z
    .array(
      z
        .array(
          z
            .object({
              id: z.string(),
              type: zActivePieceType,
              owner: zPlayerSeat,
            })
            .nullable()
        )
        .min(1)
    )
    .min(1),
  piecePadding: z.number(),
  selectedPiece: zSpaceOffset.nullable().optional(),
  availableMoves: z.array(z.array(zNotionalMoveType)).nullable().optional(),
  onSpacePressed: z.function().args(zSpaceOffset).returns(z.void()),
});

export type BoardComponentProps = Merge<
  z.infer<typeof zBoardComponentProps>,
  {
    style?: StyleProp<ViewStyle>;
  }
>;

export default function BoardComponent(props: BoardComponentProps) {
  const {
    style,
    background,
    gridDimensions,
    pieces,
    piecePadding,
    selectedPiece,
    availableMoves,
    onSpacePressed,
  } = zBoardComponentProps.parse(props) as BoardComponentProps;

  const { onLayout, hasLayout, ...gridLayout } = useGridLayout(
    background,
    gridDimensions
  );

  const { gridX, gridY, gridWidth, gridHeight } = gridLayout;

  const rowCount = pieces.length;
  const columnCount = _.max(_.map(pieces, (pieceRow) => pieceRow.length)) || 1;

  const columnWidth = gridWidth / columnCount;
  const rowHeight = gridHeight / rowCount;

  const pieceWidth = columnWidth - piecePadding * 2;
  const pieceHeight = rowHeight - piecePadding * 2;

  const spaceComponents = flatMap2D(pieces, (_piece, location) => {
    const { row: rowIndex, column: columnIndex } = location;
    const spaceLeft = gridX + columnWidth * columnIndex;
    const spaceTop = gridY + rowHeight * rowIndex;
    const spaceName = gridLocationToBoardSpaceName(location);

    const isSelected =
      selectedPiece == null
        ? false
        : rowIndex == selectedPiece.row && columnIndex == selectedPiece.column;

    function onPress() {
      const space = { row: rowIndex, column: columnIndex };
      onSpacePressed(space);
    }

    const availableMove =
      availableMoves == null ? null : availableMoves[rowIndex][columnIndex];

    return (
      <BoardSpaceComponent
        spaceName={spaceName}
        left={spaceLeft}
        top={spaceTop}
        width={columnWidth}
        height={rowHeight}
        isSelected={isSelected}
        availableMove={availableMove}
        onPress={onPress}
        key={spaceName}
      />
    );
  });

  const pieceComponents = _.sortBy(
    _.reject(
      flatMap2D(pieces, (piece, { row, column }) => {
        const pieceLeft = gridX + columnWidth * (column + 0.5);
        const pieceTop = gridY + rowHeight * (row + 0.5);

        if (piece == null) {
          return null;
        }

        const spaceName = gridLocationToBoardSpaceName({ row, column });

        return (
          <BoardPieceComponent
            type={piece.type}
            spaceName={spaceName}
            x={pieceLeft}
            y={pieceTop}
            width={pieceWidth}
            height={pieceHeight}
            owner={piece.owner}
            key={piece.id}
          />
        );
      }),
      (p) => p == null
    ),
    (p) => p?.key
  );

  return (
    <View
      style={style}
      // style={{
      //   flex: 10,
      //   // alignSelf: "stretch",
      //   backgroundColor: "brown",
      //   justifyContent: "flex-start",
      // }}
    >
      <Image
        onLayout={onLayout}
        style={{
          position: "absolute",
          // flex: 1,
          width: "100%",
          height: "100%",
          // alignSelf: "center",
          // flex: 1,
          // width: "100%",
          // aspectRatio: backgroundWidth / backgroundHeight,
          // aspectRatio: backgroundHeight / backgroundWidth,
          // maxWidth: layout.width,
          // maxHeight: layout.width * (backgroundHeight / backgroundWidth),
          // maxHeight: layout.height,
          resizeMode: "contain",
        }}
        source={background}
      />
      {hasLayout ? spaceComponents : null}
      {hasLayout ? pieceComponents : null}
    </View>
  );
}
