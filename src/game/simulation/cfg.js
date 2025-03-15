const gameCfg = {
  // Render

  layers: ["walls", "bgEffects", "persons", "effects", "overlay"],
  strategies: {
    // simple
    kind: { weight: 1, enabled: true, emoji: "😊", color: "pink" },

    villain: { weight: 1, enabled: true, emoji: "😈", color: "purple" },

    random: { weight: 1, enabled: false, emoji: "🤪", color: "orange" },

    // advanced
    titForTat: { weight: 1, enabled: true, emoji: "🤨", color: "blue" },

    titForTwoTats: { weight: 1, enabled: true, emoji: "🧐", color: "blue" },

    forgivingTFT: {
      weight: 1,
      enabled: true,
      emoji: "😌",
      color: "blue",
      options: {
        forgivenessProbability: 0.25,
      },
    },

    grudger: { weight: 1, enabled: true, emoji: "😠", color: "red" },

    diplomat: {
      weight: 1,
      enabled: true,
      emoji: "🤑",
      color: "liliac",
      options: { betrayChance: 0.333 },
    },

    // сomplex
  },

  personStates: {
    neutral: "😐",
    happy: "😃",
    upset: "☹",
    dead: "💀",
    mistake: "😬",
  },
  interactionEffectDuration: 800,
  stateAnimationDuration: 400,
  deathAnimationDuration: 2000,

  // Engine

  minSpeed: 0.1,
  maxSpeed: 10,

  moveSpeed: 2,
  msCorrectionFactor: 0.1, // how fast speed is corrected

  boundarySize: 550,
  personSize: 30,
  initialScore: 25,

  dayDuration: 20000, // ms

  // Strategies

  strategyDeterminism: 1, // 0 - random, 1 - deterministic

  // Mechanics

  // population
  population: 30,
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
  mistakes: true,
  mistakeChance: 0.05,

  // entropy
  entropyEnabled: false,
  entropyAdaptive: true,
  entropyFactor: 0.2,
  entropyValue: 10,

  // weakness filter
  weaknessFilterEnabled: false,

  // ageTax
  ageTaxEnabled: false,
  taxFactor: 2,

  // evolution
  evolutionEnabled: false,
  evolutionSmoothing: 3,
  evolutionMinWeight: 0.02,
  evolutionMaxWeight: 0.8,
  evolutionFactor: 1,
};

export default gameCfg;
