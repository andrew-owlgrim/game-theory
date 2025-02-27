export default class Strategy {
  static name = "Strategy";

  constructor() {
    this.interactions = {};
    this.knowledge = {};
  }

  addInteraction(personId, moves) {
    if (!this.interactions[personId]) this.interactions[personId] = [];
    this.interactions[personId].push(moves);
  }
  removeInteractions(personId) {
    delete this.interactions[personId];
  }
  makeMove(personId) {
    throw new Error("makeMove method is not implemented");
  }

  get name() {
    return this.constructor.name;
  }
}
