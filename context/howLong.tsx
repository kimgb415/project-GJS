import React, { createContext, useState } from "react";

export const Duration = createContext();

const DurationProvider = (props: any) => {
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);

  const startUpdate = (startTime: number) => {
    setStart(startTime);
  };

  const durationUpdate = () => {
    const end = new Date().getTime();
    setDuration(end - start);
  };

  return (
    <Duration.Provider
      value={{
        duration: duration,
        durationUpdate: durationUpdate,
        startUpdate: startUpdate,
      }}
    >
      {props.children}
    </Duration.Provider>
  );
};

export default DurationProvider;
