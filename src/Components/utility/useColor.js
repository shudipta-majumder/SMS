const DefaultPalette = (mode, skin, colorX) => {
  // ** Vars
  const whiteColor = "#FFF";
  const lightColor = "51, 48, 60";
  const darkColor = "228, 230, 244";
  const darkPaperBgColor = "#2F3349";
  const mainColor = mode === "light" ? lightColor : darkColor;

  const defaultBgColor = () => {
    if (skin === "bordered" && mode === "light") {
      return whiteColor;
    } else if (skin === "bordered" && mode === "dark") {
      return darkPaperBgColor;
    } else if (mode === "light") {
      return "#F8F7FA";
    } else return "#25293C";
  };

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      lightPaperBg: whiteColor,
      darkPaperBg: darkPaperBgColor,
      sideboxBg:
        mode === "light"
          ? "white"
          : mode === "semiDark"
          ? "#2f3349"
          : "#2f3349",
      sideboxStudentBg:
        mode === "light"
          ? "white"
          : mode === "semiDark"
          ? "black"
          : "#2f3349",
      boxBg: mode === "light" || mode === "semiDark" ? "white" : "#2f3349",
      bodyBg: mode === "light" || mode === "semiDark" ? "#f8f7fa" : "black",
      trackBg: mode === "light" || mode === "semiDark" ? "#F1F0F2" : "#3B405B",
      avatarBg: mode === "light" || mode === "semiDark" ? "#F6F6F7" : "#4A5072",
      tableHeaderBg:
        mode === "light" || mode === "semiDark" ? "#717BBC" : "#4A5072",
      tableHeaderBg2:
        mode === "light" || mode === "semiDark" ? "#e6e1f5" : "#4A5072",
    },
    mode: mode,
    common: {
      black: "#000",
      white: whiteColor,
    },
    primary: {
      light: "#8479F2",
      main: "#7367F0",
      dark: "#655BD3",
      contrastText: whiteColor,
    },
    secondary: {
      light: "#B2B4B8",
      main: "#A8AAAE",
      dark: "#949699",
      contrastText: whiteColor,
    },
    error: {
      light: "#ED6F70",
      main: "#EA5455",
      dark: "#CE4A4B",
      contrastText: whiteColor,
    },
    warning: {
      light: "#FFAB5A",
      main: "#FF9F43",
      dark: "#E08C3B",
      contrastText: whiteColor,
    },
    info: {
      light: "#1FD5EB",
      main: "#00CFE8",
      dark: "#00B6CC",
      contrastText: whiteColor,
    },
    success: {
      light: "#42CE80",
      main: "#28C76F",
      dark: "#23AF62",
      contrastText: whiteColor,
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#F5F5F5",
      A200: "#EEEEEE",
      A400: "#BDBDBD",
      A700: "#616161",
    },
    text: {
      primary: mode === "light" || mode === "semiDark" ? "gray" : "white",
      secondary: mode === "light" || mode === "semiDark" ? "black" : "white",
      modarate: mode === "light" || mode === "semiDark" ? "#B6B6B7" : "#a09ce3",
      disabled: `rgba(${mainColor}, 0.38)`,
    },
    logo: {
      primary: mode === "light" ? "" : "invert(1) brightness(100%)",
      secondary: mode === "light" || mode === "semiDark" ? "black" : "#4212c4",
    },
    search: {
      bg: mode === "light" || mode === "semiDark" ? "#F8F7FA" : "#25293c",
      text: mode === "light" || mode === "semiDark" ? "#9c9c9e" : "white",
    },
    table: {
      bg: mode === "light" || mode === "semiDark" ? "white" : "#25293c",
      text: mode === "light" || mode === "semiDark" ? "black" : "white",
      texthover: mode === "light" || mode === "semiDark" ? "black" : "#a09ce3",
      rownth: mode === "light" || mode === "semiDark" ? "#E8E7FD" : "#363a50",
      rowhover: mode === "light" || mode === "semiDark" ? "#eed3ff" : "#5b5e71",
    },
    menuButton: {
      hover: mode === "dark" || mode === "semiDark" ? "#4f5369" : "#E5E5E5",
      listhover: mode === "dark" || mode === "semiDark" ? colorX : "black",
      text: mode === "dark" || mode === "semiDark" ? "#989db7" : "black",
      selectedlist: mode === "dark" || mode === "semiDark" ? colorX : "black",
      nonselectedlist:
        mode === "dark" || mode === "semiDark" ? "#989db7" : "gray",
      icon: mode === "dark" || mode === "semiDark" ? "#989db7" : "black",
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === "light" ? whiteColor : darkPaperBgColor,
      default: defaultBgColor(),
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`,
    },
  };
};

export default DefaultPalette;
