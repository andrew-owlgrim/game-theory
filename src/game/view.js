export default class View {
  constructor({
    visible = true,
    opacity = 1,
    layer = null,
    render = null,
  } = {}) {
    this.visible = visible;
    this.opacity = opacity;
    this.layer = layer;
    this.render = render;
  }
}
