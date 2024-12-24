import { Bodies, Body } from "matter-js";
import Entity from "../core/entity";

import getRandomName from "../utils/names";
import { getRandomStrategy } from "../utils/strategy";
import gameContext from "../core/context";
import { BODY_CATEGORY } from "../utils/constants";

// Entity

export default class Person extends Entity {
  static getEmoji = (person) => {
    const emojis = {
      default: person.strategy.emoji,
      happy: "😃",
      upset: "☹",
      neutral: "😐",
      dead: "💀",
    };
    return emojis[person.state];
  };

  //

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
    this.body.person = this;
    this.layer = "persons";

    this.name = name;
    this.strategy = strategy;
    this.score = score;
    this.totalInteractions = 0;

    this.interactions = {};
    this.memory = {};

    this.state = "default";
    this.animationEndTime = null;

    this.isDead = false;
  }

  // State

  setState(state) {
    this.state = state;
    const { stateAnimationDuration } = gameContext.cfg;
    const { timestamp } = gameContext.engine.timing;
    this.animationEndTime = timestamp + stateAnimationDuration;
  }

  updateState() {
    const { timestamp } = gameContext.engine.timing;
    if (this.animationEndTime && timestamp >= this.animationEndTime) {
      this.resetState();
    }
  }

  resetState() {
    this.state = "default";
    this.animationEndTime = null;
  }

  die() {
    this.setState("dead");
    Body.set(this.body, {
      collisionFilter: {
        ...this.body.collisionFilter,
        mask: BODY_CATEGORY.walls,
      },
    });
  }

  // Interactions

  decide(person) {
    return this.strategy.decide(
      this.interactions[person.id] || [],
      this.memory
    );
  }

  addInteraction(person, myMove, hisMove) {
    if (!this.interactions[person.id]) this.interactions[person.id] = [];
    this.interactions[person.id].push([myMove, hisMove]);
    this.totalInteractions++;
  }

  // Render

  render({ colors, ...props }) {
    const rotation =
      Math.atan2(this.body.velocity.y, this.body.velocity.x) + Math.PI / 2;

    const { stateAnimationDuration: duration } = gameContext.cfg;
    const { timestamp } = gameContext.engine.timing;
    const opacity =
      this.person.state === "dead"
        ? (this.animationEndTime - timestamp) / duration
        : 1;

    drawPerson({
      ...props,
      rotation,
      emoji: Person.getEmoji(this),
      color: gameContext.cfg.colors[this.strategy.color].main,
      opacity,
    });
  }
}

// Body

function createPersonBody(position, size) {
  return Bodies.circle(position.x, position.y, size / 2, {
    label: "personBody",

    restitution: 1,
    friction: 0,
    frictionStatic: 0,
    frictionAir: 0,
    density: 0.1,

    collisionFilter: {
      category: BODY_CATEGORY.persons,
    },
  });
}

// Drawer

function drawPerson({
  context,
  position,
  rotation,
  size,
  emoji,
  color,
  opacity = 1,
}) {
  context.save();

  context.translate(position.x, position.y);
  context.rotate(rotation);
  context.globalAlpha = opacity;

  context.fillStyle = color;
  context.font = `700 ${size}px "Noto Emoji"`;
  context.textAlign = "center";
  const yOffset = 0.33;

  context.fillText(emoji, 0, yOffset * size);

  context.restore();
}
