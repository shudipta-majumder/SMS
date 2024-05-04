"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

const UserInstitteDetail = ({ session }) => {
  const Institution = session?.user?.data?.institution;
  const Branch = session?.user?.data?.branch;
  const UserId = session?.user?.data?.username;
  const FirstName = session?.user?.data?.first_name;
  const LastName = session?.user?.data?.last_name;
  const User = `${FirstName} ${LastName}`;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
          Institution:
        </Typography>
        <Typography> {Institution?.name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
          Branch:
        </Typography>
        <Typography> {Branch?.name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
          User:
        </Typography>
        <Typography> {User}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
          User Id:
        </Typography>
        <Typography> {UserId}</Typography>
      </Box>
    </Box>
  );
};

export default UserInstitteDetail;
