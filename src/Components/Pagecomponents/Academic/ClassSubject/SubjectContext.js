"use client"
import React, { createContext, useContext, useState } from 'react';

const SubjectContext = createContext();

export const useSubjectContext = () => useContext(SubjectContext);

export const SubjectProvider = ({ children }) => {
  const [isSubjectSaved, setIsSubjectSaved] = useState(false);

  const setSubjectSaved = () => {
    setIsSubjectSaved(true);
  };

  const resetSubjectSaved = () => {
    setIsSubjectSaved(false);
  };

  const contextValue = {
    isSubjectSaved,
    setSubjectSaved,
    resetSubjectSaved,
  };

  return (
    <SubjectContext.Provider value={contextValue}>
      {children}
    </SubjectContext.Provider>
  );
};
