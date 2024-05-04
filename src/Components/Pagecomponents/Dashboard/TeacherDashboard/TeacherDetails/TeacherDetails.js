"use clinet";
import * as React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import Grid from "@mui/material/Grid";
import {
  AbsentIcon,
  PresentIcon,
  StudentIcon,
} from "@/Components/utility/useIconifyIcon";

export default function TeacherDetails({ teacherData }) {
  return (
    <Box sx={{ mt: "8px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <Grid spacing={1} sx={{ display: "flex", height: "15.063rem" }}>
            {/* Teacher Details */}
            <Grid
              item
              md={6}
              sx={{ paddingRight: "10px", display: "flex", flexGrow: 1 }}
            >
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px 15px 20px 15px",
                  flexGrow: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      border: "4px solid #45449D",
                      width: "5.75rem",
                      height: "5.75rem",
                      marginBottom: "4px",
                    }}
                    src={teacherData?.image}
                  ></Avatar>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    color: "#45449D",
                  }}
                >
                  {" "}
                  Welcome, {teacherData?.first_name} {teacherData?.last_name}!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#667085",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  {" "}
                  We Appreciate Your Effort.
                </Typography>
              </Box>
            </Grid>
            {/* total Students */}
            <Grid item md={2} sx={{ paddingRight: "10px", display: "flex" }}>
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px 15px 20px 15px",
                  flexGrow: 1,
                }}
              >
                <StudentIcon
                  style={{ width: "3.125rem", height: "4.561rem" }}
                />
                <Typography
                  sx={{
                    marginTop: "19px",
                    textAlign: "center",
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  Total Students
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#826BF8",
                    fontSize: "20px",
                  }}
                >
                  {teacherData?.total_student}
                </Typography>
              </Box>
            </Grid>
            {/* present */}
            <Grid item md={2} sx={{ paddingRight: "10px", display: "flex" }}>
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px 15px 20px 15px",
                  flexGrow: 1,
                }}
              >
                <PresentIcon />
                <Typography
                  sx={{
                    marginTop: "19px",
                    textAlign: "center",
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  present
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#00D4BD",
                    fontSize: "20px",
                    textTransform: "uppercase",
                  }}
                >
                  {teacherData?.total_present}
                </Typography>
              </Box>
            </Grid>
            {/* absent */}
            <Grid item md={2} sx={{ display: "flex" }}>
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px 15px 20px 15px",
                  flexGrow: 1,
                }}
              >
                <AbsentIcon />
                <Typography
                  sx={{
                    marginTop: "19px",
                    textAlign: "center",
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  Absent
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#0095FF",
                    fontSize: "20px",
                  }}
                >
                  {teacherData?.total_absent}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
