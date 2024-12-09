import { random } from "@/utils/common";

// Constantines

const myMove = 0;
const hisMove = 1;

// Class

class Strategy {
  constructor({ key, name, emoji, description, decisionFunc, color }) {
    this.key = key;
    this.name = name;
    this.emoji = emoji;
    this.color = color;
    this.description = description;
    this.decisionFunc = decisionFunc;
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
    decisionFunc: function () {
      return true;
    },
  }),

  new Strategy({
    key: "villian",
    name: { en: "Villian", ua: "Негідник", ru: "Злодей" },
    emoji: "😈",
    color: "purple",
    description: "Always decieves",
    decisionFunc: function () {
      return false;
    },
  }),

  new Strategy({
    key: "random",
    name: { en: "Trickster" },
    emoji: "🤪",
    color: "orange", //to do gradient
    description: "Makes decision radomly",
    decisionFunc: function () {
      return !!random(2);
    },
  }),

  new Strategy({
    key: "imitator",
    name: { en: "Mimicker", ua: "Імітатор", ru: "Подражатель" },
    emoji: "🤨",
    color: "blue",
    description: "Always decieves",
    decisionFunc: function (relations) {
      if (relations.length === 0) return true;
      else return relations[relations.length - 1][hisMove];
    },
  }),
];

// Random strategy

function getRandomStrategy() {
  return strategies[random(strategies.length)];
}

//

export { strategies, getRandomStrategy };
