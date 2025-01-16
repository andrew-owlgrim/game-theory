import Mechanic from "../core/mechanic";

export default class Entropy extends Mechanic {
  constructor(...args) {
    super(...args);

    this.entropyApplied = false;
  }

  apply() {
    if (this.toInteract.length > 0) {
      while (this.toInteract.length > 0) {
        const [person1, person2] = this.toInteract.shift();
        this.interaction(person1, person2);
        this.totalInteractions++;
      }
      personsChanged = true;
    }
  }
}
