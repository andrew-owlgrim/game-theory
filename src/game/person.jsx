import { toAlphabetString } from "../utils/common";
import getRandomName from "./names";
import { getRandomStrategy } from "./strategy";

class Person {
  static counter = 0;
  static baseTimeStamp = 0;

  constructor({
    name = getRandomName(),
    strategy = getRandomStrategy(),
    score = 0,
  } = {}) {
    this.id = Person.generateId();
    this.name = name;
    this.strategy = strategy;
    this.score = score;
    this.memory = {};
  }

  static generateId = () => {
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    if (Person.baseTimeStamp !== currentTimeStamp) {
      Person.baseTimeStamp = currentTimeStamp;
      Person.counter = 0;
    }
    return `${toAlphabetString(Person.baseTimeStamp)}-${toAlphabetString(
      Person.counter++
    )}`;
  };
}

export default Person;
