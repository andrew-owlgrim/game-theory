import Transform from "./Transform";

export default class RenderView {
  constructor({
    layer = "",
    visible = true,
    opacity = 1,
    transform = new Transform(),
    ...customParams
  } = {}) {
    this.layer = layer;
    this.visible = visible;
    this.opacity = opacity;
    this.transform = transform;

    Object.assign(this, customParams);
  }
}
