import { act, RenderAPI } from "@testing-library/react-native";
import _ from "lodash";
import { ActivePieceType } from "../../core/activePiece";
import { BasePieceType } from "../../core/basePieceType";
import { PlayerSeat } from "../../core/playerSeat";
import BoardPieceComponent from "../components/BoardPieceComponent";
import BoardSpaceComponent from "../components/BoardSpaceComponent";
import HandComponent from "../components/HandComponent";
import HandPieceComponent from "../components/HandPieceComponent";
import { BoardSpaceName } from "../util/boardSpaceName";

export class TestGame {
  constructor(public renderAPI: RenderAPI) {}

  get container() {
    return this.renderAPI.container;
  }

  get spaces() {
    return this.container.findAllByType(BoardSpaceComponent);
  }

  get boardPieces() {
    return this.container.findAllByType(BoardPieceComponent);
  }

  get hands() {
    return this.container.findAllByType(HandComponent);
  }

  handPieces(owner: PlayerSeat) {
    return this.findHand(owner)?.findAllByType(HandPieceComponent);
  }

  findSpace(spaceName: BoardSpaceName) {
    return _.find(this.spaces, (s) => s.props.spaceName == spaceName)!;
  }

  findBoardPieces({
    type,
    owner,
  }: {
    type: ActivePieceType;
    owner: PlayerSeat;
  }) {
    return _.filter(
      this.boardPieces,
      (p) => p.props.type == type && p.props.owner == owner
    );
  }

  findBoardPiece({
    type,
    owner,
  }: {
    type: ActivePieceType;
    owner: PlayerSeat;
  }) {
    const piece = this.findBoardPieces({ type, owner })[0];
    if (piece == null) {
      throw new Error(
        `failed to find board piece: type=${type} owner=${owner}`
      );
    }
    return piece;
  }

  findHand(owner: PlayerSeat) {
    return _.find(this.hands, (h) => h.props.owner == owner);
  }

  findHandPieces({ type, owner }: { type: BasePieceType; owner: PlayerSeat }) {
    return _.filter(
      this.handPieces(owner),
      (p) => p.props.piece.baseType == type
    );
  }

  findHandPiece({ type, owner }: { type: BasePieceType; owner: PlayerSeat }) {
    const piece = this.findHandPieces({ type, owner })[0];
    if (piece == null) {
      throw new Error(`failed to find hand piece: type=${type} owner=${owner}`);
    }
    return piece;
  }

  pressSpace(spaceName: BoardSpaceName) {
    act(() => {
      this.findSpace(spaceName).props.onPress();
    });
  }

  pressHandPiece({ type, owner }: { type: BasePieceType; owner: PlayerSeat }) {
    const piece = this.findHandPiece({ type, owner });
    act(() => {
      piece.props.onPress();
    });
  }
}
