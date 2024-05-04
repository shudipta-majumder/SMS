"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import First from "./DetailPageSteps/First";
import Second from "./DetailPageSteps/Second";
import Third from "./DetailPageSteps/Third";
import Forth from "./DetailPageSteps/Forth";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { useOnlyIcon } from "../../../../Layout/NavContext";
import Image from "next/image";
import QRCode from "react-qr-code";

const DetailPage = ({ SingleStaffData, editID }) => {
  const PersonalDetails = SingleStaffData.data;

  const { palette, color, colorX } = useOnlyIcon();
  const [activeComponent, setActiveComponent] = React.useState("profile");

  const buttonColorProfile = {
    background: activeComponent === "profile" && `${color}`,
    color: activeComponent === "profile" ? "white" : "#85828a",
    pl: 2,
    pr: 2,
    "&:hover": {
      background: `${color}`,
      color: "white",
    },
  };

  const buttonColorPayroll = {
    background: activeComponent === "payroll" && `${color}`,
    color: activeComponent === "payroll" ? "white" : "#85828a",
    pl: 2,
    pr: 2,
    "&:hover": {
      background: `${color}`,
      color: "white",
    },
  };
  const buttonColorAttendence = {
    background: activeComponent === "attendence" && `${color}`,
    color: activeComponent === "attendence" ? "white" : "#85828a",
    pl: 2,
    pr: 2,
    "&:hover": {
      background: `${color}`,
      color: "white",
    },
  };
  const buttonColorLeave = {
    background: activeComponent === "leave" && `${color}`,
    color: activeComponent === "leave" ? "white" : "#85828a",
    pl: 2,
    pr: 2,
    "&:hover": {
      background: `${color}`,
      color: "white",
    },
  };

  const renderComponent = (component) => {
    switch (component) {
      case "profile":
        return <First PersonalDetails={PersonalDetails} palette={palette} />;
      case "payroll":
        return <Second PersonalDetails={PersonalDetails} palette={palette} />;
      case "attendence":
        return <Third PersonalDetails={PersonalDetails} palette={palette} />;
      case "leave":
        return (
          <Forth
            PersonalDetails={PersonalDetails}
            color={color}
            palette={palette}
          />
        );
      default:
        return <First />;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", mt: "8px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={3}>
          <Box
            sx={{
              backgroundColor: palette.customColors.boxBg,
              borderRadius: "5px",
              padding: "20px 20px 20px 20px",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ borderRadius: "7px", boxShadow: "0 0 2px 0 black" }}>
                  <Box
                    sx={{
                      display: "flex",
                      borderRadius: "7px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      alt="profile image"
                      src={`${process.env.NEXT_PUBLIC_HOST}/${PersonalDetails?.photo}`}
                      width={100}
                      height={100}
                    />
                  </Box>
                </Box>

                <Typography variant="h6" sx={{ color: palette.text.secondary }}>
                  {PersonalDetails.first_name} {PersonalDetails.last_name}
                </Typography>
                <Typography sx={{ color: "#ABA0F6" }}>
                  {PersonalDetails?.role ? PersonalDetails?.role.name : ""}
                </Typography>
              </Box>

              <Box
                sx={{
                  backgroundColor: "#edebff",
                  borderRadius: "5px",
                  padding: "10px 10px",
                }}
              >
                <Typography sx={{ color: palette.text.secondary }}>
                  This Profile 70% completed
                </Typography>
                <Box sx={{ position: "relative", mb: "8px" }}>
                  <Box
                    as="div"
                    sx={{
                      content: '" "',
                      position: "absolute",
                      top: "calc(100%)",
                      backgroundColor: "rgb(173, 168, 167)",
                      width: "100%",
                      height: "5px",
                      borderRadius: "10px",
                    }}
                  />
                  <Box
                    as="div"
                    sx={{
                      content: '" "',
                      position: "absolute",
                      top: "calc(100%)",
                      background: `${colorX}`,
                      width: "70%",
                      height: "5px",
                      borderRadius: "10px",
                      animationDuration: "13s",
                      animationTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                      animationDelay: "2s",
                      animationFillMode: "forwards",
                      animationName: "payments",
                    }}
                  />
                </Box>
              </Box>

              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: "none",
                  backgroundColor: palette.customColors.boxBg,
                }}
              >
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          borderBottom: "0.1px solid #FBFBFC",
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          p: "8px",
                        }}
                      >
                        <Grid
                          container
                          spacing={2}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",color: palette.text.secondary
                              }}
                            >
                              QR
                            </Typography>
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
                            <Typography sx={{ fontSize: "15px" }}>
                              <QRCode
                                value={`http://192.168.16.217:3001/human-resource/staff-directory/view?q=${editID}`}
                                size="80"
                                style={{
                                  height: "auto",
                                  maxWidth: "100%",
                                  width: "100%",
                                }}
                              />
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          borderBottom: "0.1px solid #FBFBFC",
                        },
                      }}
                    >
                      <TableCell>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "black",
                                fontSize: "15px",
                                fontWeight: "600",color: palette.text.secondary
                              }}
                            >
                              Staff ID
                            </Typography>
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
                            <Typography
                              sx={{ fontSize: "15px", color: "gray" }}
                            >
                              {PersonalDetails?.staff_id}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          borderBottom: "0.1px solid #FBFBFC",
                        },
                      }}
                    >
                      <TableCell>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "black",
                                fontSize: "15px",
                                fontWeight: "600",color: palette.text.secondary
                              }}
                            >
                              Designation
                            </Typography>
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
                            <Typography
                              sx={{ fontSize: "15px", color: "gray" }}
                            >
                              {PersonalDetails?.designation?.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          borderBottom: "0.1px solid #FBFBFC",
                        },
                      }}
                    >
                      <TableCell>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "black",
                                fontSize: "15px",
                                fontWeight: "600",color: palette.text.secondary
                              }}
                            >
                              Department
                            </Typography>
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
                            <Typography
                              sx={{ fontSize: "15px", color: "gray" }}
                            >
                              {PersonalDetails?.department?.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          borderBottom: "0.1px solid #FBFBFC",
                        },
                      }}
                    >
                      <TableCell>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "black",
                                fontSize: "15px",
                                fontWeight: "600",color: palette.text.secondary
                              }}
                            >
                              Basic Salary
                            </Typography>
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
                            <Typography
                              sx={{ fontSize: "15px", color: "gray" }}
                            >
                              {PersonalDetails?.payroll?.[0] &&
                                PersonalDetails?.payroll?.[0].basic}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          borderBottom: "0.1px solid #FBFBFC",
                        },
                      }}
                    >
                      <TableCell>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "black",
                                fontSize: "15px",
                                fontWeight: "600",color: palette.text.secondary
                              }}
                            >
                              Contract Type
                            </Typography>
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
                            <Typography
                              sx={{ fontSize: "15px", color: "gray" }}
                            >
                              {PersonalDetails?.payroll?.[0] &&
                                PersonalDetails?.payroll?.[0].contract_type
                                  .name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          borderBottom: "0.1px solid #FBFBFC",
                        },
                      }}
                    >
                      <TableCell>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "black",
                                fontSize: "15px",
                                fontWeight: "600",color: palette.text.secondary
                              }}
                            >
                              Work Shift
                            </Typography>
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
                            <Typography
                              sx={{ fontSize: "15px", color: "gray" }}
                            >
                              {PersonalDetails?.shift?.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          borderBottom: "0.1px solid #FBFBFC",
                        },
                      }}
                    >
                      <TableCell>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "black",
                                fontSize: "15px",
                                fontWeight: "600",color: palette.text.secondary
                              }}
                            >
                              Work Location
                            </Typography>
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
                            <Typography
                              sx={{ fontSize: "15px", color: "gray" }}
                            >
                              {/* {PersonalDetails?.shift?.name} */}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          borderBottom: "0.1px solid #FBFBFC",
                        },
                      }}
                    >
                      <TableCell>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "black",
                                fontSize: "15px",
                                fontWeight: "600",color: palette.text.secondary
                              }}
                            >
                              Date Of Joining
                            </Typography>
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
                            <Typography
                              sx={{ fontSize: "15px", color: "gray" }}
                            >
                              {PersonalDetails?.doj}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} xl={9}>
          <Box
            sx={{
              backgroundColor: palette.customColors.boxBg,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "30px",
                m: 2,
                mt: 0,
              }}
            >
              <Button
                onClick={() => setActiveComponent("profile")}
                component="label"
                startIcon={<Icon icon="iconamoon:profile-light" />}
                sx={buttonColorProfile}
              >
                Profile
              </Button>
              <Button
                onClick={() => setActiveComponent("payroll")}
                component="label"
                startIcon={<Icon icon="circum:dollar" />}
                sx={buttonColorPayroll}
              >
                Payroll
              </Button>
              <Button
                onClick={() => setActiveComponent("attendence")}
                component="label"
                startIcon={<Icon icon="pepicons-pencil:people" />}
                sx={buttonColorAttendence}
              >
                Attendence
              </Button>
              <Button
                onClick={() => setActiveComponent("leave")}
                component="label"
                startIcon={<Icon icon="fluent-mdl2:leave-user" />}
                sx={buttonColorLeave}
              >
                Leave
              </Button>
            </Box>
            <Box>{renderComponent(activeComponent)}</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailPage;
