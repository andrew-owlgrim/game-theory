import { DECISION, MOVE } from "../constants";
import Strategy from "./Strategy";

export default class ForgivingTFT extends Strategy {
  static name = "forgivingTFT";

  constructor({ forgivenessProbability = 0.25 } = {}) {
    super();
    this.forgivenessProbability = forgivenessProbability;
  }

  makeMove(personId) {
    const interactions = this.interactions[personId];

    if (!interactions || !interactions.length) return DECISION.cooperate;

    const lastInteraction = interactions[interactions.length - 1];

    if (lastInteraction[MOVE.his] === DECISION.deceive) {
      return Math.random() < this.forgivenessProbability
        ? DECISION.cooperate
        : DECISION.deceive;
    }

    return DECISION.cooperate;
  }
}
