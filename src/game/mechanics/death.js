import Mechanic from "../core/mechanic";

export default class Death extends Mechanic {
  constructor(...args) {
    super(...args);
  }

  apply() {
    persons.forEach((person) => {
      if (person.score <= 0) {
        this.removePerson(person);
        this.createPerson();
        personsChanged = true;
      }
    });
  }
}
