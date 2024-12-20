const gameCfg = {
  layers: ["boundaries", "persons", "effects"],
  minSpeed: 0.1,
  maxSpeed: 10,

  moveSpeed: 2,
  msCorrectionForce: 2, // forse that corrects move speed

  room: 5,
  boundarySize: 550,
  personSize: 40,
  population: 10,
  initialScore: 25,

  death: true,
  lifespan: 200,

  payoffs: {
    true: {
      true: [2, 2],
      false: [-1, 3],
    },
    false: {
      true: [3, -1],
      false: [-1, -1],
    },
  },

  entropy: false,
  entropyFrequence: 10,
  entropyValue: -10,

  distribution: {
    kind: 1,
    villain: 1,
    imitator: 1,
    random: 0,
  },
};

export default gameCfg;
