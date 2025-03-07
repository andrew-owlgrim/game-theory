const gameCfg = {
  // Render

  layers: ["walls", "bgEffects", "persons", "effects", "overlay"],
  strategies: {
    titForTat: { weight: 3, enabled: true, emoji: "🤨", color: "blue" },
    forgivingTitForTat: { weight: 3, enabled: false, emoji: "", color: "blue" },
    kind: { weight: 3, enabled: true, emoji: "😊", color: "pink" },
    villain: { weight: 3, enabled: true, emoji: "😈", color: "purple" },
    random: { weight: 1, enabled: true, emoji: "🤪", color: "orange" },
  },
  personStates: {
    neutral: "😐",
    happy: "😃",
    upset: "☹",
    dead: "💀",
  },
  interactionEffectDuration: 800,
  stateAnimationDuration: 400,
  deathAnimationDuration: 2000,

  // Engine

  minSpeed: 0.1,
  maxSpeed: 10,

  moveSpeed: 2,
  msCorrectionFactor: 0.1, // how fast speed is corrected

  room: 5,
  boundarySize: 550,
  personSize: 30,
  initialScore: 25,

  dayDuration: 20000, // ms

  // Strategies

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
  weaknessFilterEnabled: false,

  // ageTax
  ageTaxEnabled: true,
  taxFactor: 2,

  // evolution
  evolutionEnabled: true,
  evolutionSmoothing: 3,
  evolutionMinWeight: 0.02,
  evolutionMaxWeight: 0.8,
  evolutionFactor: 1,
};

export default gameCfg;
