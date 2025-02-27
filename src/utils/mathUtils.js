// Random

export function random(amount) {
  return Math.floor(Math.random() * amount);
}

export function randomWeight(weights) {
  const entries = Object.entries(weights);
  const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const key in weights) {
    cumulativeWeight += weights[key];
    if (random < cumulativeWeight) {
      return key;
    }
  }
}

export function randomItemByWeights(itemsObj, weightsObj) {
  const entries = Object.entries(weightsObj);
  const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const [key, weight] of entries) {
    cumulativeWeight += weight;
    if (random < cumulativeWeight) {
      return itemsObj[key];
    }
  }
}

export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Angle

export function degreeToRad(degree) {
  return (degree * Math.PI) / 180;
}
