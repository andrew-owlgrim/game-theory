const gameCfg = {
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

  minSpeed: 0.1,
  maxSpeed: 10,

  moveSpeed: 2,
  msCorrectionForce: 4, // forse that corrects move speed

  room: 5,
  boundarySize: 550,
  personSize: 40,
  initialScore: 25,

  population: 5,
  spawnCooldown: 20,

  death: true,
  lifespan: 20,

  payoffs: {
    true: {
      true: [2, 2],
      false: [-2, 3],
    },
    false: {
      true: [3, -2],
      false: [-1, -1],
    },
  },

  entropy: false,
  entropyFrequence: 10,
  entropyValue: -10,

  strategyDistribution: {
    kind: 3,
    villain: 3,
    imitator: 3,
    random: 1,
  },

  stateAnimationDuration: 400,
  deathAnimationDuration: 2000,
};

export default gameCfg;
