import { DECISION } from "../constants";
import Strategy from "./Strategy";

export default class Kind extends Strategy {
  static name = "kind";

  constructor() {
    super(); //👍
  }

  makeMove(personId) {
    return DECISION.cooperate;
  }
}
