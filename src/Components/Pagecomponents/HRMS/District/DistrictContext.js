"use client"
import React, { createContext, useContext, useState } from 'react';

const DistrictContext = createContext();

export const useDistrictContext = () => useContext(DistrictContext);

export const DistrictProvider = ({ children }) => {
  const [isDistrictSaved, setIsDistrictSaved] = useState(false);

  const setDistrictSaved = () => {
    setIsDistrictSaved(true);
  };

  const resetDistrictSaved = () => {
    setIsDistrictSaved(false);
  };

  const contextValue = {
    isDistrictSaved,
    setDistrictSaved,
    resetDistrictSaved,
  };

  return (
    <DistrictContext.Provider value={contextValue}>
      {children}
    </DistrictContext.Provider>
  );
};
