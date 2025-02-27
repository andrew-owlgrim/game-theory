import { Events } from "matter-js";
import { GameMechanic } from "../../gameEngine";

export default class WeaknessFilter extends GameMechanic {
  constructor(...args) {
    super(...args);

    this.toApply = false;
    this.bindedHandleNewDay = this.handleNewDay.bind(this);
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

    const personManager = this.game.managers.personManager;
    if (!personManager.persons.length) return;

    const sortedPersons = personManager.persons.toSorted(
      (a, b) => a.score - b.score
    );

    console.log("remove weakest person", sortedPersons[0]);
    personManager.remove(sortedPersons[0]);
  }
}
