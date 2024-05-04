// using ChartJS

// "use client";
// import { Box, Button, Typography } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import React from "react";
// import ReactApexChart from "react-apexcharts";

// const DonutPieChart = () => {
//   const chartData = {
//     options: {
//       chart: {
//         type: "donut",
//       },
//       labels: ["Due Payment", "Total Income", "Total Expense"],
//       dataLabels: {
//         enabled: false, // Disable data labels
//       },
//       plotOptions: {
//         pie: {
//           expandOnClick: false, // Prevent expansion on click
//         },
//       },
//       colors: ["#E8E7FD", "#FF9801", "#9747FF"],
//         responsive: [
//         {
//           breakpoint: 768, // Set breakpoints as needed
//           options: {
//             chart: {
//               width: "100%", // Adjust chart width for responsiveness
//             },
//           },
//         },
//       ],
//     },
//     series: [40, 30, 20], // Values for the donut segments
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//          backgroundColor: palette.customColors.boxBg,
//         padding: "10px 10px",
//         borderRadius: "15px",
//       }}
//     >
//       <Grid container className="flex flex-row justify-center items-center">
//         <Grid xs={6}>
//           <Typography sx={{ fontWeight: "400", display: "flex" }}>
//             Income vs Expense
//           </Typography>
//         </Grid>
//         <Grid xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Button sx={{ fontSize: "10px", color: "#9F97F6" }}>
//             view Details
//           </Button>
//         </Grid>

//         <Grid xs={12}>
//           <ReactApexChart
//             options={chartData.options}
//             series={chartData.series}
//             type="donut"
//             height={330}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default DonutPieChart;

// using recharts

"use client";

import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Icon from "../../../../icon/page";

const data = [
  { name: "R&D", value: 50, color: "#00d4bd" },
  { name: "Operational", value: 85, color: "#ffe700" },
  { name: "Networking", value: 16, color: "#FFA1A1" },
  { name: "Hiring", value: 50, color: "#826bf8" },
];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = (props) => {
  // ** Props
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const RechartsPieChart = () => {
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
            Income vs Expense
          </Typography>
        </Grid>
        <Grid xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button sx={{ fontSize: "10px", color: "#9F97F6" }}>
            view Details
          </Button>
        </Grid>

        <Grid xs={12}>
          <Box sx={{ height: 315 }}>
            <ResponsiveContainer>
              <PieChart style={{ direction: "ltr" }}>
                <Pie
                  data={data}
                  innerRadius={80}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              mb: 4,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                mr: 6,
                display: "flex",
                alignItems: "center",
                "& svg": { mr: 1.5, color: "#00d4bd" },
              }}
            >
              <Icon icon="mdi:circle" fontSize="0.75rem" />
              <Typography variant="body2">R&D</Typography>
            </Box>
            <Box
              sx={{
                mr: 6,
                display: "flex",
                alignItems: "center",
                "& svg": { mr: 1.5, color: "#ffe700" },
              }}
            >
              <Icon icon="mdi:circle" fontSize="0.75rem" />
              <Typography variant="body2">Operational</Typography>
            </Box>
            <Box
              sx={{
                mr: 6,
                display: "flex",
                alignItems: "center",
                "& svg": { mr: 1.5, color: "#FFA1A1" },
              }}
            >
              <Icon icon="mdi:circle" fontSize="0.75rem" />
              <Typography variant="body2">Networking</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& svg": { mr: 1.5, color: "#826bf8" },
              }}
            >
              <Icon icon="mdi:circle" fontSize="0.75rem" />
              <Typography variant="body2">Hiring</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RechartsPieChart;
