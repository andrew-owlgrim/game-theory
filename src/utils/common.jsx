import React from "react";

// Random

export function random(amount) {
  return Math.floor(Math.random() * amount);
}

export function randomWeightedItem(items, weights) {
  const entries = Object.entries(weights);
  const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const [key, weight] of entries) {
    cumulativeWeight += weight;
    if (random < cumulativeWeight) {
      return items[key];
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

// Object Map

export const objectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

// Wrap Text Nodes

export function wrapTextNodes(children) {
  return React.Children.map(children, (child) =>
    typeof child === "string" ? (
      <span className="wrapped-text">{child}</span>
    ) : (
      child
    )
  );
}

export function wrapText(value) {
  if (typeof value === "string")
    return <span className="wrapped-text">{value}</span>;
  else return value;
}

// Alphabet base

const ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-.";

export function toAlphabetString(num) {
  if (num === 0) return ALPHABET[0];

  let result = "";
  const base = ALPHABET.length;

  while (num > 0) {
    result = ALPHABET[num % base] + result;
    num = Math.floor(num / base);
  }

  return result;
}
