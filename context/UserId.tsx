import React, { createContext, useState } from "react";

export const UserId = createContext();

const UserIdProvider = (props) => {
  const [user, setUser] = useState(0);

  const submitUserId = (id) => {
    setUser(id);
  };

  return (
    <UserId.Provider value={{ user: user, submitUserId: submitUserId }}>
      {props.children}
    </UserId.Provider>
  );
};

export default UserIdProvider;
