"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
// import _debounce from "lodash.debounce";
import DefaultPalette from "../utility/useColor";
import lightenColor from "../utility/useColorSteper";

const OnlyIconContext = createContext();

export const OnlyIconProvider = ({ children }) => {
  const [onlyIcon, setOnlyIcon] = useState(false);
  const [hovering, setHovering] = useState(false);
  const storedColor = localStorage.getItem("color");
  const [color, setColor] = useState(storedColor || "#786CF1");
  const storedMode = localStorage.getItem("mode");
  const [dayMode, setDayMode] = useState(storedMode || "light");
  const [deviceTheme, setDeviceTheme] = useState(null);

  const colorX = lightenColor(color, 30);
  const colorY = lightenColor(color, 100);
  const palette = DefaultPalette(dayMode, "bordered", colorX);

  const handleRedColor = () => {
    setColor("#7367F0");
    localStorage.setItem("color", "#7367F0");
  };
  const handleBlueColor = () => {
    setColor("#a8aaae");
    localStorage.setItem("color", "#a8aaae");
  };
  const handleColorThree = () => {
    setColor("#28c76f");
    localStorage.setItem("color", "#28c76f");
  };
  const handleColorFour = () => {
    setColor("#ea5455");
    localStorage.setItem("color", "#ea5455");
  };
  const handleColorFive = () => {
    setColor("#ff9f43");
    localStorage.setItem("color", "#ff9f43");
  };

  const handleColorSet = (e) => {
    debouncedHandleColorSet(e.target.value);
  };

  // const debouncedHandleColorSet = _debounce((value) => {
  //   setColor(value);
  //   localStorage.setItem("color", value);
  // }, 100);

  const toggleOnlyIcon = () => {
    setOnlyIcon((prevOnlyIcon) => !prevOnlyIcon);
  };

  // const handleDeviceTheme = () => {
  //   // setDeviceTheme("deafult");
  //   setDeviceTheme((prevDayMode) => {
  //     const newMode = prevDayMode === "deafult" ? "not" : "deafult";
  //     return newMode;
  //   });
  // };

  const handleMood = (selectedMode) => {
    setDayMode(selectedMode);
    localStorage.setItem("mode", selectedMode);
  };

  // useEffect(() => {
  //   if (deviceTheme === "deafult") {
  //     const prefersDarkModeQuery = window.matchMedia(
  //       "(prefers-color-scheme: dark)"
  //     );

  //     // Function to handle theme change
  //     const handleThemeChange = (prefersDarkMode) => {
  //       const newMode = prefersDarkMode ? "dark" : "light";
  //       if (deviceTheme === "deafult") {
  //         setDayMode(newMode);
  //         localStorage.setItem("mode", newMode);
  //       }
  //     };

  //     // Initial check
  //     handleThemeChange(prefersDarkModeQuery.matches);

  //     // Add a listener to detect changes
  //     prefersDarkModeQuery.addListener((e) => {
  //       handleThemeChange(e.matches);
  //     });

  //     // Cleanup listener on component unmount
  //     return () => {
  //       prefersDarkModeQuery.removeListener(handleThemeChange);
  //     };
  //   } else {
  //     console.log("xxxxxxxxxxxxxxx");
  //   }
  // }, [deviceTheme]);

  useEffect(() => {
    document.body.style.backgroundColor =
      dayMode === "dark" ? "#25293c" : "#f8f7fa";
  }, [dayMode]);

  const contextValue = {
    onlyIcon,
    setOnlyIcon,
    toggleOnlyIcon,
    hovering,
    setHovering,
    color,
    colorX,
    colorY,
    handleBlueColor,
    handleRedColor,
    handleColorSet,
    handleMood,
    palette,
    storedMode,
    setDeviceTheme,
    handleColorThree,
    handleColorFour,
    handleColorFive,
  };

  return (
    <OnlyIconContext.Provider value={contextValue}>
      {children}
    </OnlyIconContext.Provider>
  );
};

export const useOnlyIcon = () => {
  return useContext(OnlyIconContext);
};
