import React, { createContext, useState } from "react";

export const Count = createContext();

const CountProvider = (props) => {
  const [counting, setCounting] = useState(0);

  const countingPlus = () => {
    setCounting(counting + 1);
  };

  return (
    <Count.Provider value={{ counting: counting, countingPlus: countingPlus }}>
      {props.children}
    </Count.Provider>
  );
};

export default CountProvider;
