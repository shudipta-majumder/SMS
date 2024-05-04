"use client"
import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const useSessionContext = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isSessionSaved, setIsSessionSaved] = useState(false);

  const setSessionSaved = () => {
    setIsSessionSaved(true);
  };

  const resetSessionSaved = () => {
    setIsSessionSaved(false);
  };

  const contextValue = {
    isSessionSaved,
    setSessionSaved,
    resetSessionSaved,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
