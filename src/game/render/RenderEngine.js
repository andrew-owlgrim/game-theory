import renderBody from "./drawBody";
import Camera from "./Camera";

export default class RenderEngine {
  constructor({ canvas, entities, layers }) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.entities = entities;
    this.camera = new Camera();
    this.layers = layers || [];

    this.isRunning = false;
    this.animationFrameId = null;

    this.#init();
  }

  // Lifecycle

  #init() {
    this.resizeObserver = new ResizeObserver(() => this.#resizeCanvas());
    this.resizeObserver.observe(this.canvas);
    this.#resizeCanvas();
  }

  clear() {
    this.stop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  // Loop

  #loop() {
    if (!this.isRunning) return;
    this.render();
    this.animationFrameId = requestAnimationFrame(this.#loop.bind(this));
  }

  run() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.#loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  // Render

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    this.clearCanvas();
    this.#applyCamera();

    const sortedEntities = this.#getEntitiesSortedByLayers();

    sortedEntities.forEach((entity) => {
      const view = entity.view;
      if (!view.visible) return;
      this.#applyViewParams(view);
      // const drawer = view.drawer || drawBody;
      // drawer({ context: this.context, ...view.render() });
      // view.render(this.context);
      entity.render(this.context);
      this.#resetViewParams();
    });

    this.#resetCamera();
  }

  #getEntitiesSortedByLayers() {
    const layerOrder = new Map(
      this.layers.map((layer, index) => [layer, index])
    );

    return this.entities
      .filter((entity) => entity.view && entity.view.layer)
      .sort((a, b) => {
        const layerA = layerOrder.get(a.view.layer) ?? Infinity;
        const layerB = layerOrder.get(b.view.layer) ?? Infinity;
        return layerA - layerB;
      });
  }

  #applyViewParams(view) {
    this.context.save();
    this.context.globalAlpha = view.opacity || 1;
    const { translate, rotate, scale } = view.transform;
    this.context.translate(translate.x, translate.y);
    this.context.rotate(rotate);
    this.context.scale(scale, scale);
  }

  #resetViewParams() {
    this.context.restore();
  }

  // Camera

  #applyCamera() {
    const { context } = this;
    const { position, scale } = this.camera;
    context.save();
    context.scale(scale, scale);
    context.translate(
      -position.x + this.canvas.width / (2 * scale),
      -position.y + this.canvas.height / (2 * scale)
    );
  }

  #resetCamera() {
    this.context.restore();
  }

  setCamera(params) {
    this.camera.set(params);
  }

  // Layers

  setLayers(layers) {
    this.layers = layers;
  }

  // Resize Canvas

  #resizeCanvas() {
    const { canvas } = this;
    const { width, height } = canvas.getBoundingClientRect();

    canvas.width = Math.floor(width);
    canvas.height = Math.floor(height);
  }
}
