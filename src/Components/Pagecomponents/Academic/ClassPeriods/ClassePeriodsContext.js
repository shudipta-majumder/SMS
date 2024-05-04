"use client"
import React, { createContext, useContext, useState } from 'react';

const ClassePeriodsContext = createContext();

export const useClassePeriodsContext = () => useContext(ClassePeriodsContext);

export const ClassePeriodsProvider = ({ children }) => {
  const [isClassePeriodsSaved, setIsClassePeriodsSaved] = useState(false);

  const setClassePeriodsSaved = () => {
    setIsClassePeriodsSaved(true);
  };

  const resetClassePeriodsSaved = () => {
    setIsClassePeriodsSaved(false);
  };

  const contextValue = {
    isClassePeriodsSaved,
    setClassePeriodsSaved,
    resetClassePeriodsSaved,
  };

  return (
    <ClassePeriodsContext.Provider value={contextValue}>
      {children}
    </ClassePeriodsContext.Provider>
  );
};
