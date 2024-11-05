const data = {
  counter: 0,
};

const handler = {
  set(target, property, value) {
    target[property] = value;
    if (property === "counter") {
      data.onChange();
    }
    return true;
  },
};

const proxyData = new Proxy(data, handler);

export default proxyData;
