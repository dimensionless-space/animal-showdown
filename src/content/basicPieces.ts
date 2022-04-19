import { PieceInvariants } from "../core/piece";
import { PieceSet } from "./pieceSet";

const outerColor = "#F6BA7B";

export const basicPieceSet: PieceSet = {
  chicken: {
    baseForm: {
      imageSource: require("animal-showdown/assets/chick.png"),
      innerColor: "#ABB463",
      outerColor,
      moveSet: [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
    },
    promotedForm: {
      imageSource: require("animal-showdown/assets/hen.png"),
      innerColor: "#4C994C",
      outerColor,
      moveSet: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ],
    },
  },
  giraffe: {
    baseForm: {
      imageSource: require("animal-showdown/assets/giraffe.png"),
      innerColor: "#A5A3E8",
      outerColor,
      moveSet: [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ],
    },
  },
  elephant: {
    baseForm: {
      imageSource: require("animal-showdown/assets/elephant.png"),
      innerColor: "#9F6FB6",
      outerColor,
      moveSet: [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
      ],
    },
  },
  lion: {
    baseForm: {
      imageSource: require("animal-showdown/assets/lion.png"),
      innerColor: "#DEBED4",
      outerColor,
      moveSet: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ],
    },
  },
};

export const gtt: PieceInvariants = {
  baseType: "giraffe",
  startingOwner: "top",
};

export const ltt: PieceInvariants = {
  baseType: "lion",
  startingOwner: "top",
};

export const ett: PieceInvariants = {
  baseType: "elephant",
  startingOwner: "top",
};

export const ctt: PieceInvariants = {
  baseType: "chicken",
  startingOwner: "top",
};

export const cbb: PieceInvariants = {
  baseType: "chicken",
  startingOwner: "bottom",
};

export const ebb: PieceInvariants = {
  baseType: "elephant",
  startingOwner: "bottom",
};

export const lbb: PieceInvariants = {
  baseType: "lion",
  startingOwner: "bottom",
};

export const gbb: PieceInvariants = {
  baseType: "giraffe",
  startingOwner: "bottom",
};
