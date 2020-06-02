import React, { createContext, useState } from "react";

export const UserId = createContext();

const UserIdProvider = (props: any) => {
  const [user, setUser] = useState(0);
  const [userLocation, setUserLocation] = useState({});
  const [userDevice, setUserDevice] = useState("Unknown");

  const submitUserId = (id: number) => {
    setUser(id);
  };

  return (
    <UserId.Provider
      value={{
        userLocation: userLocation,
        user: user,
        userDevice: userDevice,
        submitUserId: submitUserId,
      }}
    >
      {props.children}
    </UserId.Provider>
  );
};

export default UserIdProvider;
