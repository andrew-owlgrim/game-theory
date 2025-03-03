import { Events } from "matter-js";
import { GameMechanic } from "../../gameEngine";

export default class Entropy extends GameMechanic {
  constructor(...args) {
    super(...args);

    this.toApply = false;
    this.bindedHandleNewDay = this.handleNewDay.bind(this);
    this.init();
  }

  init() {
    Events.on(this.game, "newDay", this.bindedHandleNewDay);
  }

  clear() {
    Events.off(this.game, "newDay", this.bindedHandleNewDay);
  }

  handleNewDay() {
    if (this.enabled) this.toApply = true;
  }

  apply() {
    if (!this.toApply) return;
    this.toApply = false;

    const persons = this.game.managers.personManager.persons;
    if (!persons.length) return;

    let entropyValue = this.game.cfg.entropyValue;

    if (this.game.cfg.entropyAdaptive) {
      const totalScore = persons.reduce((acc, person) => acc + person.score, 0);
      entropyValue = Math.round(
        (totalScore / persons.length) * this.game.cfg.entropyFactor
      );
    }

    console.log("entropyValue", entropyValue);
    persons.forEach((person) => {
      person.score -= entropyValue;
    });
  }
}
