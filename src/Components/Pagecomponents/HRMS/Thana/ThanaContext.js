"use client"
import React, { createContext, useContext, useState } from 'react';

const ThanaContext = createContext();

export const useThanaContext = () => useContext(ThanaContext);

export const ThanaProvider = ({ children }) => {
  const [isThanaSaved, setIsThanaSaved] = useState(false);

  const setThanaSaved = () => {
    setIsThanaSaved(true);
  };

  const resetThanaSaved = () => {
    setIsThanaSaved(false);
  };

  const contextValue = {
    isThanaSaved,
    setThanaSaved,
    resetThanaSaved,
  };

  return (
    <ThanaContext.Provider value={contextValue}>
      {children}
    </ThanaContext.Provider>
  );
};
