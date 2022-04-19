import { ActivePiece } from "./activePiece";

const me = "bottom";
const opponent = "top";

export const startingPieces: ActivePiece[] = [
  {
    startingOwner: opponent,
    currentOwner: opponent,
    baseType: "giraffe",
    currentlyPromoted: false,
    currentLocation: "A1",
  },
  {
    startingOwner: opponent,
    currentOwner: opponent,
    baseType: "lion",
    currentlyPromoted: false,
    currentLocation: "B1",
  },
  {
    startingOwner: opponent,
    currentOwner: opponent,
    baseType: "elephant",
    currentlyPromoted: false,
    currentLocation: "C1",
  },
  {
    startingOwner: opponent,
    currentOwner: opponent,
    baseType: "chicken",
    currentlyPromoted: false,
    currentLocation: "B2",
  },
  {
    startingOwner: me,
    currentOwner: me,
    baseType: "chicken",
    currentlyPromoted: false,
    currentLocation: "B3",
  },
  {
    startingOwner: me,
    currentOwner: me,
    baseType: "elephant",
    currentlyPromoted: false,
    currentLocation: "A4",
  },
  {
    startingOwner: me,
    currentOwner: me,
    baseType: "lion",
    currentlyPromoted: false,
    currentLocation: "B4",
  },
  {
    startingOwner: me,
    currentOwner: me,
    baseType: "giraffe",
    currentlyPromoted: false,
    currentLocation: "C4",
  },
];
