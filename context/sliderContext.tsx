import React, { createContext, useState } from "react";

export const SliderContext = createContext();

export const SliderProvider = (props) => {
  const [value, setValue] = useState(3);

  const valueUpdate = (num) => {
    setValue(num);
  };

  return (
    <SliderContext.Provider value={{ value: value, valueUpdate: valueUpdate }}>
      {props.children}
    </SliderContext.Provider>
  );
};

export default SliderProvider;
