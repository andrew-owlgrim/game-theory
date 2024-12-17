export default class Renderer {
  constructor({ canvas, entities, layers = [], camera }) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.entities = entities; // Объект с игровыми сущностями
    this.layers = layers; // Массив слоёв, которые нужно отрендерить
    this.camera = camera; // Ссылка на камеру

    this.isRunning = false; // Статус рендера
    this.animationFrameId = null; // ID текущего requestAnimationFrame

    // Resize observer для слежения за изменением размеров canvas
    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this.resizeObserver.observe(this.canvas);
    this.resizeCanvas(); // Устанавливаем начальные размеры
  }

  // Clear

  clearCanvas() {
    const { context, canvas } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Camera

  setCamera(center, scale) {
    this.camera.position = center;
    this.camera.scale = scale;
  }

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

  getEntitiesByLayer() {
    // Группируем сущности по слоям
    return this.layers.flatMap((layer) =>
      this.entities.filter((entity) => entity.layer === layer)
    );
  }

  // Render

  render() {
    this.clearCanvas();
    this.applyCamera();

    // Получаем сущности, отсортированные по слоям
    const sortedEntities = this.getEntitiesByLayer();

    // Рендерим каждую сущность, вызывая её метод render
    sortedEntities.forEach((entity) => {
      if (entity.view && typeof entity.view.render === "function") {
        const screenPosition = this.getScreenPosition(entity.position);
        const screenSize = this.getScreenSize(entity.size);
        entity.view.render({
          context: this.context,
          position: screenPosition,
          size: screenSize,
          rotation: entity.body?.angle || 0,
          scale: this.camera.scale,
        });
      }
    });

    this.resetCamera();
  }

  getScreenPosition(worldPosition) {
    const { position: cameraPosition, scale } = this.camera;
    return {
      x: (worldPosition.x - cameraPosition.x) * scale + this.canvas.width / 2,
      y: (worldPosition.y - cameraPosition.y) * scale + this.canvas.height / 2,
    };
  }

  getScreenSize(worldSize) {
    return {
      x: worldSize.x * this.camera.scale,
      y: worldSize.y * this.camera.scale,
    };
  }

  // Loop

  loop() {
    if (!this.isRunning) return; // Проверяем статус перед продолжением
    this.render();
    this.animationFrameId = requestAnimationFrame(this.loop);
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

    // Устанавливаем фактические размеры canvas
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
