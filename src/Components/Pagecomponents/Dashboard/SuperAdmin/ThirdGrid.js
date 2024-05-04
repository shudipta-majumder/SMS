"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NextImage from "next/image";
import { Typography } from "@mui/material";

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: "10px 10px",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <NextImage
                src="/images/dashboards/thirdgrid/grup1.png"
                alt="login bg"
                width={62}
                height={62}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography>Active Students(2023)</Typography>
                <Typography sx={{ color: "#7468F1", fontWeight: 500 }}>
                  48/50
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: "10px 10px",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <NextImage
                src="/images/dashboards/thirdgrid/grup2.png"
                alt="login bg"
                width={62}
                height={62}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography>Total Student Admited</Typography>
                <Typography sx={{ color: "#7468F1", fontWeight: 500 }}>
                  50
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: "10px 10px",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <NextImage
                src="/images/dashboards/thirdgrid/grup3.png"
                alt="login bg"
                width={62}
                height={62}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography>Fees Collected</Typography>
                <Typography sx={{ color: "#7468F1", fontWeight: 500 }}>
                  BDT 3,75,000
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: "10px 10px",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <NextImage
                src="/images/dashboards/thirdgrid/grup4.png"
                alt="login bg"
                width={62}
                height={62}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography>Remaining Fees(2023)</Typography>
                <Typography sx={{ color: "#7468F1", fontWeight: 500 }}>
                  BDT 1,25,000
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
