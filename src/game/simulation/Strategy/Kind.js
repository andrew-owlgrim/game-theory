import { DECISION } from "../constants";
import Strategy from "./Strategy";

export default class Kind extends Strategy {
  constructor() {
    super(); //👍
    this.name = "kind";
  }

  makeMove(personId) {
    return DECISION.cooperate;
  }
}
