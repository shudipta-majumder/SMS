"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NextImage from "next/image";
import { Typography } from "@mui/material";
import style from "./style.css";

export default function BasicGrid() {
  return (
    <Box>
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
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={2.5}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <NextImage
                  src="/images/dashboards/secondgrid/grup1.png"
                  alt="login bg"
                  width={62}
                  height={62}
                />
              </Grid>
              <Grid item xs={9.5}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Payment Due</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Typography sx={{ color: "#7468F1", fontWeight: 500 }}>
                          06/50
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box className="payment"></Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
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
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={2.5}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <NextImage
                  src="/images/dashboards/secondgrid/grup2.png"
                  alt="login bg"
                  width={62}
                  height={62}
                />
              </Grid>
              <Grid item xs={9.5}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Late Student</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Typography sx={{ color: "#7468F1", fontWeight: 500 }}>
                          02/50
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box className="late"></Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
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
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={2.5}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <NextImage
                  src="/images/dashboards/secondgrid/grup3.png"
                  alt="login bg"
                  width={62}
                  height={62}
                />
              </Grid>
              <Grid item xs={9.5}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Staff Present</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Typography sx={{ color: "#7468F1", fontWeight: 500 }}>
                          08/10
                        </Typography>{" "}
                      </Grid>
                    </Grid>
                    <Box className="staff"></Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
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
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={2.5}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <NextImage
                  src="/images/dashboards/secondgrid/grup4.png"
                  alt="login bg"
                  width={62}
                  height={62}
                />
              </Grid>
              <Grid item xs={9.5}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Student Present</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Typography sx={{ color: "#7468F1", fontWeight: 500 }}>
                          43/50
                        </Typography>{" "}
                      </Grid>
                    </Grid>
                    <Box className="present"></Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
