import { Events } from "matter-js";
import { GameMechanic } from "../../gameEngine";

export default class Interactions extends GameMechanic {
  constructor(...args) {
    super(...args);
    this.handleCollision = this.handleCollision.bind(this);

    this.unhandledInteractions = [];

    this.init();
  }

  // Lifecycle

  init() {
    super.init();

    Events.on(this.game.physics, "collisionStart", this.handleCollision);
  }

  clear() {
    super.clear();

    this.unhandledInteractions = [];
    Events.off(this.game.physics, "collisionStart", this.handleCollision);
  }

  handleCollision(e) {
    e.pairs.forEach(({ bodyA, bodyB }) => {
      if (bodyA.label === "personBody" && bodyB.label === "personBody")
        this.unhandledInteractions.push([bodyA.person, bodyB.person]);
    });
    console.log("collision");
  }

  // Applying

  apply() {
    if (this.unhandledInteractions.length > 0) {
      while (this.unhandledInteractions.length > 0) {
        const [person1, person2] = this.unhandledInteractions.shift();
        this.interaction(person1, person2);
      }
    }
  }

  interaction(personA, personB) {
    const moveA = personA.strategy.makeMove(personB.id);
    const moveB = personB.strategy.makeMove(personA.id);

    personA.strategy.addInteraction(personB, moveA, moveB);
    personB.strategy.addInteraction(personA, moveB, moveA);

    const [payoffA, payoffB] = this.game.cfg.payoffs[moveA][moveB];

    personA.score += payoffA;
    personB.score += payoffB;
  }
}
