import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      light: "red",
      main: "#1976d2",
      dark: "red",
      contrastText: "#fff",
    },
    subPrimary: {
      main: "#7367F0",
      contrastText: "#fff",
    },
    h1 : {
      color: "red"
    }
  },
  // typography: {
  //   // fontFamily: '"Aguafina Script", cursive',
  //   fontFamily: "Poppins",
  // },
});

export default theme;
