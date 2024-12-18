import { Bodies } from "matter-js";
import Entity from "./entity";

import getRandomName from "./names";
import { getRandomStrategy } from "./strategy";

// Entity

export default class Person extends Entity {
  constructor({
    name = getRandomName(),
    strategy = getRandomStrategy(),
    score = 0,
    position = { x: 0, y: 0 },
    size = 10,
    ...props
  } = {}) {
    super({ size, ...props });

    this.body = createPersonBody(position, size);
    this.layer = "persons";

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

  render(props) {
    drawPerson({
      ...props,
      rotation:
        Math.atan2(this.body.velocity.y, this.body.velocity.x) + Math.PI / 2,
      emoji: this.strategy.emoji,
      color: this.strategy.color,
    });
  }
}

// Body

function createPersonBody(position, size) {
  return Bodies.circle(position.x, position.y, size / 2, {
    restitution: 1,
    friction: 0,
    frictionStatic: 0,
    frictionAir: 0,
    density: 0.1,
  });
}

// Drawer

function drawPerson({ context, position, rotation, size, emoji, color }) {
  context.save();

  context.translate(position.x, position.y);
  context.rotate(rotation);

  context.fillStyle = color;
  context.font = `700 ${size}px "Noto Emoji"`;
  context.textAlign = "center";
  const yOffset = 0.33;
  context.fillText(emoji, 0, yOffset * size);

  context.restore();
}
