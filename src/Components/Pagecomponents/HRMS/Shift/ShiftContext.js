"use client"
import React, { createContext, useContext, useState } from 'react';

const ShiftContext = createContext();

export const useShiftContext = () => useContext(ShiftContext);

export const ShiftProvider = ({ children }) => {
  const [isShiftSaved, setIsShiftSaved] = useState(false);

  const setShiftSaved = () => {
    setIsShiftSaved(true);
  };

  const resetShiftSaved = () => {
    setIsShiftSaved(false);
  };

  const contextValue = {
    isShiftSaved,
    setShiftSaved,
    resetShiftSaved,
  };

  return (
    <ShiftContext.Provider value={contextValue}>
      {children}
    </ShiftContext.Provider>
  );
};
