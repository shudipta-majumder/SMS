"use client"
import React, { createContext, useContext, useState } from 'react';

const BankContext = createContext();

export const useBankContext = () => useContext(BankContext);

export const BankProvider = ({ children }) => {
  const [isBankSaved, setIsBankSaved] = useState(false);

  const setBankSaved = () => {
    setIsBankSaved(true);
  };

  const resetBankSaved = () => {
    setIsBankSaved(false);
  };

  const contextValue = {
    isBankSaved,
    setBankSaved,
    resetBankSaved,
  };

  return (
    <BankContext.Provider value={contextValue}>
      {children}
    </BankContext.Provider>
  );
};
