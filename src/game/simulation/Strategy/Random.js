import { random } from "@/utils/mathUtils";
import Strategy from "./Strategy";

export default class Random extends Strategy {
  static name = "random";

  constructor() {
    super(); //👍
  }

  makeMove(personId) {
    return !!random(2);
  }
}
