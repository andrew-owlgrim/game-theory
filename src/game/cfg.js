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

  death: false,
  lifespan: 200,

  payoffs: {
    true: {
      true: [3, 3],
      false: [0, 4],
    },
    false: {
      true: [4, 0],
      false: [0, 0],
    },
  },

  entropy: false,
  entropyFrequence: 10,
  entropyValue: -10,

  distribution: {
    kind: 3,
    villain: 3,
    imitator: 3,
    random: 0,
  },

  stateAnimationDuration: 400,
  deathAnimationDuration: 1000,
};

export default gameCfg;
