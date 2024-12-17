import { random } from "@/utils/common";

// Semantics

const Move = {
  my: 0,
  his: 1,
};

const Decision = {
  cooperate: true,
  decieve: false,
};

// Class

class Strategy {
  constructor({ key, name, emoji, description, decide, color } = {}) {
    this.key = key;
    this.name = name;
    this.emoji = emoji;
    this.color = color;
    this.description = description;
    this.decide = decide;
  }
}

// Strategies

const strategies = [
  new Strategy({
    key: "kind",
    name: { en: "Kind" },
    emoji: "😊",
    color: "pink",
    description: "Always cooperates no matter what",
    decide: function () {
      return Decision.cooperate;
    },
  }),

  new Strategy({
    key: "villian",
    name: { en: "Villian", ua: "Негідник", ru: "Злодей" },
    emoji: "😈",
    color: "purple",
    description: "Always decieves",
    decide: function () {
      return Decision.decieve;
    },
  }),

  new Strategy({
    key: "random",
    name: { en: "Trickster" },
    emoji: "🤪",
    color: "orange", //to do gradient
    description: "Makes decision radomly",
    decide: function () {
      return !!random(2);
    },
  }),

  new Strategy({
    key: "imitator",
    name: { en: "Mimicker", ua: "Імітатор", ru: "Подражатель" },
    emoji: "🤨",
    color: "blue",
    description: "Always decieves",
    decide: function (interactions) {
      if (interactions.length === 0) return true;
      else return interactions[interactions.length - 1][Move.his];
    },
  }),
];

// Random strategy

function getRandomStrategy() {
  return strategies[random(strategies.length)];
}

//

export { strategies, getRandomStrategy };
