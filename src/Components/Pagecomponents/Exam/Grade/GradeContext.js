"use client"
import React, { createContext, useContext, useState } from 'react';

const GradeContext = createContext();

export const useGradeContext = () => useContext(GradeContext);

export const GradeProvider = ({ children }) => {
  const [isGradeSaved, setIsGradeSaved] = useState(false);

  const setGradeSaved = () => {
    setIsGradeSaved(true);
  };

  const resetGradeSaved = () => {
    setIsGradeSaved(false);
  };

  const contextValue = {
    isGradeSaved,
    setGradeSaved,
    resetGradeSaved,
  };

  return (
    <GradeContext.Provider value={contextValue}>
      {children}
    </GradeContext.Provider>
  );
};
