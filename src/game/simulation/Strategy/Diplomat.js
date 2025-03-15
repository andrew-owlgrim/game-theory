import { DECISION, MOVE } from "../constants";
import Strategy from "./Strategy";

export default class Diplomat extends Strategy {
  static name = "diplomat";

  constructor({ betrayChance = 0.25 }) {
    super();
    this.betrayChance = betrayChance; // Шанс предательства
  }

  makeMove(personId) {
    const history = this.interactions[personId] || [];

    if (history.length === 0) return DECISION.cooperate; // Начинаем с кооперации

    const [lastMoveMy, lastMoveHis] = history[history.length - 1];

    // Сглаживаем конфликт
    if (history.length > 1) {
      const [preMoveMy, preMoveHis] = history[history.length - 2];
      if (preMoveMy === DECISION.defect && preMoveHis === DECISION.cooperate)
        return DECISION.cooperate;
    }

    // Иногда предаём ради выгоды
    if (
      lastMoveMy === DECISION.cooperate &&
      Math.random() < this.betrayChance
    ) {
      return DECISION.defect;
    }

    return lastMoveHis; // Обычное "Око за око"
  }
}
