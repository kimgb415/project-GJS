import React, { createContext, useState, useCallback } from "react";

export const DimensionConext = createContext();

export default function DimensionProvider(props) {
  const [current, setCurrent] = useState();
  const [previous, setPrevious] = useState();
  const [imageSource, setImageSource] = useState();

  const currentUpate = (dimension) => {
    setCurrent(dimension);
  };

  const previousUpdate = (dimension) => {
    setPrevious(dimension);
  };

  const imageSourceUpdate = (src) => {
    setImageSource(src);
  };

  return (
    <DimensionConext.Provider
      value={{
        current: current,
        previous: previous,
        currentUpate: currentUpate,
        previousUpdate: previousUpdate,
        imageSource: imageSource,
        imageSourceUpdate: imageSourceUpdate,
      }}
    >
      {props.children}
    </DimensionConext.Provider>
  );
}
