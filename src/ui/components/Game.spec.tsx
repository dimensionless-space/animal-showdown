import Game from "./Game";
import { testRender } from "../testUtil/testRender";
import { TestGame } from "../testUtil/TestGame";
import { act } from "@testing-library/react-native";

let game: TestGame;

describe(Game.name, () => {
  beforeEach(() => {
    game = new TestGame(testRender(<Game />));
  });

  it("allows bottom player to select their giraffe", () => {
    game.pressSpace("A4");
    expect(game.findSpace("A4").props.isSelected).toBe(true);
  });

  it("allows bottom player to move their giraffe", () => {
    game.pressSpace("C4");
    game.pressSpace("C3");

    const giraffe = game.findBoardPiece({
      type: "giraffe",
      owner: "bottom",
    });

    expect(giraffe.props.spaceName).toBe("C3");
  });

  it("allows bottom player to select and then deselect their giraffe", () => {
    game.pressSpace("C4");
    game.pressSpace("C4");

    expect(game.findSpace("C4").props.isSelected).toBe(false);
  });

  it("prevents bottom player from moving their giraffe into their lion", () => {
    game.pressSpace("C4");
    game.pressSpace("B4");

    const giraffe = game.findBoardPiece({
      type: "giraffe",
      owner: "bottom",
    });

    expect(giraffe.props.spaceName).toBe("C4");
  });

  it("adds captured pieces to the player's hand", () => {
    game.pressSpace("B3");
    game.pressSpace("B2");

    expect(game.handPieces("bottom")).toHaveLength(1);
  });

  it("allows bottom player to select a chicken in their hand", () => {
    // acquire chicken (yum!)
    game.pressSpace("B3");
    game.pressSpace("B2");

    // waste top player's turn
    game.pressSpace("A1");
    game.pressSpace("A2");

    // select newly-acquired chicken
    game.pressHandPiece({ type: "chicken", owner: "bottom" });

    const chicken = game.findHandPiece({ type: "chicken", owner: "bottom" });

    expect(chicken.props.isSelected).toBe(true);
  });

  it("allows bottom player to select and then deselect a chicken in their hand", () => {
    game.pressSpace("B3");
    game.pressSpace("B2");
    game.pressHandPiece({ type: "chicken", owner: "bottom" });
    game.pressHandPiece({ type: "chicken", owner: "bottom" });

    const chicken = game.findHandPiece({ type: "chicken", owner: "bottom" });

    expect(chicken.props.isSelected).toBe(false);
  });

  describe("on top player's turn", () => {
    beforeEach(() => {
      // bottom moves giraffe
      game.pressSpace("C4");
      game.pressSpace("C3");

      // top takes chick
      game.pressSpace("B2");
      game.pressSpace("B3");

      // bottom moves giraffe back again
      game.pressSpace("C3");
      game.pressSpace("C4");
    });

    it("allows top player to drop a chicken from their hand", () => {
      game.pressHandPiece({ type: "chicken", owner: "top" });
      game.pressSpace("A3");

      const chicks = game.findBoardPieces({ type: "chick", owner: "top" });

      expect(chicks).toHaveLength(2);
    });
  });

  it("forbids selecting hand pieces out-of-turn", () => {
    // bottom takes chick
    game.pressSpace("B3");
    game.pressSpace("B2");

    // top takes chick with elephant
    game.pressSpace("C1");
    game.pressSpace("B2");

    // top tries to select their chicken out-of-turn
    game.pressHandPiece({ type: "chicken", owner: "top" });

    const topChicken = game.findHandPiece({ type: "chicken", owner: "top" });
    const bottomChicken = game.findHandPiece({
      type: "chicken",
      owner: "bottom",
    });

    expect(topChicken.props.isSelected).toBe(false);
    expect(bottomChicken.props.isSelected).toBe(false);
  });
});
