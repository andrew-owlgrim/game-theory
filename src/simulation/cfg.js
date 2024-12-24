const gameCfg = {
  layers: ["boundaries", "bgEffects", "persons", "effects"],
  minSpeed: 0.1,
  maxSpeed: 10,

  moveSpeed: 2,
  msCorrectionForce: 2, // forse that corrects move speed

  room: 5,
  boundarySize: 550,
  personSize: 30,
  population: 20,
  initialScore: 25,

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

  distribution: {
    kind: 3,
    villain: 3,
    imitator: 3,
    random: 1,
  },

  stateAnimationDuration: 400,
  deathAnimationDuration: 2000,
};

export default gameCfg;
