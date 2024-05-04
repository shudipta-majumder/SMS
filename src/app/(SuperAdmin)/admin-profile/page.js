"use client";
import FirstStep from "@/Components/Pagecomponents/Profile/FirstStep";
import SecondStep from "@/Components/Pagecomponents/Profile/SecondStep";
import ThirdStep from "@/Components/Pagecomponents/Profile/ThirdStep";
import { Box } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";

const page = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", mt: "8px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={3}>
          <FirstStep />
        </Grid>

        <Grid item xs={12} xl={9}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <SecondStep />
            <ThirdStep />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default page;
