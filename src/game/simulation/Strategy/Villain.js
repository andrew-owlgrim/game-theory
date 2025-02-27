import { DECISION } from "../constants";
import Strategy from "./Strategy";

export default class TitForTat extends Strategy {
  static name = "villain";

  constructor() {
    super(); //👍
  }

  makeMove(personId) {
    return DECISION.deceive;
  }
}
