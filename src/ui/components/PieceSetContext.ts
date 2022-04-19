import { createContext } from "react";
import PieceSet from "../util/pieceSet";

export const PieceSetContext = createContext(new PieceSet());
