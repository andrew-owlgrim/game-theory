import { useEffect, useState } from "react";

import proxyData from "../game";

const Test = () => {
  const [counterState, setCounterState] = useState(0);

  useEffect(() => {
    proxyData.onChange = () => {
      setCounterState(proxyData.counter);
    };
  }, []);

  const handleClick = () => {
    proxyData.counter += 1;
  };

  return <h1 onClick={handleClick}>{counterState}</h1>;
};

export default Test;
