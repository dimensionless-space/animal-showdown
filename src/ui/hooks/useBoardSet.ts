import { useContext } from "react";
import { BoardSetContext } from "../../content/boardSetContext";

export default function useBoardSet() {
  return useContext(BoardSetContext);
}
