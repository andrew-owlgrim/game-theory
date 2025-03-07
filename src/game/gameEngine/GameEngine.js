import Matter, { Engine, Runner, Events, Composite } from "matter-js";
import { RenderEngine } from "../render";
import Entity from "./entity";

export default class GameEngine {
  constructor(params = {}) {
    if (!params.canvas)
      throw new Error("Canvas must be passed to the game constructor");

    this.entities = [];
    this.managers = {};
    this.mechanics = {};
    this.effects = [];

    this.runner = Runner.create();
    this.physics = Engine.create();
    this.render = new RenderEngine({
      canvas: params.canvas,
      entities: this.entities,
    });

    this.isRunning = false;

    this.#init();
  }

  // Lifecycle

  #init() {
    Events.on(this.physics, "afterUpdate", () => this.#loop());
  }

  clear() {
    this.stop();
    Matter.Engine.clear(this.physics);
    this.render.clear();
  }

  run() {
    this.isRunning = true;
    Runner.run(this.runner, this.physics);
    this.render.run();
  }

  stop() {
    this.isRunning = false;
    this.render.stop();
    Matter.Runner.stop(this.runner);
  }

  // loop

  #loop() {
    const deltaTime = this.physics.timing.lastDelta;
    this.effects.forEach((effect) => {
      this.updateEffect(effect, deltaTime);
    });
    Object.values(this.mechanics).forEach((mechanic) => {
      if (mechanic.enabled) mechanic.apply(deltaTime);
    });
  }

  // Time

  setTimeScale(value) {
    this.physics.timing.timeScale = value;
  }

  // Entities

  addEntity(entity) {
    if (!(entity instanceof Entity)) {
      console.warn("Object is not an instance of Entity");
      return false;
    }
    this.entities.push(entity);

    if (entity.body) {
      Composite.add(this.physics.world, entity.body); // Добавляем body в мир
    }

    return true;
  }

  removeEntity(entity) {
    if (!entity) return;
    const index = this.entities.findIndex((e) => e.id === entity.id);
    if (index === -1) {
      console.warn(`Entity with id ${entity.id} not found`);
      return false;
    }

    if (entity.body) {
      Composite.remove(this.physics.world, entity.body); // Удаляем body из мира
    }

    this.entities.splice(index, 1);
    return true;
  }

  // Mechanics

  addMechanic(mechanic) {
    this.mechanics[mechanic.constructor.name] = mechanic;
  }

  // Effects

  addEffect(effect) {
    const existingEffect = this.effects.find((el) => el.key == effect.key);
    if (existingEffect) {
      this.removeEffect(existingEffect);
    }

    this.effects.push(effect);
    effect.init();
  }

  updateEffect(effect, deltaTime) {
    effect.elapsedTime += deltaTime;
    effect.update(deltaTime);
    if (effect.elapsedTime >= effect.duration) this.removeEffect(effect);
  }

  removeEffect(effect) {
    const index = this.effects.findIndex((el) => el.key === effect.key);

    if (index !== -1) {
      this.effects[index].clear();
      this.effects.splice(index, 1);
    }
  }
}
