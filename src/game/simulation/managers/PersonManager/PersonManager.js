import { Body, Events } from "matter-js";
import { GameManager } from "../../../gameEngine";

import Person from "../../entities/Person/Person";

import { objectMap, objectFilter } from "@/utils/jsUtils";

import { getRandomPosition, getRandomVelocity } from "./parameters";
import { getPseudoRandomStrategy as getStrategy } from "./strategySelector";
import getRandomName from "./names";

export default class PersonManager extends GameManager {
  constructor(game) {
    super(game);

    this.persons = [];

    let weights = objectFilter(
      game.cfg.strategies,
      (strategy) => strategy.enabled
    );
    weights = objectMap(weights, (strategy) => strategy.weight);
    weights = normalizeWeights(weights);
    this.strategyWeights = weights;
  }

  add() {
    Events.trigger(this.game, "beforePersonSpawn");

    const game = this.game;

    const strategy = getStrategy(
      this.strategyWeights,
      this.persons,
      this.game.cfg.strategyDeterminism
    );

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
      birthday: game.managers.timeManager.currentDay,
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

  setStrategyWeights(strategyWeights) {
    this.strategyWeights = normalizeWeights(strategyWeights);
  }
}

function normalizeWeights(weights) {
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  return objectMap(weights, (value) => value / totalWeight);
}
