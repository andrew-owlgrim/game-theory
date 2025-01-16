import Mechanic from "../core/mechanic";

export default class Interactions extends Mechanic {
  constructor(...args) {
    super(...args);

    this.unhandledInteractions = [];

    Events.on(this.engine, "collisionStart", (e) => {
      e.pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA.label === "personBody" && bodyB.label === "personBody")
          this.toInteract.push([bodyA.person, bodyB.person]);
      });
    });
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

  interaction(personA, personB) {
    const decisionA = personA.decide(personB);
    const decisionB = personB.decide(personA);

    personA.addInteraction(personB, decisionA, decisionB);
    personB.addInteraction(personA, decisionB, decisionA);

    const [payoffA, payoffB] = this.cfg.payoffs[decisionA][decisionB];

    personA.score += payoffA;
    personB.score += payoffB;

    this.personStateAnimation(personA, payoffA);
    this.personStateAnimation(personB, payoffB);

    // console.log(
    //   `${personA.name} (${decisionA}) vs ${personB.name} (${decisionB}): ${payoffA} / ${payoffB}`
    // );
  }

  personStateAnimation(person, payoff) {
    if (payoff > 0) person.setState("happy");
    else if (payoff < 0) person.setState("upset");
    else person.setState("neutral");
  }
}
