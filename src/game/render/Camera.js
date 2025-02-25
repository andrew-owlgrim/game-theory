export default class Camera {
  constructor(params = {}) {
    this.position = params.position || { x: 0, y: 0 };
    this.scale = params.scale || 1;
  }

  set(params = {}) {
    this.position = params.position || this.position;
    this.scale = params.scale || this.scale;
  }
}
