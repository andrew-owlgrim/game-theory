import { DECISION, MOVE } from "../constants";
import Strategy from "./Strategy";

export default class TitForTwoTats extends Strategy {
  static name = "titForTwoTats";

  constructor() {
    super();
  }

  makeMove(personId) {
    if (
      !this.interactions[personId] ||
      this.interactions[personId].length < 2
    ) {
      return DECISION.cooperate; // Начинаем с кооперации
    }

    const lastTwoMoves = this.interactions[personId]
      .slice(-2)
      .map((interaction) => interaction[MOVE.his]);

    if (lastTwoMoves.every((move) => move === DECISION.defect)) {
      return DECISION.defect; // Если дважды подряд предали, мстим
    }

    return DECISION.cooperate; // Иначе сотрудничаем
  }
}
