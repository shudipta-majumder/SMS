"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import NextImage from "next/image";

const firstGrid = () => {
  return (
    <Box sx={{ mt: "8px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          className="flex flex-row justify-center items-center"
        >
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Box
              sx={{
                backgroundColor: "#DCF6E8",
                position: "relative",
                borderRadius: 2,
                padding: "30px 0px 0px 0px",
              }}
            >
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Grid xs={8}>
                  <Box className="flex flex-row justify-start items-center">
                    <Box className=" flex flex-col justify-start pl-[20px]">
                      <Box className=" flex flex-row justify-start items-center gap-6">
                        <NextImage
                          src="/images/dashboards/top1.png"
                          alt="Cined Logo"
                          height="70"
                          width="70"
                        />
                        <Typography sx={{ fontSize: "20px", fontWeight: 540 }}>
                          Super Admin
                        </Typography>
                      </Box>
                      <Box className="flex flex-row justify-center items-center">
                        <Typography
                          sx={{ fontSize: "40px", fontWeight: 700, ml: "10px" }}
                        >
                          03
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <NextImage
                    src="/images/dashboards/right1.png"
                    alt="Cined Logo"
                    width="128"
                    height="143"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Box
              sx={{
                backgroundColor: "#D6F7FB",
                position: "relative",
                borderRadius: 2,
                padding: "30px 0px 0px 0px",
              }}
            >
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Grid xs={8}>
                  <Box className="flex flex-row justify-start items-center">
                    <Box className=" flex flex-col justify-start pl-[20px]">
                      <Box className=" flex flex-row justify-start items-center gap-6">
                        <NextImage
                          src="/images/dashboards/top2.png"
                          alt="Cined Logo"
                          height="70"
                          width="70"
                        />
                        <Typography sx={{ fontSize: "20px", fontWeight: 540 }}>
                          Super Admin
                        </Typography>
                      </Box>
                      <Box className="flex flex-row justify-center items-center">
                        <Typography
                          sx={{ fontSize: "40px", fontWeight: 700, ml: "10px" }}
                        >
                          03
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <NextImage
                    src="/images/dashboards/right2.png"
                    alt="Cined Logo"
                    width="102"
                    height="144"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Box
              sx={{
                backgroundColor: "#FFF0E1",
                position: "relative",
                borderRadius: 2,
                padding: "30px 0px 0px 0px",
              }}
            >
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Grid xs={8}>
                  <Box className="flex flex-row justify-start items-center">
                    <Box className=" flex flex-col justify-start pl-[20px]">
                      <Box className=" flex flex-row justify-start items-center gap-6">
                        <NextImage
                          src="/images/dashboards/top1.png"
                          alt="Cined Logo"
                          height="70"
                          width="70"
                        />
                        <Typography sx={{ fontSize: "20px", fontWeight: 540 }}>
                          Super Admin
                        </Typography>
                      </Box>
                      <Box className="flex flex-row justify-center items-center">
                        <Typography
                          sx={{ fontSize: "40px", fontWeight: 700, ml: "10px" }}
                        >
                          03
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <NextImage
                    src="/images/dashboards/right3.png"
                    alt="Cined Logo"
                    width="102"
                    height="144"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Box
              sx={{
                backgroundColor: "#E8E7FD",
                position: "relative",
                borderRadius: 2,
                padding: "30px 0px 0px 0px",
              }}
            >
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Grid xs={8}>
                  <Box className="flex flex-row justify-start items-center">
                    <Box className=" flex flex-col justify-start pl-[20px]">
                      <Box className=" flex flex-row justify-start items-center gap-6">
                        <NextImage
                          src="/images/dashboards/top1.png"
                          alt="Cined Logo"
                          height="70"
                          width="70"
                        />
                        <Typography sx={{ fontSize: "20px", fontWeight: 540 }}>
                          Super Admin
                        </Typography>
                      </Box>
                      <Box className="flex flex-row justify-center items-center">
                        <Typography
                          sx={{ fontSize: "40px", fontWeight: 700, ml: "10px" }}
                        >
                          03
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <NextImage
                    src="/images/dashboards/right4.png"
                    alt="Cined Logo"
                    width="102"
                    height="144"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default firstGrid;
