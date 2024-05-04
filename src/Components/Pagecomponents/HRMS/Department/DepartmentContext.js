"use client"
import React, { createContext, useContext, useState } from 'react';

const DepartmentContext = createContext();

export const useDepartmentContext = () => useContext(DepartmentContext);

export const DepartmentProvider = ({ children }) => {
  const [isDepartmentSaved, setIsDepartmentSaved] = useState(false);

  const setDepartmentSaved = () => {
    setIsDepartmentSaved(true);
  };

  const resetDepartmentSaved = () => {
    setIsDepartmentSaved(false);
  };

  const contextValue = {
    isDepartmentSaved,
    setDepartmentSaved,
    resetDepartmentSaved,
  };

  return (
    <DepartmentContext.Provider value={contextValue}>
      {children}
    </DepartmentContext.Provider>
  );
};
