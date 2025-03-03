function scaleWeights(weights, minWeight, maxWeight) {
  const minActual = Math.min(...weights, minWeight);
  const maxActual = Math.max(...weights, maxWeight);

  if (minActual >= minWeight && maxActual <= maxWeight) {
    return weights; // Уже в пределах, ничего не делаем
  }

  return weights.map(
    (w) =>
      ((w - minActual) / (maxActual - minActual)) * (maxWeight - minWeight) +
      minWeight
  );
}

// Пример использования:
const weights = [0, 0.25, 0.5, 0.8]; // 1.2 выходит за пределы
const normalizedWeights = normalizeWeights(weights, 0.1, 0.9);
console.log(normalizedWeights);
