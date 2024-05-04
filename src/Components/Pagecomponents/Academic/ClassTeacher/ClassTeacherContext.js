"use client"
import React, { createContext, useContext, useState } from 'react';

const ClassTeacherContext = createContext();

export const useClassTeacherContext = () => useContext(ClassTeacherContext);

export const ClassTeacherProvider = ({ children }) => {
  const [isClassTeacherSaved, setIsClassTeacherSaved] = useState(false);
console.log("isClassTeacherSaved>>>", isClassTeacherSaved);
  const setClassTeacherSaved = () => {
    setIsClassTeacherSaved(true);
  };

  const resetClassTeacherSaved = () => {
    setIsClassTeacherSaved(false);
  };

  const contextValue = {
    isClassTeacherSaved,
    setClassTeacherSaved,
    resetClassTeacherSaved,
  };

  return (
    <ClassTeacherContext.Provider value={contextValue}>
      {children}
    </ClassTeacherContext.Provider>
  );
};
