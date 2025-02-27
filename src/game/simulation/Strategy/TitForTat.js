import { DECISION, MOVE } from "../constants";
import Strategy from "./Strategy";

export default class TitForTat extends Strategy {
  static name = "titForTat";

  constructor() {
    super(); //👍
  }

  makeMove(personId) {
    if (!this.interactions[personId]) return DECISION.cooperate;
    return this.interactions[personId][this.interactions[personId].length - 1][
      MOVE.his
    ];
  }
}
