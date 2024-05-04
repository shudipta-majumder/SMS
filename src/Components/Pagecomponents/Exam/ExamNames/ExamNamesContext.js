"use client"
import React, { createContext, useContext, useState } from 'react';

const ExamNamesContext = createContext();

export const useExamNamesContext = () => useContext(ExamNamesContext);

export const ExamNamesProvider = ({ children }) => {
  const [isExamNamesSaved, setIsExamNamesSaved] = useState(false);

  const setExamNamesSaved = () => {
    setIsExamNamesSaved(true);
  };

  const resetExamNamesSaved = () => {
    setIsExamNamesSaved(false);
  };

  const contextValue = {
    isExamNamesSaved,
    setExamNamesSaved,
    resetExamNamesSaved,
  };

  return (
    <ExamNamesContext.Provider value={contextValue}>
      {children}
    </ExamNamesContext.Provider>
  );
};
