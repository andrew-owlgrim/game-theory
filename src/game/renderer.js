export default class Renderer {
  constructor({ canvas, entities, layers = [], camera }) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.entities = entities;
    this.layers = layers;
    this.camera = camera;

    this.isRunning = false;
    this.animationFrameId = null;

    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this.resizeObserver.observe(this.canvas);
    this.resizeCanvas();
  }

  // Clear

  clearCanvas() {
    const { context, canvas } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Camera

  applyCamera() {
    const { context } = this;
    const { position, scale } = this.camera;
    context.save();
    context.scale(scale, scale);
    context.translate(
      -position.x + this.canvas.width / (2 * scale),
      -position.y + this.canvas.height / (2 * scale)
    );
  }

  resetCamera() {
    this.context.restore();
  }

  // Render

  getEntitiesByLayer() {
    return this.layers.flatMap((layer) =>
      this.entities.filter((entity) => entity.layer === layer)
    );
  }

  render() {
    this.clearCanvas();
    this.applyCamera();

    const sortedEntities = this.getEntitiesByLayer();

    sortedEntities.forEach((entity) => {
      if (typeof entity.render === "function") {
        entity.render({
          context: this.context,
          position: entity.getPosition(),
          size: entity.getSize(),
          rotation: entity.getRotation() || 0,
          scale: this.camera.scale,
        });
      }
      if (typeof entity.render === "object") {
        renderBody({
          context: this.context,
          body: entity.body,
          ...entity.render,
        });
      }
    });

    this.resetCamera();
  }

  // Loop

  loop() {
    if (!this.isRunning) return; // Проверяем статус перед продолжением
    this.render();
    this.animationFrameId = requestAnimationFrame(this.loop.bind(this));
  }

  run() {
    if (this.isRunning) return; // Если уже запущено, ничего не делаем
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  // Resize Canvas

  resizeCanvas() {
    const { canvas } = this;
    const { width, height } = canvas.getBoundingClientRect();

    canvas.width = Math.floor(width);
    canvas.height = Math.floor(height);
  }

  // Destroy

  destroy() {
    this.stop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
}

/**
 * Рендерит физическое тело на канвасе.
 * @param {CanvasRenderingContext2D} context - Контекст канваса для рисования.
 * @param {Body} body - Физическое тело Matter.js.
 * @param {string} fillStyle - Цвет заливки.
 * @param {string} strokeStyle - Цвет обводки.
 * @param {number} lineWidth - Ширина линии.
 */
function renderBody({
  context,
  body,
  fillStyle,
  strokeStyle,
  lineWidth = 1,
} = {}) {
  const { vertices } = body;

  context.save();
  context.beginPath();

  // Перемещаемся к первой вершине
  const firstVertex = vertices[0];
  context.moveTo(firstVertex.x, firstVertex.y);

  // Проходим через остальные вершины
  for (let i = 1; i < vertices.length; i++) {
    const vertex = vertices[i];
    context.lineTo(vertex.x, vertex.y);
  }

  // Замыкаем фигуру
  context.closePath();

  // Заливаем и обводим
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
  if (strokeStyle) {
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.stroke();
  }

  context.restore();
}
