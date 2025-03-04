import { randomItem, randomWeight } from "@/utils/mathUtils";
import { objectMap } from "@/utils/jsUtils";
import * as strategiesModule from "../../Strategy";
const strategies = Object.fromEntries(
  Object.entries(strategiesModule).map(([, v]) => [v.name, v])
);

//

export function getRandomStrategy() {
  return new (randomItem(Object.values(strategies)))();
}

//

export function getDistributedStrategy(strategyWeights, persons) {
  const currentCounts = objectMap(strategyWeights, () => 0);

  for (const person of persons) {
    currentCounts[person.strategy.name] += 1;
  }

  let minRatio = Infinity;
  let underRepresented = [];

  for (const name in strategyWeights) {
    if (strategyWeights[name] > 0) {
      const ratio = currentCounts[name] / strategyWeights[name];

      if (ratio < minRatio) {
        minRatio = ratio;
        underRepresented = [name];
      } else if (ratio === minRatio) {
        underRepresented.push(name);
      }
    }
  }

  const newWeights = Object.fromEntries(
    underRepresented.map((name) => [name, strategyWeights[name]])
  );

  console.log(currentCounts, underRepresented);
  return new strategies[randomWeight(newWeights)]();
}

//

export function getPseudoRandomStrategy(
  strategyWeights,
  persons,
  determinism = 0.5
) {
  const totalPopulation = persons.length;
  const totalWeight = Object.values(strategyWeights).reduce(
    (sum, w) => sum + w,
    0
  );

  // 1. Рассчитываем целевое количество персонажей по весам
  const targetCounts = objectMap(
    strategyWeights,
    (weight) => ((totalPopulation + 1) * weight) / totalWeight
  );

  // 2. Фактическое количество персонажей
  const actualCounts = objectMap(strategyWeights, () => 0);
  for (const person of persons) {
    actualCounts[person.strategy.name] += 1;
  }

  // 3. Вычисляем дефициты
  const deficits = objectMap(
    strategyWeights,
    (weight, name) => targetCounts[name] - (actualCounts[name] || 0)
  );

  // 4. Вычисляем softmax-вероятности на основе дефицитов (температура фиксирована)
  const T = 0.1;
  const expValues = objectMap(deficits, (deficit) =>
    deficit <= 0 ? 0 : Math.exp(deficit / T)
  );
  const sumExp = Object.values(expValues).reduce((sum, val) => sum + val, 0);
  const softmaxWeights = objectMap(expValues, (value) => value / sumExp);

  // 5. Нормализуем `strategyWeights`
  const normalizedStrategyWeights = objectMap(
    strategyWeights,
    (value) => value / totalWeight
  );

  // 6. Интерполируем нормализованные веса и softmaxWeights
  const interpolatedWeights = objectMap(
    strategyWeights,
    (weight, name) =>
      determinism * softmaxWeights[name] +
      (1 - determinism) * normalizedStrategyWeights[name]
  );

  // 7. Выбираем стратегию с учетом интерполированных весов
  const strategyName = randomWeight(interpolatedWeights);
  // console.log(actualCounts, interpolatedWeights, strategyName);
  return new strategies[strategyName]();
}
