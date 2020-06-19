import React from "react";
import DurationProvider from "../context/howLong";
import Routes from "../routes/routes";
import UserIdProvider from "../context/UserId";
import CaseProvider from "../context/caseContext";

export default function Provider() {
  return (
    <UserIdProvider>
      <DurationProvider>
        <CaseProvider>
          <Routes />
        </CaseProvider>
      </DurationProvider>
    </UserIdProvider>
  );
}
