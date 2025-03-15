import { DECISION, MOVE } from "../constants";
import Strategy from "./Strategy";

export default class Grudger extends Strategy {
  static name = "grudger";

  constructor() {
    super();
    this.blacklist = new Set();
  }

  makeMove(personId) {
    if (this.blacklist.has(personId)) {
      return DECISION.defect; // Если в чёрном списке, больше не сотрудничаем
    }

    if (
      !this.interactions[personId] ||
      this.interactions[personId].length === 0
    ) {
      return DECISION.cooperate; // Начинаем с кооперации
    }

    // Берём последние 3 взаимодействия
    const lastThreeMoves = this.interactions[personId]
      .slice(-3)
      .map((interaction) => interaction[MOVE.his]);

    // Если предательств 2 или больше — добавляем в чёрный список
    const defectCount = lastThreeMoves.filter(
      (move) => move === DECISION.defect
    ).length;
    if (defectCount >= 2) {
      this.blacklist.add(personId);
      return DECISION.defect;
    }

    return DECISION.cooperate;
  }
}
