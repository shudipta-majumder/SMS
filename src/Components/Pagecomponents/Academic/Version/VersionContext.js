"use client"
import React, { createContext, useContext, useState } from 'react';

const VersionContext = createContext();

export const useVersionContext = () => useContext(VersionContext);

export const VersionProvider = ({ children }) => {
  const [isVersionSaved, setIsVersionSaved] = useState(false);

  const setVersionSaved = () => {
    setIsVersionSaved(true);
  };

  const resetVersionSaved = () => {
    setIsVersionSaved(false);
  };

  const contextValue = {
    isVersionSaved,
    setVersionSaved,
    resetVersionSaved,
  };

  return (
    <VersionContext.Provider value={contextValue}>
      {children}
    </VersionContext.Provider>
  );
};
