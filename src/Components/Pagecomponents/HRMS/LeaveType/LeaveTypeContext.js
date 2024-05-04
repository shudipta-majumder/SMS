"use client"
import React, { createContext, useContext, useState } from 'react';

const LeaveTypeContext = createContext();

export const useLeaveTypeContext = () => useContext(LeaveTypeContext);

export const LeaveTypeProvider = ({ children }) => {
  const [isLeaveTypeSaved, setIsLeaveTypeSaved] = useState(false);

  const setLeaveTypeSaved = () => {
    setIsLeaveTypeSaved(true);
  };

  const resetLeaveTypeSaved = () => {
    setIsLeaveTypeSaved(false);
  };

  const contextValue = {
    isLeaveTypeSaved,
    setLeaveTypeSaved,
    resetLeaveTypeSaved,
  };

  return (
    <LeaveTypeContext.Provider value={contextValue}>
      {children}
    </LeaveTypeContext.Provider>
  );
};
