"use client"
import React, { createContext, useContext, useState } from 'react';

const SectionContext = createContext();

export const useSectionContext = () => useContext(SectionContext);

export const SectionProvider = ({ children }) => {
  const [isSectionSaved, setIsSectionSaved] = useState(false);

  const setSectionSaved = () => {
    setIsSectionSaved(true);
  };

  const resetSectionSaved = () => {
    setIsSectionSaved(false);
  };

  const contextValue = {
    isSectionSaved,
    setSectionSaved,
    resetSectionSaved,
  };

  return (
    <SectionContext.Provider value={contextValue}>
      {children}
    </SectionContext.Provider>
  );
};
