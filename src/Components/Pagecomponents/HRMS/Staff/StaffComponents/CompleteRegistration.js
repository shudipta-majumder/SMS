import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const CompleteRegistration = ({
  checkoutData,
  handalePersonalDetails,
  handaleParentDetails,
  handaleGardianDetails,
  handaleAdmissionDetails,
}) => {
  const dividerStyle = {
    backgroundColor: "blue",
    height: "1px",
    fontWeight: "bold",
  };
  const SecondDividerStyle = {
    height: "1px",
    fontWeight: "bold",
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Personal Details
            </Typography>
            <Button
              onClick={handalePersonalDetails}
              sx={{ fontSize: "10px", color: "blue" }}
            >
              Edit
            </Button>
          </Box>

          <Divider style={dividerStyle} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
               {checkoutData.first_name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Gardian Details
                </Typography>
                <Button
                  onClick={handaleGardianDetails}
                  sx={{ fontSize: "10px", color: "blue" }}
                >
                  Edit
                </Button>
              </Box>

              <Divider style={dividerStyle} />
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <Typography sx={{ color: "gray" }}>Student Name:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Shudipta Majumder
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <Typography sx={{ color: "gray" }}>Student Name:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Shudipta Majumder
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <Typography sx={{ color: "gray" }}>Student Name:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Shudipta Majumder
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <Typography sx={{ color: "gray" }}>Student Name:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Shudipta Majumder
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: "10px", mb: "10px" }}>
                <Divider style={SecondDividerStyle} />
              </Box>

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <Typography sx={{ color: "gray" }}>Student Name:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Shudipta Majumder
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <Typography sx={{ color: "gray" }}>Student Name:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Shudipta Majumder
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <Typography sx={{ color: "gray" }}>Student Name:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Shudipta Majumder
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <Typography sx={{ color: "gray" }}>Student Name:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Shudipta Majumder
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Admission Details
            </Typography>
            <Button
              onClick={handaleAdmissionDetails}
              sx={{ fontSize: "10px", color: "blue" }}
            >
              Edit
            </Button>
          </Box>

          <Divider style={dividerStyle} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompleteRegistration;
