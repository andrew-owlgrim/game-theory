import Transition from "@/utils/Transition";

import { GameEffect } from "../../gameEngine";
import { Transform } from "../../render";

import Text from "../entities/Text/Text";
import { hexOverlay } from "@/utils/color";

export default class InteractionEffect extends GameEffect {
  constructor({ game, person, score, mistake }) {
    super({
      game,
      key: `interaction-${person.id}`,
      duration: game.cfg.interactionEffectDuration,
    });

    this.person = person;
    this.score = score;
    this.text = null;
    this.textTransition = null;
    this.mistake = mistake;
  }

  init() {
    const game = this.game;

    this.person.state = this.#getEmoji();
    this.color = this.person.view.fillStyle;

    this.colorTransition = new Transition({
      setter: (value) =>
        (this.person.view.fillStyle = hexOverlay(this.color, "#fff", value)),
      from: 0.8,
      to: 0,
      duration: this.duration / 3,
      easing: "easeOut",
    });

    this.text = new Text({
      relatedEntity: this.person,
      value: this.score > 0 ? "+" + this.score : "" + this.score,
      view: {
        layer: "effects",
        transform: new Transform({
          translate: { x: 0, y: -game.cfg.personSize },
        }),
        font: "Onest, sans-serif",
        fontSize: game.cfg.personSize / 2,
        fillStyle: "#fff",
      },
    });
    this.game.addEntity(this.text);

    this.textTransition = new Transition({
      setter: (value) => (this.text.view.opacity = value),
      from: 1,
      to: 0,
      duration: this.duration,
      easing: "easeIn",
    });
  }

  clear() {
    this.person.state = null;
    this.person.view.fillStyle = this.color;
    this.colorTransition = null;

    this.game.removeEntity(this.text);
    this.text = null;
    this.textTransition = null;
  }

  update(deltaTime) {
    this.colorTransition?.update(deltaTime);
    this.textTransition?.update(deltaTime);

    if (this.elapsedTime >= this.duration / 3) {
      this.person.view.fillStyle = this.color;
      this.colorTransition = null;
    }

    if (this.elapsedTime >= this.duration / 2) this.person.state = null;

    if (this.elapsedTime >= this.duration) {
      this.game.removeEntity(this.text);
      this.text = null;
    }
  }

  #getEmoji() {
    const states = this.game.cfg.personStates;
    if (this.mistake) return states.mistake;
    if (this.score > 0) return states.happy;
    if (this.score < 0) return states.upset;
    return states.neutral;
  }
}
