export default class Camera {
  constructor({ position = { x: 0, y: 0 }, scale = 1 } = {}) {
    this.position = position;
    this.scale = scale;
  }
}
