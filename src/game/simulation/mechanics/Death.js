import { GameMechanic } from "../../gameEngine";

export default class Death extends GameMechanic {
  constructor(...args) {
    super(...args);
  }

  apply() {
    const personManager = this.game.managers.personManager;

    personManager.persons.forEach((person) => {
      if (person.score <= 0) {
        personManager.remove(person);
      }
    });
  }
}
