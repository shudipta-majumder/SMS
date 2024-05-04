"use client";
import { Box } from "@mui/system";
import NextImage from "next/image";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState } from "react";
import { AppBar, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Sidenav from "./SideNav";
import UserAvatarClick from "../../Components/TopNavComponents/UserAvatarClick";
import { useOnlyIcon } from "../../Components/Layout/NavContext";
import { calculateOverrideValues } from "next/dist/server/font-utils";
import { Icon } from "@iconify/react";

const style = {
  position: "absolute",
  width: 200,
  boxShadow: 24,
};

const theme = createTheme({
  breakpoints: {
    values: {
      md: 900,
    },
  },
});

const TopNav = ({ session }) => {
  const Institution = session?.user?.data?.institution;
  const Branch = session?.user?.data?.branch;
  const User = session && session?.user?.data?.user;
 
  const { color, palette } = useOnlyIcon();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname().split("/");
  const extractedPart = pathname[1].split("-");

  const capitalizedWords = extractedPart.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const ModifiedPathname = capitalizedWords.join(" ");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const width = matches ? "calc(100% - 30px)" : "calc(100% - 269px)";

  return (
    <>
      {/* <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "7px",
          // position: "fixed",
          width: "100%",
          height: "20px",
          content: "''",
          display: "block",
          top: "0px",
          backdropFilter: "blur(2px)",
          // zIndex: 100,
        }}
      ></Box> */}
      <Box
        sx={{
          backgroundColor: palette.customColors.boxBg,
          borderRadius: "7px",
          // position: "fixed",
          width: "100%",
          zIndex: 50,
        }}
      >
        <Toolbar>
          {matches ? (
            <Box>
              <Button onClick={handleOpen}>
                <MenuIcon
                  sx={{ fontSize: "40px", color: "#978DF3", mr: "10px" }}
                />
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Sidenav session={session} />
                </Box>
              </Modal>
            </Box>
          ) : (
            ""
          )}

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: palette.text.secondary }}
          >
            {ModifiedPathname == "Dashboard"
              ? Institution?.name
              : ModifiedPathname}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography> {Branch?.name}</Typography>
            {/* <Icon
              style={{ filter: palette.logo.primary, fontSize: "30px" }}
              icon="ph:translate" 
            /> */}
            <Icon
              style={{ filter: palette.logo.primary, fontSize: "30px" }}
              icon="basil:notification-outline"
            />
            <Box
              sx={{
                position: "relative",
                cursor: "pointer",
              }}
            >
          
              <NextImage
                src={User?.image}
                alt="login bg"
                width={44}
                height={44}
                onClick={togglePopup}
              />
              {isPopupOpen && (
                <Box
                  sx={{
                    position: "absolute",
                    width: "200px",
                    padding: "10px 10px",
                    top: "65px",
                    right: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                    "&: before": {
                      content: "''",
                      display: "block",
                      position: "absolute",
                      top: "0px",
                      right: "7px",
                      width: "10px",
                      height: "10px",
                      backgroundColor: "white",
                      transform: "translateY(-50%) rotate(45deg)",
                    },
                  }}
                >
                  <UserAvatarClick User={User}/>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Box>
    </>
  );
};

export default TopNav;
