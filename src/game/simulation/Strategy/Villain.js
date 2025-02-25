import { DECISION } from "../constants";
import Strategy from "./Strategy";

export default class TitForTat extends Strategy {
  constructor() {
    super(); //👍
    this.name = "villain";
  }

  makeMove(personId) {
    return DECISION.deceive;
  }
}
