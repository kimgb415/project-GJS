import React, { createContext, useState } from "react";

export const DimensionConext = createContext();

export default function DimensionProvider(props) {
  const [current, setCurrent] = useState();
  const [previous, setPrevious] = useState();
  const [imageSource, setImageSource] = useState();

  const currentUpdate = (dimension) => {
    setCurrent(dimension[0]);
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
        currentUpdate: currentUpdate,
        previousUpdate: previousUpdate,
        imageSource: imageSource,
        imageSourceUpdate: imageSourceUpdate,
      }}
    >
      {props.children}
    </DimensionConext.Provider>
  );
}
