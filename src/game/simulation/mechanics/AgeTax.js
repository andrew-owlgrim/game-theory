import { Events } from "matter-js";
import { GameMechanic } from "../../gameEngine";

export default class AgeTax extends GameMechanic {
  constructor(...args) {
    super(...args);

    this.toApply = false;
    this.clear = this.init();
  }

  init() {
    const handleNewDay = () => {
      if (this.enabled) this.toApply = true;
    };

    Events.on(this.game, "newDay", handleNewDay);

    return () => {
      Events.off(this.game, "newDay", handleNewDay);
    };
  }

  apply() {
    if (!this.toApply) return;
    this.toApply = false;

    const persons = this.game.managers.personManager.persons;
    if (!persons.length) return;

    const currentDay = this.game.managers.timeManager.currentDay;
    const ages = persons.map((person) => currentDay - person.birthday);
    const taxFactor = this.game.cfg.taxFactor;

    persons.forEach((person, i) => {
      const age = ages[i];
      const tax = age * taxFactor;
      person.score -= tax;
    });
    // console.log("ageTax applied", persons[0], ages[0]);
  }
}
