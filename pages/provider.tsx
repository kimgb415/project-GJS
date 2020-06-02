import React from "react";
import DurationProvider from "../context/howLong";
import Routes from "../routes/routes";
import UserIdProvider from "../context/UserId";

export default function Provider() {
  return (
    <UserIdProvider>
      <DurationProvider>
        <Routes />
      </DurationProvider>
    </UserIdProvider>
  );
}
