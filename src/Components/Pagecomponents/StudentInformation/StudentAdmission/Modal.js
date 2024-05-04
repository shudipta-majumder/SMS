import { Box } from "@mui/system";
import React, { useState } from "react";
import NextImage from "next/image";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Link from "next/link";

const Modal = ({ handleButtonClick }) => {
 
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <NextImage
        src="/images/studentinfo/modal-pic.png"
        alt="Cined Logo"
        height="226"
        width="254"
      />
      <Typography
        sx={{ color: "#7468F1", fontSize: "30px", fontWeight: "700" }}
      >
        REGISTER SUCCESSFULLY!
      </Typography>
      <Typography sx={{ textAlign: "center" }}>
        Your Student details has been added to the list successfully! We are
        happy to welcome the newcomer onboard.{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          mt: "10px",
        }}
      >
        <Button
          variant="contained"
          size="small"
          type="submit"
          sx={{
            background: "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
            ":hover": {
              bgcolor: "#796EF1",
            },
            padding: "5px 30px",
            fontWeight: "700",
          }}
          onClick={handleButtonClick}
        >
          Register Another
        </Button>
        <Link href="/student-info/student-details">
          <Button
            variant="outlined"
            size="small"
            type="submit"
            sx={{
              padding: "5px 60px",
              fontWeight: "700",
              mb: "5px",
            }}
          >
            Go to List
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Modal;
