import { Events } from "matter-js";
import { GameManager } from "../../gameEngine";
import { RenderView } from "../../render";

export default class DebugOverlay extends GameManager {
  constructor(game, enabled) {
    super(game);

    this.data = [];
    this.position = { x: 8, y: 8 };
    this.view = new RenderView({
      layer: "overlay",
      fillStyle: "white",
      font: "monospace",
      fontSize: 12,
      lineHeight: 16,
    });

    this.clear = this.#init();
  }

  #init() {
    const handleAfterRender = () => {
      this.#updateData();
      this.render();
    };

    Events.on(this.game.render, "afterRender", handleAfterRender);

    return () => {
      Events.off(this.game.render, "afterRender", handleAfterRender);
    };
  }

  #updateData() {
    this.data = [this.#getDays(), this.#getWeights()].flat();
  }

  render() {
    drawStrings({
      context: this.game.render.context,
      strings: this.data,
      position: this.position,
      view: this.view,
    });
  }

  #getDays() {
    return "days: " + this.game.managers.timeManager.currentDay;
  }

  #getWeights() {
    const game = this.game;
    const weights = ["weights: "];
    const strategyWeights = game.managers.personManager.strategyWeights;
    for (const strategy in strategyWeights) {
      weights.push(
        "  " +
          strategy +
          ": " +
          Math.round(strategyWeights[strategy] * 1000) / 1000
      );
    }
    return weights;
  }
}

function drawStrings({ context, strings, position, view }) {
  let { x, y } = position;

  for (const string of strings) {
    drawString({ context, string, position: { x, y }, view });
    y += view.lineHeight;
  }
}

function drawString({ context, string, position, view }) {
  const { x, y } = position;
  const { font, fontSize, fillStyle } = view;

  context.save();

  context.font = `${fontSize}px ${font}`;
  context.fillStyle = fillStyle;
  context.textAlign = "left";
  context.textBaseline = "top";

  context.shadowColor = "black";
  context.shadowOffsetX = 1;
  context.shadowOffsetY = 1;
  context.shadowBlur = 0;

  context.fillText(string, x, y);

  context.restore();
}
