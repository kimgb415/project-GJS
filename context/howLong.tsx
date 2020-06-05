import React, { createContext, useState } from "react";

export const Duration = createContext();

const DurationProvider = (props) => {
  const [duration, setDuration] = useState(0);
  const [foodId, setFoodId] = useState(null);
  const [start, setStart] = useState();

  const startUpdate = (startTime) => {
    setStart(startTime);
  };

  const foodIdUpdate = (id) => {
    setFoodId(id);
  };

  const durationUpdate = (end) => {
    setDuration(end.getTime() - start.getTime());
  };

  return (
    <Duration.Provider
      value={{
        duration: duration,
        durationUpdate: durationUpdate,
        foodId: foodId,
        foodIdUpdate: foodIdUpdate,
        startUpdate: startUpdate,
      }}
    >
      {props.children}
    </Duration.Provider>
  );
};

export default DurationProvider;
