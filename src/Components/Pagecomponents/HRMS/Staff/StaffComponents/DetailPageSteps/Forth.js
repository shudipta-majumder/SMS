import { Box, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import NextImage from "next/image";
import { Icon } from "@iconify/react";

const Fourth = ({ PersonalDetails, color, palette }) => {
  const { staff_leave } = PersonalDetails;
  return (
    <Box sx={{  backgroundColor: palette.customColors.boxBg, height: "100vh", p: "16px" }}>
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={3}
            className="flex flex-row justify-center items-end"
          >
            {staff_leave.map((leave) => (
              <>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <Box
                    sx={{
                      backgroundColor: "#f7f7f7",
                      boxShadow: "10px 10px 10px #d9d9d9, 0 0 0 #fff",
                      position: "relative",
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Grid xs={12}>
                        <Box className="flex flex-row justify-between items-center ">
                          <Typography>{leave.leave_type.name}</Typography>

                          <Typography>
                            {leave.taken_days} / {leave.leave_days}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid xs={12}>
                        <Box sx={{ position: "relative", mb: "20px" }}>
                          <Box
                            as="div"
                            sx={{
                              content: '" "',
                              position: "absolute",
                              top: "calc(100%)",
                              backgroundColor: "rgb(173, 168, 167)",
                              width: "100%",
                              height: "15px",
                            }}
                          />

                          <Box
                            as="div"
                            sx={{
                              content: '" "',
                              position: "absolute",
                              top: "calc(100%)",
                              background: `${color}`,
                              width: `${
                                (leave.taken_days / leave.leave_days) * 100
                              }%`,
                              height: "15px",
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Fourth;
