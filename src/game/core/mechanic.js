export default class Mechanic {
  constructor(game) {
    this.game = game;
  }

  apply() {
    throw new Error("Method must be implemented in subclass");
  }
}
