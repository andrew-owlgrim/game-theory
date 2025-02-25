export default class GameEffect {
  constructor(params = {}) {
    this.game = params.game;
    this.key = params.key;
    this.duration = params.duration;
    this.elapsedTime = 0;
  }

  // Life Cycle

  init() {
    return null;
  }

  clear() {
    return null;
  }

  update(deltaTime) {
    throw new Error("Method must be implemented in subclass");
  }
}
