import { Box } from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Drawer from "../Drawer/drawer";
import { useOnlyIcon } from "../../Components/Layout/NavContext";

const InlineStyleDrawer = () => {
  const { color, palette } = useOnlyIcon();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <Box style={{ height: "100vh", overflow: "hidden", position: "absolute" }}>
      <Box
        style={{
          width: "400px",
          height: "100%",
          backgroundColor: palette.table.bg,
          position: "fixed",
          top: 0,
          right: isOpen ? "0" : "-400px",
          transition: "right 0.3s ease",
          zIndex: 100,
        }}
        onMouseLeave={closeDrawer}
      >
        <Drawer />
      </Box>

      <Box
        onClick={toggleDrawer}
        sx={{
          width: "35px",
          height: "35px",
          backgroundColor: color,
          position: "absolute",
          top: "50%",
          right: 0,
          color: "white",
          fontSize: "23px",
          position: "fixed",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
          cursor: "pointer",
        }}
      >
        <Icon icon="uil:setting" />
      </Box>
    </Box>
  );
};

export default InlineStyleDrawer;
