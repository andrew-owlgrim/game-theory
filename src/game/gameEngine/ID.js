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

// Alphabet base

const ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-.";

export function toAlphabetString(num) {
  if (num === 0) return ALPHABET[0];

  let result = "";
  const base = ALPHABET.length;

  while (num > 0) {
    result = ALPHABET[num % base] + result;
    num = Math.floor(num / base);
  }

  return result;
}
