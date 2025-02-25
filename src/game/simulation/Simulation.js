import { Engine, Events } from "matter-js";
import { GameEngine } from "../gameEngine";

import defaultCfg from "./cfg";
import WallManager from "./managers/WallManager/WallManager";
import PersonManager from "./managers/PersonManager/PersonManager";
import Log from "./mechanics/Log";
import {
  SpeedCorrection,
  MaintainPopulation,
  Interactions,
  Death,
} from "./mechanics";

export default class Simulation extends GameEngine {
  constructor(props) {
    super(props);
    this.cfg = { ...defaultCfg, ...props.cfg };

    this.init();
  }

  // Lifecycle

  init() {
    // engine
    this.physics.gravity.x = 0;
    this.physics.gravity.y = 0;
    this.physics.gravity.scale = 0;

    this.render.setLayers(this.cfg.layers);

    // managers
    this.managers.wallManager = new WallManager(this);
    this.managers.personManager = new PersonManager(this);

    // mechanics
    this.addMechanic(new Log(this));
    this.addMechanic(new SpeedCorrection(this));
    this.addMechanic(new MaintainPopulation(this));
    this.addMechanic(new Interactions(this));
    this.addMechanic(new Death(this));

    // entities
    this.managers.wallManager.createBoundary();

    // events

    // first render
    setTimeout(() => {
      this.render.render();
    }, 0);
  }

  clear() {}

  // API

  run() {
    super.run();
  }

  stop() {
    super.stop();
  }

  setTimeScale(value) {
    super.setTimeScale(value);
  }

  getScoreboard() {
    return this.managers.personManager.persons
      .slice()
      .sort((a, b) => b.score - a.score);
  }

  applyConfig(cfg) {}
}
