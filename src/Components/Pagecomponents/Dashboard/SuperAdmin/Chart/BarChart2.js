"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const ThreeStepOverlappingBarChart = () => {
  const chartData = {
    options: {
      plotOptions: {
        bar: {
          columnWidth: "45%",
          endingShape: "rounded",
        },
      },
      chart: {
        id: "bar-chart",
        toolbar: {
          show: false, // Hide the download button
        },
        type: "bar",
        width: "50px",

        stacked: true, // Enable stacking
      },

      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // X-axis labels
      },
      yaxis: {
        min: 0,
        max: 30,
        tickAmount: 4,
        labels: {
          formatter: function (val) {
            return val; // Y-axis labels
          },
        },
      },
      colors: ["#88E8B4", "#FF9801", "#ED6C6D"],
    },

    series: [
      {
        name: "Present",
        data: [10, 15, 8, 12, 20, 10],
      },
      {
        name: "Late",
        data: [5, 10, 15, 8, 10, 18],
      },
      {
        name: "Absent",
        data: [8, 12, 7, 10, 15, 5],
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: "10px 10px",
        borderRadius: "15px",
      }}
    >
      <Grid container className="flex flex-row justify-center items-center">
        <Grid xs={6}>
          <Typography sx={{ fontWeight: "400", display: "flex" }}>
            Student Attendence
          </Typography>
        </Grid>
        <Grid xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button sx={{ fontSize: "10px", color: "#9F97F6" }}>
            view Details
          </Button>
        </Grid>

        <Grid xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              backgroundColor: "#E8E7FD",
              width: "100px",
              height: "20px",
              fontSize: "13px",
            }}
          >
            <CalendarMonthOutlinedIcon
              sx={{ fontSize: "17px", Color: "red" }}
            />
            <select className="bg-[#E8E7FD]">
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
          </Box>
        </Grid>
        <Grid xs={12}>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={330}
            // width={550}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThreeStepOverlappingBarChart;
