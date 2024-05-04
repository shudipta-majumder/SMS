import { Box, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import NextImage from "next/image";
import { Icon } from "@iconify/react";

const First = ({ PersonalDetails, palette }) => {
  return (
    <Box
      sx={{  backgroundColor: palette.customColors.boxBg, height: "100vh", p: "16px" }}
    >
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            className="flex flex-row justify-center items-end"
          >
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Box
                sx={{
                  backgroundColor: "#f7f7f7",
                  position: "relative",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid xs={8}>
                    <Box className="flex flex-col justify-center items-center pt-px">
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Total Gross Salary
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "30px",
                          fontWeight: 700,
                          ml: "10px",
                        }}
                      >
                        {PersonalDetails?.payroll[0].gross} TK
                      </Typography>
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
                    <Box
                      sx={{
                        fontSize: "70px",
                        display: "flex",
                      }}
                    >
                     <Icon icon="ant-design:dollar-outlined" />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Box
                sx={{
                  backgroundColor: "#f7f7f7",
                  position: "relative",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid xs={8}>
                    <Box className="flex flex-col justify-center items-center pt-px">
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Total Basic Salary
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "30px",
                          fontWeight: 700,
                          ml: "10px",
                        }}
                      >
                        {PersonalDetails?.payroll[0].basic} TK
                      </Typography>
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
                    <Box
                      sx={{
                        fontSize: "70px",
                        display: "flex",
                      }}
                    >
                     <Icon icon="ant-design:dollar-outlined" />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Box
                sx={{
                  backgroundColor: "#f7f7f7",
                  position: "relative",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid xs={8}>
                    <Box className="flex flex-col justify-center items-center pt-px">
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Medical
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "30px",
                          fontWeight: 700,
                          ml: "10px",
                        }}
                      >
                        {PersonalDetails?.payroll[0].medical} TK
                      </Typography>
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
                    <Box
                      sx={{
                        fontSize: "70px",
                        display: "flex",
                      }}
                    >
                    <Icon icon="ant-design:dollar-outlined" />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Box
                sx={{
                  backgroundColor: "#f7f7f7",
                  position: "relative",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid xs={8}>
                    <Box className="flex flex-col justify-center items-center pt-px">
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Convence
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "30px",
                          fontWeight: 700,
                          ml: "10px",
                        }}
                      >
                        {PersonalDetails?.payroll[0].convence} TK
                      </Typography>
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
                    <Box
                      sx={{
                        fontSize: "70px",
                        display: "flex",
                      }}
                    >
                     <Icon icon="ant-design:dollar-outlined" />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default First;
