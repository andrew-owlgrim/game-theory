import { toAlphabetString } from "@/utils/common";

export default class ID {
  static counter = 0;
  static baseTimeStamp = 0;
  static generate = () => {
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    if (ID.baseTimeStamp !== currentTimeStamp) {
      ID.baseTimeStamp = currentTimeStamp;
      ID.counter = 0;
    }
    return `${toAlphabetString(ID.baseTimeStamp)}-${toAlphabetString(
      ID.counter++
    )}`;
  };
}
