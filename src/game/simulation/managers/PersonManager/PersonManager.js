import { GameManager } from "../../../gameEngine";
import Person from "../../entities/Person/Person";
import { getRandomPosition, getRandomVelocity } from "./parameters";
import { randomItem } from "@/utils/mathUtils";
import { Kind, Villain, Random, TitForTat } from "../../Strategy";
import getRandomName from "./names";
import { Body } from "matter-js";
const strategies = [Kind, Villain, Random, TitForTat];

export default class PersonManager extends GameManager {
  constructor(game) {
    super(game);
    this.persons = [];
  }

  add() {
    const game = this.game;

    const randomStrategy = randomItem(strategies);
    const strategy = new randomStrategy();

    const strategyColor = game.cfg.strategies[strategy.name].color;
    const strategyHexColor =
      game.cfg.colors[strategyColor]?.main ?? strategyColor;

    const person = new Person({
      position: getRandomPosition(
        0,
        0,
        game.cfg.boundarySize / 3 - game.cfg.personSize / 3
      ),
      size: game.cfg.personSize,
      score: game.cfg.initialScore,
      strategy: strategy,
      name: getRandomName(),
      emoji: game.cfg.strategies[strategy.name].emoji,
      view: {
        layer: "persons",
        color: strategyColor,
        fillStyle: strategyHexColor,
      },
    });

    const { vx, vy } = getRandomVelocity(game.cfg.moveSpeed);
    Body.setVelocity(person.body, { x: vx, y: vy });

    game.addEntity(person);
    this.persons.push(person);
  }

  remove(person) {
    this.game.removeEntity(person);
    this.persons = this.persons.filter((item) => item.id !== person.id);
  }
}
