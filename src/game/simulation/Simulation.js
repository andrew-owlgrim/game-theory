import { Engine, Events } from "matter-js";
import { GameEngine } from "../gameEngine";

import defaultCfg from "./cfg";
import {
  WallManager,
  PersonManager,
  StatisticsManager,
  TimeManager,
  DebugOverlay,
  EffectManager,
} from "./managers";
import {
  SpeedCorrection,
  MaintainPopulation,
  Interactions,
  Death,
  Evolution,
  Entropy,
  WeaknessFilter,
  AgeTax,
} from "./mechanics";
import Text from "./entities/Text/Text";
import { transform } from "lodash";
import { Transform } from "../render";

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
    this.managers.statisticsManager = new StatisticsManager(this);
    this.managers.timeManager = new TimeManager(this);
    this.managers.debugOverlay = new DebugOverlay(this);
    this.managers.effectManager = new EffectManager(this);

    // mechanics
    // this.addMechanic(new Log(this));
    this.addMechanic(new SpeedCorrection(this));
    this.addMechanic(new Interactions(this));
    this.addMechanic(new AgeTax(this, this.cfg.ageTaxEnabled));
    this.addMechanic(new Death(this));
    this.addMechanic(new Evolution(this, this.cfg.evolutionEnabled));
    this.addMechanic(new MaintainPopulation(this));
    this.addMechanic(new Entropy(this, this.cfg.entropyEnabled));
    this.addMechanic(new WeaknessFilter(this, this.cfg.weaknessFilterEnabled));

    // entities
    this.managers.wallManager.createBoundary();

    for (let i = 0; i < this.cfg.population; i++) {
      this.managers.personManager.add();
    }

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

  faster() {
    super.setTimeScale(this.physics.timing.timeScale * 2);
  }

  slower() {
    super.setTimeScale(this.physics.timing.timeScale / 2);
  }

  getScoreboard() {
    return this.managers.personManager.persons
      .slice()
      .sort((a, b) => b.score - a.score);
  }

  applyConfig(cfg) {}
}
