export default class Transition {
  constructor({ setter, from, to, duration, easing = "linear" }) {
    this.setter = setter;
    this.from = from;
    this.to = to;
    this.duration = duration;
    this.elapsedTime = 0;
    this.easingFunction = this.#getEasingFunction(easing);
    this.active = true;
  }

  update(deltaTime) {
    if (!this.active) return;

    this.elapsedTime += deltaTime;
    const t = Math.min(this.elapsedTime / this.duration, 1);
    const easedT = this.easingFunction(t);
    const value = this.from + (this.to - this.from) * easedT;
    this.setter(value);

    if (t >= 1) this.active = false;
  }

  #getEasingFunction(type) {
    const easingFunctions = {
      linear: (t) => t,
      easeIn: (t) => t * t,
      easeOut: (t) => t * (2 - t),
      easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    };
    return easingFunctions[type] || easingFunctions.linear;
  }
}
