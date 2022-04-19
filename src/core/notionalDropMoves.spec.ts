import { notionalDropMoves } from "./notionalDropMoves";
import {
  boardFromShorthand,
  ShorthandDropMoves,
  shorthandDropMoves,
} from "./shorthand";

describe(notionalDropMoves.name, () => {
  it("calculates drops from the opening chicken move from bottom player", () => {
    const board = boardFromShorthand([
      ["GTT", "LTT", "ETT"],
      ["---", "CBB", "---"],
      ["---", "---", "---"],
      ["GBB", "LBB", "EBB"],
    ]);
    const expectedMoves = [
      ["B", "B", "B"],
      ["A", "B", "A"],
      ["A", "A", "A"],
      ["B", "B", "B"],
    ] as ShorthandDropMoves;

    const actualMoves = notionalDropMoves({
      board,
    });

    expect(shorthandDropMoves(actualMoves)).toStrictEqual(expectedMoves);
  });

  // it("calculates the opening chicken move from top player", () => {
  //   const board = boardFromShorthand([
  //     ["GTT", "LTT", "ETT"],
  //     ["---", "CTT", "---"],
  //     ["---", "CBB", "---"],
  //     ["GBB", "LBB", "EBB"],
  //   ]);
  //   const space = "B2";
  //   const expectedMoves = [
  //     ["U", "U", "U"],
  //     ["U", "O", "U"],
  //     ["U", "C", "U"],
  //     ["U", "U", "U"],
  //   ] as ShorthandMoves;

  //   const actualMoves = notionalBoardMovesForPieceAtSpace({ board, space });

  //   expect(shorthandMoves(actualMoves)).toStrictEqual(expectedMoves);
  // });

  // it("calculates the opening giraffe move from top player", () => {
  //   const board = boardFromShorthand([
  //     ["GTT", "LTT", "ETT"],
  //     ["---", "CTT", "---"],
  //     ["---", "CBB", "---"],
  //     ["GBB", "LBB", "EBB"],
  //   ]);
  //   const space = "A1";
  //   const expectedMoves = [
  //     ["O", "B", "U"],
  //     ["A", "U", "U"],
  //     ["U", "U", "U"],
  //     ["U", "U", "U"],
  //   ] as ShorthandMoves;

  //   const actualMoves = notionalBoardMovesForPieceAtSpace({ board, space });

  //   expect(shorthandMoves(actualMoves)).toStrictEqual(expectedMoves);
  // });

  // it("calculates an elephant move from bottom player", () => {
  //   const board = boardFromShorthand([
  //     ["---", "---", "---"],
  //     ["---", "LTT", "---"],
  //     ["---", "---", "EBB"],
  //     ["---", "LBB", "---"],
  //   ]);
  //   const space = "C3";
  //   const expectedMoves = [
  //     ["U", "U", "U"],
  //     ["U", "C", "U"],
  //     ["U", "U", "O"],
  //     ["U", "B", "U"],
  //   ] as ShorthandMoves;

  //   const actualMoves = notionalBoardMovesForPieceAtSpace({ board, space });

  //   expect(shorthandMoves(actualMoves)).toStrictEqual(expectedMoves);
  // });

  // it("calculates a chick promotion from bottom player", () => {
  //   const board = boardFromShorthand([
  //     ["---", "---", "---"],
  //     ["---", "LTT", "CBB"],
  //     ["---", "---", "EBB"],
  //     ["---", "LBB", "---"],
  //   ]);
  //   const space = "C2";
  //   const expectedMoves = [
  //     ["U", "U", "P"],
  //     ["U", "U", "O"],
  //     ["U", "U", "U"],
  //     ["U", "U", "U"],
  //   ] as ShorthandMoves;

  //   const actualMoves = notionalBoardMovesForPieceAtSpace({ board, space });

  //   expect(shorthandMoves(actualMoves)).toStrictEqual(expectedMoves);
  // });

  // // it("calculates a lion escape win from bottom player", () => {
  // //   const board = boardFromShorthand([
  // //     ["LTT", "CTT", "---"],
  // //     ["---", "---", "LBB"],
  // //     ["---", "---", "---"],
  // //     ["---", "---", "---"],
  // //   ]);
  // //   const space = "C2";
  // //   const expectedMoves = [
  // //     ["U", "C", "W"],
  // //     ["U", "A", "O"],
  // //     ["U", "A", "A"],
  // //     ["U", "U", "U"],
  // //   ] as ShorthandMoves;

  // //   const actualMoves = notionalBoardMovesForPieceAtSpace({ board, space });

  // //   expect(shorthandMoves(actualMoves)).toStrictEqual(expectedMoves);
  // // });
});
