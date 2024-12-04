import { objectMap } from "./common.js";

// average
const avg = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

// binominal coefficient
const comb = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;

  let res = n;
  for (let i = 2; i <= k; i++) res *= (n - i + 1) / i;
  return Math.round(res);
};

// hypergeometric distribution
const hgd = (N, K, n, k) => {
  return (comb(K, k) * comb(N - K, n - k)) / comb(N, n);
};

// Artifact

class Artifact {
  /**
   * @param {*} main mainStat
   * @param {*} sub [total, useful, taken, taken useful]
   */
  constructor(main, sub) {
    this.main = main;
    this.sub = sub;
  }
}

// Artifacts

const artifacts = {
  feather: new Artifact(1, [9, 4, 4, 3]),
  flower: new Artifact(1, [9, 4, 4, 3]),
  watch: new Artifact(1 / 5, [9, 4, 4, 3]),
  goblet: new Artifact(1 / 12, [10, 5, 4, 3]),
  crown: new Artifact(1 / 7, [9, 4, 4, 3]),
};

const probOfFineArts = objectMap(artifacts, (v) => hgd(...v.sub) * v.main);

console.log("pobability of fine artifact");
Object.entries(probOfFineArts).forEach(([key, value]) =>
  console.log(key + ": " + value)
);

const avgProbOfFineArt = avg(Object.values(probOfFineArts));
console.log("average probability: " + avgProbOfFineArt);
