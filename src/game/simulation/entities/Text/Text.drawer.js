export default function drawText(context, entity) {
  const { body, relatedEntity, view, value } = entity;
  const { x, y } = body ? body.position : relatedEntity.body.position;
  const { font, fontSize, fillStyle } = view;

  context.save();

  context.font = `${fontSize}px ${font}`;
  context.fillStyle = fillStyle;
  context.textAlign = "center";
  context.textBaseline = "middle";

  context.shadowColor = "black";
  context.shadowOffsetX = 1;
  context.shadowOffsetY = 1;
  context.shadowBlur = 0;

  context.fillText(value, x, y);

  context.restore();
}
