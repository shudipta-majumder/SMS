"use client"
import React, { createContext, useContext, useState } from 'react';

const CalendarContext = createContext();

export const useCalendarContext = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
  const [isCalendarSaved, setIsCalendarSaved] = useState(false);
  const setCalendarSaved = () => {
    setIsCalendarSaved(true);
  };

  const resetCalendarSaved = () => {
    setIsCalendarSaved(false);
  };

  const contextValue = {
    isCalendarSaved,
    setCalendarSaved,
    resetCalendarSaved,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
