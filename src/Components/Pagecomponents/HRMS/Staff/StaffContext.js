"use client"
import React, { createContext, useContext, useState } from 'react';

const StaffContext = createContext();

export const useStaffContext = () => useContext(StaffContext);

export const StaffProvider = ({ children }) => {
  const [isStaffSaved, setIsStaffSaved] = useState(false);

  const setStaffSaved = () => {
    setIsStaffSaved(true);
  };

  const resetStaffSaved = () => {
    setIsStaffSaved(false);
  };

  const contextValue = {
    isStaffSaved,
    setStaffSaved,
    resetStaffSaved,
  };

  return (
    <StaffContext.Provider value={contextValue}>
      {children}
    </StaffContext.Provider>
  );
};
