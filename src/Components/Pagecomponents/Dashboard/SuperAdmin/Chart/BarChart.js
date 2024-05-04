"use client";

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ReactApexChart from "react-apexcharts";

const BarChart = () => {
  const [lastWeek, setLastWeek] = useState([4, 6]);
  const [lastMonth, setLastMonth] = useState();
  const first = [10, 15, 20, 40, 25, 5, 30];
  const second = [1, 5, 2, 4, 25, 5, 3];

  const handleClickLastWeek = () => {
    setLastWeek(first);
  };
  const handleClickLastMonth = () => {
    setLastMonth(second);
  };
  const chartData = {
    options: {
      chart: {
        id: "bar-chart",
        toolbar: {
          show: false, // Hide the download button
        },
        zoom: {
          enabled: true, // Disable zooming
        },
        sparkline: {
          enabled: false, // Enable vertical lines
        },
      },
      xaxis: {
        categories: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"], // X-axis labels
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val + "k"; // Y-axis labels with 'k' suffix
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false, // Set to true for horizontal bars
        },
      },
      colors: ["#7468F0"],
      grid: {
        column: true, // Show grid lines
      },
      responsive: [
        {
          breakpoint: 768, // Set breakpoints as needed
          options: {
            chart: {
              width: "100%", // Adjust chart width for responsiveness
            },
          },
        },
      ],
    },
    series: [
      {
        name: "Revenue", // Series name
        data: lastWeek, // Y-axis data points
        show: false,
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
            Total Expense
          </Typography>
        </Grid>
        <Grid xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleClickLastWeek}
            sx={{ fontSize: "10px", color: "#9F97F6" }}
          >
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
              <option onClick={handleClickLastWeek}>Last Week</option>
              <option onClick={handleClickLastMonth}> Last Month</option>
            </select>
          </Box>
        </Grid>
        <Grid xs={12}>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={330}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BarChart;
