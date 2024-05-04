import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const CompleteRegistration = ({
  handalePersonalDetails,
  handaleParentDetails,
  handaleGardianDetails,
  handaleAdmissionDetails,
  checkData,
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

  console.log("checkdata", checkData);

  return (
    <Box>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        {/* personal details */}
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
              <Typography sx={{ color: "gray" }}>Frist Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {checkData.first_name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Last Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {checkData.last_name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Gender:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {checkData.gender}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Email:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {checkData.email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Mobile No:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {checkData.mobile_no}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Student Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Shudipta Majumder
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Religion:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {checkData.religion}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Blood Group:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {checkData.blood_group}
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* gardian details */}
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
                  <Typography sx={{ color: "gray" }}>Frist Name:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {checkData.gardian_first_name}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <Typography sx={{ color: "gray" }}>Last Name:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {checkData.gardian_last_name}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <Typography sx={{ color: "gray" }}>Gender:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {checkData.gardian_gender}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <Typography sx={{ color: "gray" }}>Mobile:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {checkData.gardian_mobile_no}
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
                  <Typography sx={{ color: "gray" }}>Relation:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {checkData.relation}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <Typography sx={{ color: "gray" }}>Occupation:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {checkData.occupation}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* admission details */}
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
              <Typography sx={{ color: "gray" }}>Class Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {checkData.class_name}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Version Name:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {checkData.version}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Section:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {checkData.section}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <Typography sx={{ color: "gray" }}>Session:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {checkData.session}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompleteRegistration;
