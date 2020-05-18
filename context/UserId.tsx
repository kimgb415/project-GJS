import React, { createContext, useState } from "react";

export const UserId = createContext();

const UserIdProvider = (props: any) => {
  const [user, setUser] = useState(0);

  const submitUserId = (id: number) => {
    setUser(id);
  };

  return (
    <UserId.Provider value={{ user: user, submitUserId: submitUserId }}>
      {props.children}
    </UserId.Provider>
  );
};

export default UserIdProvider;
