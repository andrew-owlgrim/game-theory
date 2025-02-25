import ID from "./id";
import { RenderView } from "../render";

export default class Entity {
  constructor(params = {}) {
    this.id = ID.generate() || params.id;
    this.body = params.body;
    this.view = new RenderView(params.view);
  }

  render() {
    throw new Error("render method must be realized in subclass");
  }
}
