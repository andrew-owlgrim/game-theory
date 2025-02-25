export default class Transform {
  constructor(params = {}) {
    this.translate = params.translate || { x: 0, y: 0 };
    this.rotate = params.rotate || 0; //rad
    this.scale = params.scale || 1;
  }
}
