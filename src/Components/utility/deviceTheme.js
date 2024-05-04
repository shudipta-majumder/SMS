const DefaultPalette = () => {
  const prefersDarkModeQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  // Function to handle theme change
  const handleThemeChange = (prefersDarkMode) => {
    const newMode = prefersDarkMode ? "dark" : "light";
    setDayMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  // Initial check
  handleThemeChange(prefersDarkModeQuery.matches);

  // Add a listener to detect changes
  prefersDarkModeQuery.addListener((e) => {
    handleThemeChange(e.matches);
  });
  // Cleanup listener on component unmount
  return () => {
    prefersDarkModeQuery.removeListener(handleThemeChange);
  };
};

export default DefaultPalette;
