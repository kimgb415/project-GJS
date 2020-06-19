import React, { createContext, useState } from "react";

export const Case = createContext();

const CaseProvider = (props) => {
  const [mode, setMode] = useState(0);

  const modeUpdate = (value) => {
    setMode(value);
  };

  return (
    <Case.Provider value={{ mode: mode, modeUpdate: modeUpdate }}>
      {props.children}
    </Case.Provider>
  );
};

export default CaseProvider;
