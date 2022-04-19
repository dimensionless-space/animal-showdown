import {
  StyleSheet,
  View,
  ImageSourcePropType,
  Text,
  Button,
} from "react-native";
import _ from "lodash";
import { ActivePieceType, activeTypeOfPiece } from "../../core/activePiece";
import { useAppInteractor, useAppSelector } from "../../app/interactor";
import BoardComponent from "./BoardComponent";
import { map2D } from "../../util/grid";
import { gridDimensions } from "../util/boardImageInfo";
import { GridLocation } from "../../util/grid";
import {
  isBoardPieceSelection,
  isHandPieceSelection,
} from "../../core/notionalMoves";
import { useCallback } from "react";
import HandComponent from "./HandComponent";
import {
  BoardPieceSelection,
  HandPieceSelection,
} from "../../core/pieceSelection";
import { PlayerSeat } from "../../core/playerSeat";

const boardImage =
  require("animal-showdown/assets/board.png") as ImageSourcePropType;

export default function Game() {
  const board = useAppSelector((s) => s.board);
  const hands = useAppSelector((s) => s.hands);
  const currentPlayer = useAppSelector((s) => s.currentPlayer);
  const currentlySelectedPiece = useAppSelector((s) => s.currentPieceSelection);
  const availableMoves = useAppSelector((s) => s.currentlyAvailableMoves);
  const gameOver = useAppSelector((s) => s.gameOver);

  // TODO: getting state from the interactor is dangerous cuz it doesn't invalidate like useSelector
  // so maybe just useAppCommands or something?
  const interactor = useAppInteractor();

  const isGameOver = gameOver != null;

  // TODO: Remove
  // const isGameOver = true;
  // const gameOver = { victor: "top" };

  const pieces = map2D(board, (piece) => {
    if (piece == null) {
      return null;
    }

    const id = `${piece.baseType[0]}${piece.currentOwner[0]}${piece.startingOwner[0]}`;

    return {
      id,
      type: activeTypeOfPiece(piece) as ActivePieceType,
      owner: piece.currentOwner as PlayerSeat,
    };
  });

  const onSpacePressed = useCallback(
    function (location: GridLocation) {
      if (_.isEqual(currentlySelectedPiece, { boardPiece: location })) {
        interactor.selectPiece(null);
        return;
      }

      if (currentlySelectedPiece == null) {
        interactor.selectPiece({ boardPiece: location });
        return;
      }

      interactor.movePiece(currentlySelectedPiece, location);
    },
    [
      (currentlySelectedPiece as BoardPieceSelection | null)?.boardPiece?.row,
      (currentlySelectedPiece as BoardPieceSelection | null)?.boardPiece
        ?.column,
      (currentlySelectedPiece as HandPieceSelection | null)?.handPieceIndex,
    ]
  );

  const selectedPiece =
    currentlySelectedPiece == null
      ? null
      : isBoardPieceSelection(currentlySelectedPiece)
      ? currentlySelectedPiece.boardPiece
      : null;

  const selectedHandPiece =
    currentlySelectedPiece == null
      ? null
      : isHandPieceSelection(currentlySelectedPiece)
      ? currentlySelectedPiece.handPieceIndex
      : null;

  function onHandPieceSelected(handPieceIndex: number) {
    if (_.isEqual(currentlySelectedPiece, { handPieceIndex })) {
      interactor.selectPiece(null);
      return;
    }
    interactor.selectPiece({ handPieceIndex });
  }

  function onNewGameSelected() {
    interactor.startNewGame();
  }

  function gameOverView() {
    const victoryText =
      gameOver?.victor == null
        ? `The game is a draw!`
        : `${_.capitalize(gameOver?.victor)} player wins!`;
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#00000044",
          zIndex: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            height: "20%",
            backgroundColor: "white",
            borderRadius: 15,
            padding: 25,
          }}
        >
          <Text style={{ fontSize: 18, textAlign: "center", flex: 1 }}>
            {victoryText}
          </Text>
          <Button title="New Game" onPress={onNewGameSelected} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HandComponent
        style={{ flex: 2 }}
        owner="top"
        pieces={hands.top}
        enabled={currentPlayer == "top"}
        selectedPiece={currentPlayer == "top" ? selectedHandPiece : null}
        onPieceSelected={onHandPieceSelected}
      />
      <BoardComponent
        style={{ flex: 12 }}
        background={boardImage}
        gridDimensions={gridDimensions}
        pieces={pieces}
        piecePadding={10}
        selectedPiece={selectedPiece}
        availableMoves={availableMoves}
        onSpacePressed={onSpacePressed as any}
      />
      <HandComponent
        style={{ flex: 2 }}
        owner="bottom"
        pieces={hands.bottom}
        enabled={currentPlayer == "bottom"}
        selectedPiece={currentPlayer == "bottom" ? selectedHandPiece : null}
        onPieceSelected={onHandPieceSelected}
      />
      {isGameOver ? gameOverView() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    justifyContent: "space-around",
    // alignContent: "space-around",
    backgroundColor: "#000000",
  },
});
