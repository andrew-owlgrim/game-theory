export default class GameEffect {
  constructor({ game, key, duration }) {
    this.game = game;
    this.key = key;
    this.duration = duration;
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
