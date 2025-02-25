export default class GameMechanic {
  constructor(game, enabled = true) {
    this.game = game;
    this.enabled = enabled;
  }

  // Life Cycle

  init() {
    return null;
  }

  clear() {
    this.game = null;
    return null;
  }

  // Enabling

  on() {
    this.enabled = true;
  }

  off() {
    this.enabled = false;
  }

  // Apply

  apply(deltaTime) {
    throw new Error("Method must be implemented in subclass");
  }
}
