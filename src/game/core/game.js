import Matter, { Engine, Render, Runner, Events } from "matter-js";
import Renderer from "./renderer";
import Camera from "./camera";
import defaultCfg from "../cfg";
import gameContext from "./context";
import Entities from "./entities";

export default class Game {
  constructor({ canvas, cfg = {} }) {
    if (!canvas)
      throw new Error("Canvas must be passed to the game constructor");

    this.entities = new Entities();
    this.camera = new Camera();

    this.cfg = { ...defaultCfg, ...cfg };
    this.engine = Engine.create();
    this.runner = Runner.create();
    this.render = new Renderer({
      canvas,
      entities: this.entities,
      camera: this.camera,
    });
    this.mechanics = [];

    gameContext.cfg = this.cfg;
    gameContext.engine = this.engine;
    // this.render = Render.create({
    //   canvas,
    //   engine: this.engine,
    // });
    // Render.lookAt(this.render, {
    //   min: { x: -400, y: -300 },
    //   max: { x: 400, y: 300 },
    // });

    Events.on(this.engine, "afterUpdate", () => this.loop());
  }

  // loop

  loop() {}

  // Lifecycle

  run() {
    Runner.run(this.runner, this.engine);
    // Render.run(this.render);
    this.render.run();
  }

  stop() {
    Matter.Runner.stop(this.runner);
    // Render.stop(this.render);
    this.render.stop();
  }

  speedUp() {
    const newSpeed = this.engine.timing.timeScale * 2;
    if (newSpeed < this.cfg.maxSpeed) this.engine.timing.timeScale = newSpeed;
  }

  slowDown() {
    const newSpeed = this.engine.timing.timeScale / 2;
    if (newSpeed > this.cfg.minSpeed) this.engine.timing.timeScale = newSpeed;
  }

  destroy() {
    this.stop();
    Matter.Engine.clear(this.engine);
    this.render.destroy();
  }
}
