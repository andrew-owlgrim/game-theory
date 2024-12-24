export default class NaturalDeath {
  constructor(game) {
    this.game = game;
    this.lifespan = this.game.cfg.lifespan;
  }

  apply() {
    this.game.entities().forEach((person) => {
      if (person.totalInteractions >= this.lifespan) {
        this.removePerson(person);
        this.createPerson();
        this.personsChanged = true;
      }
    });
  }
}
