import { Events } from "matter-js";
import { GameManager } from "../../gameEngine";

export default class TimeManager extends GameManager {
  constructor(game) {
    super(game);

    this.dayDuration = this.game.cfg.dayDuration;
    if (this.dayDuration === undefined) {
      throw new Error("dayDuration is not defined in cfg");
    }
    this.currentDay = 0;

    this.bindedUpdate = this.update.bind(this);
    this.init();
  }

  init() {
    Events.on(this.game.physics, "afterUpdate", this.bindedUpdate);
  }

  clear() {
    Events.off(this.game.physics, "afterUpdate", this.bindedUpdate);
  }

  update() {
    const timestamp = this.game.physics.timing.timestamp;
    const newDay = Math.floor(timestamp / this.dayDuration);
    if (newDay > this.currentDay) {
      this.currentDay = newDay;
      Events.trigger(this.game, "newDay", { day: this.currentDay });
    }
  }
}
