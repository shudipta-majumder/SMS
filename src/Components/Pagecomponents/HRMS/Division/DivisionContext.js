"use client"
import React, { createContext, useContext, useState } from 'react';

const DivisionContext = createContext();

export const useDivisionContext = () => useContext(DivisionContext);

export const DivisionProvider = ({ children }) => {
  const [isDivisionSaved, setIsDivisionSaved] = useState(false);

  const setDivisionSaved = () => {
    setIsDivisionSaved(true);
  };

  const resetDivisionSaved = () => {
    setIsDivisionSaved(false);
  };

  const contextValue = {
    isDivisionSaved,
    setDivisionSaved,
    resetDivisionSaved,
  };

  return (
    <DivisionContext.Provider value={contextValue}>
      {children}
    </DivisionContext.Provider>
  );
};
