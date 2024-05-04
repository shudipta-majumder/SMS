"use client"
import React, { createContext, useContext, useState } from 'react';

const ClasseRoomContext = createContext();

export const useClasseRoomContext = () => useContext(ClasseRoomContext);

export const ClasseRoomProvider = ({ children }) => {
  const [isClasseRoomSaved, setIsClasseRoomSaved] = useState(false);

  const setClasseRoomSaved = () => {
    setIsClasseRoomSaved(true);
  };

  const resetClasseRoomSaved = () => {
    setIsClasseRoomSaved(false);
  };

  const contextValue = {
    isClasseRoomSaved,
    setClasseRoomSaved,
    resetClasseRoomSaved,
  };

  return (
    <ClasseRoomContext.Provider value={contextValue}>
      {children}
    </ClasseRoomContext.Provider>
  );
};
