import Game from "./core/game";
import BoundaryManager from "./managers/wallManager";
import PersonManager from "./managers/personManager";

export default class Simulation extends Game {
  constructor(props) {
    super(props);

    this.personManager = new PersonManager(this);
    this.boundaryManager = new BoundaryManager(this);

    this.totalInteractions = 0;

    this.init();
  }

  // Lifecycle

  init() {
    this.engine.gravity.x = 0;
    this.engine.gravity.y = 0;
    this.engine.gravity.scale = 0;

    this.boundaryManager.create();
  }

  loop() {
    this.mechanics.forEach((mechanic) => mechanic.apply());
  }

  // API

  getLeaderboard() {}
}
