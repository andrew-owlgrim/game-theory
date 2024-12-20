import { random, randomWeighted } from "@/utils/common";

// Semantics

const MOVE = {
  my: 0,
  his: 1,
};

const DECISION = {
  cooperate: true,
  deceive: false,
};

// Class

class Strategy {
  constructor({ name, emoji, description, decide, color } = {}) {
    this.name = name;
    this.emoji = emoji;
    this.color = color;
    this.description = description;
    this.decide = decide;
  }
}

// Strategies

const strategies = {
  kind: new Strategy({
    name: { en: "Kind" },
    emoji: "😊",
    color: "pink",
    description: "Always cooperates no matter what",
    decide: function () {
      return DECISION.cooperate;
    },
  }),

  villain: new Strategy({
    name: { en: "Villain", ua: "Негідник", ru: "Злодей" },
    emoji: "😈",
    color: "purple",
    description: "Always decieves",
    decide: function () {
      return DECISION.deceive;
    },
  }),

  random: new Strategy({
    name: { en: "Trickster" },
    emoji: "🤪",
    color: "orange", //to do gradient
    description: "Makes decision radomly",
    decide: function () {
      return !!random(2);
    },
  }),

  imitator: new Strategy({
    name: { en: "Mimicker", ua: "Імітатор", ru: "Подражатель" },
    emoji: "🤨",
    color: "blue",
    description: "Always decieves",
    decide: function (interactions) {
      if (interactions.length === 0) return true;
      else return interactions[interactions.length - 1][MOVE.his];
    },
  }),
};

// Random strategy

function getRandomStrategy() {
  const values = Object.values(strategies);
  return values[random(values.length)];
}

function getRandomWeightedStrategy(distribution) {
  const randomStrategy = randomWeighted(distribution);
  return strategies[randomStrategy];
}

//

export {
  strategies,
  getRandomStrategy,
  getRandomWeightedStrategy,
  DECISION,
  MOVE,
};
