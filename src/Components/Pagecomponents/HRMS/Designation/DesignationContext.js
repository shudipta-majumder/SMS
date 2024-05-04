"use client"
import React, { createContext, useContext, useState } from 'react';

const DesignationContext = createContext();

export const useDesignationContext = () => useContext(DesignationContext);

export const DesignationProvider = ({ children }) => {
  const [isDesignationSaved, setIsDesignationSaved] = useState(false);

  const setDesignationSaved = () => {
    setIsDesignationSaved(true);
  };

  const resetDesignationSaved = () => {
    setIsDesignationSaved(false);
  };

  const contextValue = {
    isDesignationSaved,
    setDesignationSaved,
    resetDesignationSaved,
  };

  return (
    <DesignationContext.Provider value={contextValue}>
      {children}
    </DesignationContext.Provider>
  );
};
