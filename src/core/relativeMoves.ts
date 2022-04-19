import { Grid } from "../util/grid";
import { ActivePieceType } from "./activePiece";

export type RelativeMoveGrid = Grid<3, 3, 0 | 1>;

export const relativeMoveGridByActivePieceType: {
  [key in ActivePieceType]: RelativeMoveGrid;
} = {
  chick: [
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],

  elephant: [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
  ],

  giraffe: [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
  ],

  hen: [
    [1, 1, 1],
    [1, 0, 1],
    [0, 1, 0],
  ],

  lion: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
};
