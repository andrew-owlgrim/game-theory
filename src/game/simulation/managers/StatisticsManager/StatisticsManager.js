import { GameManager } from "../../../gameEngine";

export default class StatisticsManager extends GameManager {
  constructor(game) {
    super(game);
    this.strategies = {}; // { strategyName: { count, totalScore, averageScore } }
  }

  update() {
    this.updateStrategies();
  }

  // Stretegies

  updateStrategies() {
    this.strategies = {};

    const persons = this.game.managers.personManager.persons;

    persons.forEach((person) => {
      const strategyName = person.strategy.name;

      if (!this.strategies[strategyName]) {
        this.strategies[strategyName] = {
          count: 0,
          totalScore: 0,
          averageScore: 0,
        };
      }

      const stats = this.strategies[strategyName];
      stats.count += 1;
      stats.totalScore += person.score;
    });

    for (const name in this.strategies) {
      const stats = this.strategies[name];
      stats.averageScore = stats.count > 0 ? stats.totalScore / stats.count : 0;
    }
  }

  getStrategyEffectiveness() {
    this.updateStrategies();
    return Object.fromEntries(
      Object.entries(this.strategies).map(([name, stats]) => [
        name,
        stats.averageScore,
      ])
    );
  }
}
