"use client"
import React, { createContext, useContext, useState } from 'react';

const ClasseContext = createContext();

export const useClasseContext = () => useContext(ClasseContext);

export const ClasseProvider = ({ children }) => {
  const [isClasseSaved, setIsClasseSaved] = useState(false);

  const setClasseSaved = () => {
    setIsClasseSaved(true);
  };

  const resetClasseSaved = () => {
    setIsClasseSaved(false);
  };

  const contextValue = {
    isClasseSaved,
    setClasseSaved,
    resetClasseSaved,
  };

  return (
    <ClasseContext.Provider value={contextValue}>
      {children}
    </ClasseContext.Provider>
  );
};
