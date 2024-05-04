"use client"
import React, { createContext, useContext, useState } from 'react';

const CountryContext = createContext();

export const useCountryContext = () => useContext(CountryContext);

export const CountryProvider = ({ children }) => {
  const [isCountrySaved, setIsCountrySaved] = useState(false);

  const setCountrySaved = () => {
    setIsCountrySaved(true);
  };

  const resetCountrySaved = () => {
    setIsCountrySaved(false);
  };

  const contextValue = {
    isCountrySaved,
    setCountrySaved,
    resetCountrySaved,
  };

  return (
    <CountryContext.Provider value={contextValue}>
      {children}
    </CountryContext.Provider>
  );
};
