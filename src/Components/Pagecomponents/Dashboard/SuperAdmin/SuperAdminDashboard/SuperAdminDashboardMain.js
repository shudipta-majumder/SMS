import React from "react";
import FirstGrid from "../FirstGrid";
import SecondGrid from "../SecondGrid";
import ThirdGrid from "../ThirdGrid";
import PieChart from "../Chart/PieChart";
import BarChart from "../Chart/BarChart";
import BarChartTwo from "../Chart/BarChart2";
import { Box, Grid } from "@mui/material";

const SuperAdminDashboardMain = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* <UserInstitteDetail session={session}/> */}
      <FirstGrid />
      <SecondGrid />
      <ThirdGrid />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={6} sm={12} md={12} lg={6} xl={4.5}>
            <PieChart />
          </Grid>
          <Grid item xs={6} sm={12} md={12} lg={6} xl={4.5}>
            <BarChart />
          </Grid>
          <Grid item xs={6} sm={12} md={12} lg={12} xl={3}>
            <BarChartTwo />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SuperAdminDashboardMain;
