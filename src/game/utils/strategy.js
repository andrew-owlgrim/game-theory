import { random } from "@/utils/common";
import { DECISION, MOVE } from "./constants";

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
    description: "Always decieves no matter what",

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
    description: "First time he cooperates. Then repeats last oppenents move",

    decide: function (interactions) {
      if (interactions.length === 0) return true;
      else return interactions[interactions.length - 1][MOVE.his];
    },
  }),
};

//

export { strategies };
