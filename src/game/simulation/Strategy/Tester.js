import { DECISION, MOVE } from "../constants";
import Strategy from "./Strategy";

export default class Tester extends Strategy {
  static name = "Tester";

  constructor(testInterval = 5, exploitChance = 0.5) {
    super();
    this.testInterval = testInterval; // Раз в сколько ходов делать тест-предательство
    this.exploitChance = exploitChance; // Если нашли добряка, шанс его эксплуатировать
    this.hasTested = new Set(); // Запоминаем, кого уже тестировали
  }

  makeMove(personId) {
    if (
      !this.interactions[personId] ||
      this.interactions[personId].length === 0
    ) {
      return DECISION.cooperate; // Начинаем с кооперации
    }

    const interactionCount = this.interactions[personId].length;
    const lastMove =
      this.interactions[personId][interactionCount - 1][MOVE.his];

    // Если ещё не тестировали этого противника — тестируем (предаём) на testInterval шаге
    if (
      !this.hasTested.has(personId) &&
      interactionCount % this.testInterval === 0
    ) {
      this.hasTested.add(personId);
      return DECISION.defect;
    }

    // Если противник после теста продолжил сотрудничать — можно иногда его эксплуатировать
    if (this.hasTested.has(personId) && lastMove === DECISION.cooperate) {
      return Math.random() < this.exploitChance
        ? DECISION.defect
        : DECISION.cooperate;
    }

    return lastMove; // В остальных случаях зеркалим последний ход
  }
}
