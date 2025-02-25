export default function drawPerson(context, person) {
  const size = person.body.circleRadius * 2;
  const position = person.body.position;
  const rotation =
    Math.atan2(person.body.velocity.y, person.body.velocity.x) + Math.PI / 2;
  const emoji = person.emoji;
  const color = person.view.fillStyle;

  context.save();

  context.translate(position.x, position.y);
  context.rotate(rotation);

  context.fillStyle = color;
  context.font = `700 ${size}px "Noto Emoji"`;
  context.textAlign = "center";
  const yOffset = 0.33;

  context.fillText(emoji, 0, yOffset * size);

  context.restore();
}
