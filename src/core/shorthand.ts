import { Split } from "type-fest";
import { ActivePieceType, activePieceTypeToBaseType } from "./activePiece";
import { Board, BoardPiece } from "./board";
import { Grid4x3 } from "../util/grid";
import {
  mapGrid4x3,
  NotionalDropMoveType,
  NotionalMoveType,
} from "./notionalBoardMoves";
import { PlayerSeat } from "./playerSeat";

export type ShorthandBoardPieceType = Capitalize<Split<ActivePieceType, "">[0]>;
export type ShorthandPlayerSeat = Capitalize<Split<PlayerSeat, "">[0]>;
export type ShorthandBoardPiece =
  | `${ShorthandBoardPieceType}${ShorthandPlayerSeat}${ShorthandPlayerSeat}`
  | "---";
export type ShorthandBoard = Grid4x3<ShorthandBoardPiece>;

const activePieceTypesByShorthand: {
  [shorthand in ShorthandBoardPieceType]: ActivePieceType;
} = {
  C: "chick",
  E: "elephant",
  G: "giraffe",
  H: "hen",
  L: "lion",
};

export function activePieceTypeFromShorthand(
  shorthand: ShorthandBoardPieceType
) {
  const pieceType = activePieceTypesByShorthand[shorthand];
  if (pieceType === undefined) {
    throw new Error(`invalid shorthand piece type: ${shorthand}`);
  }
  return pieceType;
}

const playerSeatsByShorthand = {
  T: "top",
  B: "bottom",
} as { [shorthand in ShorthandPlayerSeat]: PlayerSeat };

export function playerSeatFromShorthand(shorthand: ShorthandPlayerSeat) {
  const playerSeat = playerSeatsByShorthand[shorthand];
  if (playerSeat === undefined) {
    throw new Error(`invalid shorthand player seat: ${shorthand}`);
  }
  return playerSeat;
}

export function boardPieceFromShorthand(
  shorthand: ShorthandBoardPiece
): BoardPiece | null {
  if (shorthand == "---") {
    return null;
  }

  const [shorthandPieceType, shorthandCurrentOwner, shorthandStartingOwner] =
    shorthand as unknown as [
      ShorthandBoardPieceType,
      ShorthandPlayerSeat,
      ShorthandPlayerSeat
    ];

  const activePieceType = activePieceTypeFromShorthand(shorthandPieceType);
  const { baseType, isPromoted } = activePieceTypeToBaseType(activePieceType);
  const currentOwner = playerSeatFromShorthand(shorthandCurrentOwner);
  const startingOwner = playerSeatFromShorthand(shorthandStartingOwner);

  return { baseType, isPromoted, currentOwner, startingOwner };
}

export function boardFromShorthand(shorthand: ShorthandBoard): Board {
  return mapGrid4x3(shorthand, boardPieceFromShorthand);
}

// export function shorthandBoardPiece(
//   boardPiece: BoardPiece
// ): ShorthandBoardPiece {
//   if (boardPiece == null) {
//     return "---";
//   }

//   const [shorthandPieceType, shorthandCurrentOwner, shorthandStartingOwner] =
//     shorthand as unknown as [
//       ShorthandBoardPieceType,
//       ShorthandPlayerSeat,
//       ShorthandPlayerSeat
//     ];

//   const activePieceType = activePieceTypeFromShorthand(shorthandPieceType);
//   const { baseType, isPromoted } = activePieceTypeToBaseType(activePieceType);
//   const currentOwner = playerSeatFromShorthand(shorthandCurrentOwner);
//   const startingOwner = playerSeatFromShorthand(shorthandStartingOwner);

//   return { baseType, isPromoted, currentOwner, startingOwner };
// }

export type ShorthandNotionalMoveType = Split<NotionalMoveType, "">[0];
export type ShorthandNotionalDropMoveType = Split<NotionalDropMoveType, "">[0];

const notionalMoveTypesByShorthand = {
  A: "Available",
  B: "Blocked",
  C: "Capture",
  L: "Lose",
  O: "Origin",
  P: "Promote",
  U: "Unreachable",
  W: "Win",
} as { [shorthand in ShorthandNotionalMoveType]: NotionalMoveType };

export function notionalMoveTypeFromShorthand(
  shorthand: ShorthandNotionalMoveType
) {
  const moveType = notionalMoveTypesByShorthand[shorthand];
  if (moveType === undefined) {
    throw new Error(`invalid shorthand for notional move type: ${shorthand}`);
  }
  return moveType;
}

