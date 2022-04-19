import _ from "lodash";
import { PieceMoveSet } from "../../core/pieceMoveSet";
import { GridN } from "../../util/grid";

export type PieceMoveSummary = GridN<"step" | "range" | "jump" | null, 3, 3>;

export default function usePieceMoveSummary(
  moveSet: PieceMoveSet
): PieceMoveSummary {
  return _.range(1, 4).map((r) => {
    return _.range(1, 4).map((c) => {
      switch (moveSet[r][c]) {
        case 0:
          return null;
        case 1:
          return "step";
        case 2:
          return "range";
        default:
          throw new Error(`invalid move set value: ${moveSet[r][c]}`);
      }
    });
  }) as PieceMoveSummary;
}
