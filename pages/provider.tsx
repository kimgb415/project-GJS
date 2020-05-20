import React from "react";
import DurationProvider from "../context/howLong";
import Routes from "../routes/routes";

export default function Provider() {
  return (
    <DurationProvider>
      <Routes />
    </DurationProvider>
  );
}