export function notionalMovesFromShorthand(
  shorthand: Grid4x3<ShorthandNotionalMoveType>
) {
  return mapGrid4x3(shorthand, notionalMoveTypeFromShorthand);
}

export type ShorthandMoves = Grid4x3<ShorthandNotionalMoveType>;
export type ShorthandDropMoves = Grid4x3<ShorthandNotionalDropMoveType>;

const shorthandMoveTypesByFullName = {
  Available: "A",
  Blocked: "B",
  Capture: "C",
  Lose: "L",
  Origin: "O",
  Promote: "P",
  Unreachable: "U",
  Win: "W",
} as { [moveType in NotionalMoveType]: ShorthandNotionalMoveType };

export function shorthandMove(move: NotionalMoveType) {
  const shorthand = shorthandMoveTypesByFullName[move];
  if (shorthand === undefined) {
    throw new Error(`invalid notional move type: ${move}`);
  }
  return shorthand;
}

export function shorthandMoves(moves: Grid4x3<NotionalMoveType>) {
  return mapGrid4x3(moves, shorthandMove);
}

export const shorthandDropMoves = shorthandMoves as (
  moves: Grid4x3<NotionalDropMoveType>
) => Grid4x3<ShorthandNotionalDropMoveType>;

export const gtt: BoardPiece = {
  baseType: "giraffe",
  startingOwner: "top",
  isPromoted: false,
  currentOwner: "top",
};

export const gtb: BoardPiece = {
  baseType: "giraffe",
  startingOwner: "top",
  isPromoted: false,
  currentOwner: "bottom",
};

export const ltt: BoardPiece = {
  baseType: "lion",
  startingOwner: "top",
  isPromoted: false,
  currentOwner: "top",
};

export const ltb: BoardPiece = {
  baseType: "lion",
  startingOwner: "top",
  isPromoted: false,
  currentOwner: "bottom",
};

export const ett: BoardPiece = {
  baseType: "elephant",
  startingOwner: "top",
  isPromoted: false,
  currentOwner: "top",
};

export const etb: BoardPiece = {
  baseType: "elephant",
  startingOwner: "top",
  isPromoted: false,
  currentOwner: "bottom",
};

export const ctt: BoardPiece = {
  baseType: "chicken",
  startingOwner: "top",
  isPromoted: false,
  currentOwner: "top",
};

export const ctb: BoardPiece = {
  baseType: "chicken",
  startingOwner: "top",
  isPromoted: false,
  currentOwner: "bottom",
};

export const cbb: BoardPiece = {
  baseType: "chicken",
  startingOwner: "bottom",
  isPromoted: false,
  currentOwner: "bottom",
};

export const cbt: BoardPiece = {
  baseType: "chicken",
  startingOwner: "bottom",
  isPromoted: false,
  currentOwner: "top",
};

export const ebb: BoardPiece = {
  baseType: "elephant",
  startingOwner: "bottom",
  isPromoted: false,
  currentOwner: "bottom",
};

export const ebt: BoardPiece = {
  baseType: "elephant",
  startingOwner: "bottom",
  isPromoted: false,
  currentOwner: "top",
};

export const lbb: BoardPiece = {
  baseType: "lion",
  startingOwner: "bottom",
  isPromoted: false,
  currentOwner: "bottom",
};

export const lbt: BoardPiece = {
  baseType: "lion",
  startingOwner: "bottom",
  isPromoted: false,
  currentOwner: "top",
};

export const gbb: BoardPiece = {
  baseType: "giraffe",
  startingOwner: "bottom",
  isPromoted: false,
  currentOwner: "bottom",
};

export const gbt: BoardPiece = {
  baseType: "giraffe",
  startingOwner: "bottom",
  isPromoted: false,
  currentOwner: "top",
};

export const htt: BoardPiece = {
  baseType: "chicken",
  startingOwner: "top",
  isPromoted: true,
  currentOwner: "top",
};

export const htb: BoardPiece = {
  baseType: "chicken",
  startingOwner: "top",
  isPromoted: true,
  currentOwner: "bottom",
};

export const hbb: BoardPiece = {
  baseType: "chicken",
  startingOwner: "bottom",
  isPromoted: true,
  currentOwner: "bottom",
};

export const hbt: BoardPiece = {
  baseType: "chicken",
  startingOwner: "bottom",
  isPromoted: true,
  currentOwner: "top",
};
