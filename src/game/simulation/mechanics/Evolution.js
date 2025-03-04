import { Events } from "matter-js";
import { GameMechanic } from "../../gameEngine";
import { objectMap } from "@/utils/jsUtils";

export default class Evolution extends GameMechanic {
  constructor(game, enabled = true) {
    super(game, enabled);

    this.recentDeltas = [];
    this.lastAverage = {};
    this.smoothing = game.cfg.evolutionSmoothing;

    this.clear = this.init();
  }

  // Lifecycle

  init() {
    const bindedRecalculateWeights = this.recalculateWeights.bind(this);

    Events.on(this.game, "newDay", bindedRecalculateWeights);

    return () => {
      Events.off(this.game, "newDay", bindedRecalculateWeights);
    };
  }

  off() {
    super.off();
    personManager.setStrategyWeights(this.game.cfg.setStrategyWeights);
  }

  apply() {}

  // Logic

  recalculateWeights() {
    if (!this.enabled) return;

    const personManager = this.game.managers.personManager;
    const minWeight = this.game.cfg.evolutionMinWeight;
    const maxWeight = this.game.cfg.evolutionMaxWeight;
    const factor = this.game.cfg.evolutionFactor;

    // Gather information
    const strategiesInfo = {};
    personManager.persons.forEach((person) => {
      const strategy = person.strategy.name;
      if (!strategiesInfo[strategy])
        strategiesInfo[strategy] = {
          count: 0,
          totalScore: 0,
        };
      strategiesInfo[strategy].count++;
      strategiesInfo[strategy].totalScore += person.score;
    });

    const averageScore = objectMap(
      strategiesInfo,
      (info) => info.totalScore / info.count
    );

    // Calculate delta
    const deltaScore = objectMap(averageScore, (score, strategy) => {
      return score - this.lastAverage[strategy] || 0;
    });

    this.lastAverage = averageScore;
    this.recentDeltas.push(deltaScore);
    if (this.recentDeltas.length > this.smoothing) this.recentDeltas.shift();

    // Get recent delta average
    const recentDeltasAverage = {};
    for (let deltas of this.recentDeltas) {
      for (const strategy in deltas) {
        if (!recentDeltasAverage[strategy]) recentDeltasAverage[strategy] = 0;
        recentDeltasAverage[strategy] += deltas[strategy];
      }
    }
    for (const strategy in recentDeltasAverage) {
      recentDeltasAverage[strategy] /= this.recentDeltas.length;
    }

    // Deltas sum to zero
    const zeroSumDeltas = scoresToZeroSum(recentDeltasAverage);

    // Weights correction
    const newWeights = { ...personManager.strategyWeights };

    for (const strategy in zeroSumDeltas) {
      if (!newWeights[strategy]) {
        newWeights[strategy] = minWeight;
      }
      newWeights[strategy] += (factor * zeroSumDeltas[strategy]) / 100;
    }

    // Scale weights to fit range between min and max Values
    const scaledWeights = scaleWeightsToFitRange(
      newWeights,
      minWeight,
      maxWeight
    );

    // Set new Weights

    // console.log(
    //   "average score:",
    //   averageScore,
    //   "delta score:",
    //   deltaScore,
    //   "delta average",
    //   recentDeltasAverage,
    //   "zero sum",
    //   zeroSumDeltas,
    //   "new weights",
    //   newWeights,
    //   "scaled weights",
    //   scaledWeights
    // );
    personManager.setStrategyWeights(scaledWeights);
  }
}

function scaleWeightsToFitRange(weights, minWeight, maxWeight) {
  const entries = Object.entries(weights);
  if (entries.length === 0) return {}; // Проверка на пустой объект

  const values = entries.map(([, v]) => v);
  const minActual = Math.min(...values, minWeight);
  const maxActual = Math.max(...values, maxWeight);

  if (minActual >= minWeight && maxActual <= maxWeight) {
    return { ...weights }; // Уже в пределах, ничего не меняем
  }

  return Object.fromEntries(
    entries.map(([key, value]) => [
      key,
      ((value - minActual) / (maxActual - minActual)) *
        (maxWeight - minWeight) +
        minWeight,
    ])
  );
}

function scoresToZeroSum(scores) {
  const entries = Object.entries(scores);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);

  if (entries.length === 0 || total === 0) return scores;

  return Object.fromEntries(
    entries.map(([key, value]) => [key, value - total / entries.length])
  );
}
