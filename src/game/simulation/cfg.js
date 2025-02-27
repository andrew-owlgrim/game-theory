const gameCfg = {
  // Render

  layers: ["walls", "bgEffects", "persons", "effects"],
  strategies: {
    titForTat: { emoji: "🤨", color: "blue" },
    forgivingTitForTat: { emoji: "", color: "blue" },
    kind: { emoji: "😊", color: "pink" },
    villain: { emoji: "😈", color: "purple" },
    random: { emoji: "🤪", color: "orange" },
  },
  personStates: {
    neutral: "😐",
    happy: "😃",
    upset: "☹",
    dead: "💀",
  },
  stateAnimationDuration: 400,
  deathAnimationDuration: 2000,

  // Engine

  minSpeed: 0.1,
  maxSpeed: 10,

  moveSpeed: 2,
  msCorrectionFactor: 0.1, // how fast speed is corrected

  room: 5,
  boundarySize: 550,
  personSize: 40,
  initialScore: 25,

  dayDuration: 10000, // ms

  // Strategies

  allowedStrategies: ["titForTat", "kind", "villain"],
  strategyWeights: {
    kind: 3,
    villain: 3,
    titForTat: 3,
    random: 1,
  },
  strategyDeterminism: 1, // 0 - random, 1 - deterministic

  // Mechanics

  // population
  population: 20,
  spawnCooldown: 20,

  // naturalDeath
  death: true,
  lifespan: 20,

  // interactions
  payoffs: {
    true: {
      true: [2, 2],
      false: [-1, 3],
    },
    false: {
      true: [3, -1],
      false: [0, 0],
    },
  },

  // entropy
  entropyEnabled: false,
  entropyAdaptive: true,
  entropyFactor: 0.2,
  entropyValue: 10,

  // weakness filter
  weaknessFilterEnabled: true,
};

export default gameCfg;
