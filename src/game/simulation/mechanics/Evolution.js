import { Events } from "matter-js";
import { GameMechanic } from "../../gameEngine";
import { objectMap } from "@/utils/jsUtils";

export default class Evolution extends GameMechanic {
  constructor(game, enabled = true) {
    super(game, enabled);

    this.bindedRecalculateWeights = this.recalculateWeights.bind(this);
  }

  init() {
    Events.on(this.game, "beforePersonSpawn", this.bindedRecalculateWeights);
  }

  clear() {
    Events.off(this.game, "beforePersonSpawn", this.bindedRecalculateWeights);
  }

  apply() {}

  recalculateWeights() {
    if (!this.enabled) return;

    const newWeights = getWeightsByRank(this.game);
    console.log(newWeights);
    this.game.managers.personManager.setStrategyWeights(newWeights);
  }

  off() {
    super.off();
    personManager.setStrategyWeights(this.game.cfg.setStrategyWeights);
  }
}

function getWeightsByRank(game) {
  const persons = game.managers.personManager.persons;
  persons.sort((a, b) => a.score - b.score);
  const carriers = {};
  const totalRank = {};
  persons.forEach((person, index) => {
    const strategy = person.strategy.name;
    if (!carriers[strategy]) carriers[strategy] = 0;
    carriers[strategy]++;
    if (!totalRank[strategy]) totalRank[strategy] = 0;
    totalRank[strategy] += index + 1;
  });
  const averageRank = objectMap(
    carriers,
    (count, strategy) => totalRank[strategy] / count
  );
  return averageRank;
}

function getWeightsByAverageScore(game) {
  const personManager = this.game.managers.personManager;
  const statisticsManager = this.game.managers.statisticsManager;
  const currentEffectiveness = statisticsManager.getStrategyEffectiveness();
  return currentEffectiveness;
}
