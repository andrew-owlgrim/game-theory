export default function drawBody({ context, body, view } = {}) {
  const { fillStyle, strokeStyle, lineWidth = 1 } = view;
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
