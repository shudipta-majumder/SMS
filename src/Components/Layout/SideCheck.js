"use client";
import * as React from "react";
import { OnlyIconProvider } from "../Layout/NavContext";
import { ThemeProvider } from "@mui/material/styles";
import Themes from "../../Components/utility/Theme";
import BreadCumb from "./BreadCumbs";
import SideNav from "./SideNav";
import SideNavStudent from "./SideNavStudent";
import TopNav from "./TopNav";
import Settings from "./Settings";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { signOut } from "next-auth/react";
import SideNavTeacher from "./SideNavTeacher";

export default function ThemeRegistry({ children, session, UserType }) {
  const theme = createTheme({
    breakpoints: {
      values: {
        md: 900,
      },
    },
  });

  const matches = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    function idleLogout() {
      var t;
      window.onload = resetTimer;
      window.onmousemove = resetTimer;
      window.onmousedown = resetTimer;
      window.ontouchstart = resetTimer;
      window.ontouchmove = resetTimer;
      window.onclick = resetTimer;
      window.onkeydown = resetTimer;
      window.addEventListener("scroll", resetTimer, true);
      function yourFunction() {
        console.log("its logout  hi");
        signOut({ redirect: true, callbackUrl: "/login" });
      }

      function resetTimer() {
        clearTimeout(t);
        t = setTimeout(yourFunction, 3000000);
      }
    }
    idleLogout();
  }, []);

  return (
    <OnlyIconProvider>
      <ThemeProvider theme={Themes}>
        <main>
          <Box className="flex flex-row">
            {matches ? (
              ""
            ) : UserType === "ADMIN" ? (
              <SideNav session={session} />
            ) : UserType === "STUDENT" ? (
              <SideNavStudent session={session} />
            ) : UserType === "TEACHER" ? (
              <SideNavTeacher session={session} />
            ) : UserType === "GUARDIAN" ? (
              <SideNavTeacher session={session} />
            ) : null}

            <Box className="grow px-[15px] py-[10px]">
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <TopNav session={session}/>
                <Box sx={{ ml: "30px" }}>
                  <BreadCumb />
                </Box>
                <Box>
                  <Settings />
                </Box>
              </Box>
              {children}
            </Box>
          </Box>
        </main>
      </ThemeProvider>
    </OnlyIconProvider>
  );
}
