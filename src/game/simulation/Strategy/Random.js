import { random } from "@/utils/mathUtils";
import Strategy from "./Strategy";

export default class Random extends Strategy {
  constructor() {
    super(); //👍
    this.name = "random";
  }

  makeMove(personId) {
    return !!random();
  }
}
