import { useMemo } from "react";
import usePieceSet from "./usePieceSet";

export default function usePieceForm(pieceType: string, isPromoted: boolean) {
  const pieceSet = usePieceSet();
  return useMemo(() => {
    const pieceForms = pieceSet[pieceType];
    if (pieceForms == null) {
      throw new Error(`no such piece type: ${pieceType}`);
    }
    if (isPromoted) {
      if (pieceForms.promotedForm == null) {
        throw new Error(`piece type ${pieceType} has no promoted form`);
      }
      return pieceForms.promotedForm;
    }
    return pieceForms.baseForm;
  }, [pieceSet, pieceType, isPromoted]);
}
