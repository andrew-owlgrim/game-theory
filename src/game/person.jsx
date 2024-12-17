import Entity from "./entity";
import View from "./view";
import { drawPerson } from "./drawer";

import getRandomName from "./names";
import { getRandomStrategy } from "./strategy";

class Person extends Entity {
  constructor({
    name = getRandomName(),
    strategy = getRandomStrategy(),
    score = 0,
  } = {}) {
    // Entity specifics

    const view = new View({
      layer: "persons",
      render: (props) => {
        drawPerson({
          ...props,
          rotation:
            Math.atan2(this.body.velocity.y, this.body.velocity.x) +
            Math.PI / 2,
          size: this.body.circleRadius * 2,
          emoji: strategy.emoji,
          color: strategy.color,
        });
      },
    });

    super({ view });

    // Person props

    this.name = name;
    this.strategy = strategy;
    this.score = score;

    this.interactions = {};
    this.memory = {};
  }

  decide(person) {
    this.strategy.decide(this.interactions[person.id] || [], this.memory);
  }

  addInteraction(person, myMove, hisMove) {
    if (!this.interactions[person.id]) this.interactions[person.id] = [];
    this.interactions[person.id].push([myMove, hisMove]);
  }
}

export default Person;
