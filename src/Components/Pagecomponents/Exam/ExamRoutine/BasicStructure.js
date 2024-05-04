"use client";
import { Box, Typography, Backdrop } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import ExamNamesModal from "./ExamNamesModal";
import { useOnlyIcon } from "../../../Layout/NavContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 4,
};

const blurBackdrop = {
  backdropFilter: "blur(2px)",
  backgroundColor: "transparent",
  zIndex: 500,
};

const page = ({
  ExamNamesList,
  VerssionList,
  SessionList,
  ClassList,
  SectionList,
  GroupList,
  accessToken,
  menuData,
}) => {
  const { color, colorX, palette } = useOnlyIcon();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Extracting permissions for the "ExamNames" submenu
  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "Exam")
    : null;
  const ExamNamesSubMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find((subMenu) => subMenu.name === "Exam Routine")
    : null;
  const ExamNamesPermissions = ExamNamesSubMenu?.permission || [];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "0px 30px",
          mt: "10px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", color: palette.text.secondary }}
        >
          ExamNames List
        </Typography>
        {ExamNamesPermissions && ExamNamesPermissions.includes("create") ? (
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            type="submit"
            sx={{
              background: `${`linear-gradient(45deg, ${color} 30%, ${colorX} 90%)`}`,
              ":hover": {
                bgcolor: "#796EF1",
              },
              padding: "5px 30px",
              fontWeight: "700",
            }}
            onClick={handleOpen}
          >
            ADD NEW
          </Button>
        ) : (
          ""
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ExamNamesModal
              handleClose={handleClose}
              accessToken={accessToken}
              ExamNamesList={ExamNamesList}
              VerssionList={VerssionList}
              SessionList={SessionList}
              ClassList={ClassList}
              SectionList={SectionList}
              GroupList={GroupList}
            />
          </Box>
        </Modal>
        <Backdrop className={blurBackdrop} open={open} onClick={handleClose} />
      </Box>
    </Box>
  );
};

export default page;
