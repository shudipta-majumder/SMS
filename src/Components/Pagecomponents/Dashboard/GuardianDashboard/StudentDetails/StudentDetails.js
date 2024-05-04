import * as React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import Grid from "@mui/material/Grid";
import {
  DashboardClassIcon,
  DashboardGirlAvatar,
  DashboardSectionIcon,
} from "@/Components/utility/useIconifyIcon";

export default function StudentDetails({ guardianData }) {
  // const studentRender = (index) => {
  //   switch (index) {
  //     case "0":
  //       if (detail?.data?.std_leave_trns.length === 0) {
  //         return "No Leave Transaction yet";
  //       }
  //       return (
  //         <LeaveTransaction
  //           leave={
  //             detail?.data?.std_leave_trns.length === 0
  //               ? "No Leave Transaction data available"
  //               : detail?.data?.std_leave_trns
  //           }
  //         />
  //       );
  //     case "fees":
  //       if (detail?.data?.enroll.length === 0) {
  //         return "No fees added yet.";
  //       }
  //       return (
  //         <FeesDetails
  //           fees={
  //             detail?.data?.fees_trns.length === 0
  //               ? "No Fees data available"
  //               : detail?.data?.fees_trns
  //           }
  //         />
  //       );

  //     default:
  //       return <GuardianDetails detail={detail?.data?.guardians} />;
  //   }
  // };
  return (
    <Box sx={{ mt: "8px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <Grid spacing={1} sx={{ display: "flex" }}>
            {/* Student Details */}
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
                      border: "4px solid #826BF8",
                      width: "5.75rem",
                      height: "5.75rem",
                      marginBottom: "4px",
                    }}
                    src={guardianData?.basic_info?.image}
                  ></Avatar>
                  {guardianData?.student_info?.map((student) => {
                    return (
                      <Box sx={{ textAlign: "center" }}>
                        <Avatar
                          sx={{
                            border: "4px solid #826BF8",
                            width: "2.00rem",
                            height: "2.00rem",
                            marginBottom: "4px",
                            marginLeft: "10px",
                          }}
                          src={student?.image}
                        ></Avatar>
                        <Typography
                          sx={{
                            color: "#FA5A7D",
                            fontSize: "14px",
                            textTransform: "uppercase",
                            fontWeight: 400,
                          }}
                        >
                          {student?.first_name}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    color: "#826BF8",
                  }}
                >
                  {" "}
                  Welcome, {guardianData?.basic_info?.first_name}{" "}
                  {guardianData?.basic_info?.last_name}!
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", color: "#98A2B3" }}
                >
                  {" "}
                  Your current attendance is{" "}
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#667085",
                      fontSize: "15px",
                    }}
                  >
                    92.14%
                  </span>{" "}
                  which is above{" "}
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#667085",
                      fontSize: "15px",
                    }}
                  >
                    {" "}
                    75.00%
                  </span>
                  of minimum attendance mark.
                </Typography>{" "}
                {guardianData?.student_info?.map((student) => {
                  return (
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#129471",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    >
                      {" "}
                      We Appreciate {student?.first_name}’s Effort.
                    </Typography>
                  );
                })}
              </Box>
            </Grid>
            {/* Roll */}
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
                <DashboardGirlAvatar
                  style={{ width: "3.125rem", height: "4.561rem" }}
                />
                <Typography
                  sx={{
                    marginTop: "19px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  ROLL
                </Typography>
                {guardianData?.student_info?.map((student) => {
                  return (
                    <Typography
                      sx={{
                        fontWeight: "600",
                        color: "#826BF8",
                        fontSize: "20px",
                      }}
                    >
                      {student?.basic_info?.roll}
                    </Typography>
                  );
                })}
              </Box>
            </Grid>
            {/* Class */}
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
                <DashboardClassIcon />
                <Typography
                  sx={{
                    marginTop: "19px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  ClASS
                </Typography>
                {guardianData?.student_info?.map((student) => {
                  return (
                    <Typography
                      sx={{
                        fontWeight: "600",
                        color: "#00D4BD",
                        fontSize: "20px",
                      }}
                    >
                      {student?.basic_info?.class_name}
                    </Typography>
                  );
                })}
              </Box>
            </Grid>
            {/* Section */}
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
                <DashboardSectionIcon />
                <Typography
                  sx={{
                    marginTop: "19px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  SECTION
                </Typography>
                {guardianData?.student_info?.map((student) => {
                  return (
                    <Typography
                      sx={{
                        fontWeight: "600",
                        color: "#0095FF",
                        fontSize: "20px",
                      }}
                    >
                      {student?.basic_info?.section}
                    </Typography>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
