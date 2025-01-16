import { randomWeightedItem } from "@/utils/common";
import GameManager from "../core/gameManager";
import Person from "../entities/person";
import { strategies } from "../utils/strategy";

export default class PersonManager extends GameManager {
  constructor(...params) {
    super(...params);
  }

  create() {
    const game = this.game;

    const person = new Person({
      position: getRandomPosition(
        0,
        0,
        game.cfg.boundarySize / 3 - game.cfg.personSize / 3
      ),
      size: game.cfg.personSize,
      score: game.cfg.initialScore,
      strategy: randomWeightedItem(strategies, game.cfg.distribution),
    });

    const { vx, vy } = getRandomVelocity(game.cfg.moveSpeed);
    Body.setVelocity(person.body, { x: vx, y: vy });

    game.entities.push(person);
    Composite.add(game.engine.world, person.body);
    game.persons.push(person);
  }

  remove(person) {
    const index = this.entities.indexOf(person);
    if (index !== -1) {
      this.entities.splice(index, 1); // Удаляем объект из текущего массива
    }
    this.persons = this.persons.filter((item) => item !== person);
    if (person.body) {
      Matter.Composite.remove(this.engine.world, person.body);
    }

    // To Clean
    this.createEDeathffect(person);
  }
}
