"use client";
import React, { createContext, useContext, useState } from "react";

const BoardContext = createContext();

export const useBoardContext = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const [isBoardSaved, setIsBoardSaved] = useState(false);

  const setBoardSaved = () => {
    setIsBoardSaved(true);
  };

  const resetBoardSaved = () => {
    setIsBoardSaved(false);
  };

  const contextValue = {
    isBoardSaved,
    setBoardSaved,
    resetBoardSaved,
  };

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};
