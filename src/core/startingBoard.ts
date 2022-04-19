import { Board } from "./board";
import { cbb, ctt, ebb, ett, gbb, gtt, lbb, ltt } from "./shorthand";

export const startingBoard: Board = [
  [gtt, ltt, ett],
  [null, ctt, null],
  [null, cbb, null],
  [ebb, lbb, gbb],
];
