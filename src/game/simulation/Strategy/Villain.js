import { DECISION } from "../constants";
import Strategy from "./Strategy";

export default class Villain extends Strategy {
  static name = "villain";

  constructor() {
    super(); //👍
  }

  makeMove(personId) {
    return DECISION.deceive;
  }
}
