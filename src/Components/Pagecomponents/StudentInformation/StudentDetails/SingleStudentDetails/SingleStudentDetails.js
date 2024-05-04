"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import GuardianDetails from "./GuardianDetails/GuardianDetails";
import EnrollDetails from "./EnrollDetails/EnrollDetails";
import FeesDetails from "./FeesDetails/FeesDetails";
import AttendenceDetails from "./AttendenceDetails/AttendenceDetails";
import dayjs from "dayjs";
import QRCode from "react-qr-code";
import LeaveTransaction from "./LeaveTransaction/LeaveTransaction";
import { useOnlyIcon } from "../../../../Layout/NavContext";

const SingleStudentDetails = ({ detail, session }) => {
  const { color, colorX, palette } = useOnlyIcon();
  const [activeDetails, setActiveDetails] = React.useState();
  const {
    admission_date,
    blood_group,
    dob,
    email,
    first_name,
    gender,
    religion,
    shift,
    student_no,
    photo,
    last_name,
    mobile_no,
    id,
    permanent_address,
    present_address,
  } = detail?.data;

  let formatedDob = dayjs(dob).format("DD/MM/YYYY");

  const renderComponent = (component) => {
    switch (component) {
      case "guardianDetails":
        return <GuardianDetails detail={detail?.data?.guardians} />;
      // case "enrollDetails":
      //   if (detail?.data?.enroll.length === 0) {
      //     return "This student hasn't been admitted yet.";
      //   }
      //   return (
      //     <EnrollDetails
      //       enroll={
      //         detail?.data?.enroll.length === 0
      //           ? "No enroll data available"
      //           : detail?.data?.enroll
      //       }
      //     />
      //   );
      case "attendence":
        if (detail?.data?.std_atten_daily.length === 0) {
          return "No Attendence yet";
        }
        return (
          <AttendenceDetails
            attendence={
              detail?.data?.std_atten_daily.length === 0
                ? "No attendence data available"
                : detail?.data?.std_atten_daily
            }
          />
        );
      case "leave":
        if (detail?.data?.std_leave_trns.length === 0) {
          return "No Leave Transaction yet";
        }
        return (
          <LeaveTransaction
            leave={
              detail?.data?.std_leave_trns.length === 0
                ? "No Leave Transaction data available"
                : detail?.data?.std_leave_trns
            }
          />
        );
      case "fees":
        if (detail?.data?.enroll.length === 0) {
          return "No fees added yet.";
        }
        return (
          <FeesDetails
            fees={
              detail?.data?.fees_trns.length === 0
                ? "No Fees data available"
                : detail?.data?.fees_trns
            }
          />
        );

      default:
        return <GuardianDetails detail={detail?.data?.guardians} />;
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
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    borderRadius: "10px",
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                  }}
                >
                  <Avatar
                    alt="profile image"
                    src={`${process.env.NEXT_PUBLIC_HOST}/${photo}`}
                    sx={{ width: 100, height: 100, borderRadius: "10px" }}
                  />
                </Stack>
                <Typography variant="h6">{`${first_name} ${last_name}`}</Typography>
              </Box>

              <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
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
                                fontSize: "15px",
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
                                // value={`Student Name: ${first_name} ${last_name}\nVersion: ${detail?.data?.enroll[0]?.version.version}\nSession: ${detail?.data?.enroll[0]?.session.session}\nClass: ${detail?.data?.enroll[0]?.class_name.name}\nSection: ${detail?.data?.enroll[0]?.section.section}\nEmail: ${email}\nPhone: ${mobile_no}\n`}
                                value={`Student Name: ${first_name} ${last_name}\nVersion: ${detail?.data?.enroll[0]?.version.version}\nSession: ${detail?.data?.enroll[0]?.session.session}\nClass: ${detail?.data?.enroll[0]?.class_name.name}\nSection: ${detail?.data?.enroll[0]?.section.section}\n`}
                                size="60"
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
                      <TableCell
                        sx={{
                          p: "8px",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Student ID
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
                              {student_no}
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
                      <TableCell
                        sx={{
                          p: "8px",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Mobile No
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
                              {mobile_no}
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
                      <TableCell
                        sx={{
                          p: "8px",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Version
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
                              {detail?.data?.enroll[0]?.version.version}
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
                      <TableCell
                        sx={{
                          p: "8px",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Class Name
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
                              {detail?.data?.enroll[0]?.class_name.name}
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
                      <TableCell
                        sx={{
                          p: "8px",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Section
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
                              {detail?.data?.enroll[0]?.section.section}
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
                      <TableCell
                        sx={{
                          p: "8px",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Session
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
                              {detail?.data?.enroll[0]?.session.session}
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
                      <TableCell
                        sx={{
                          p: "8px",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Email
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
                              {email}
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
                      <TableCell
                        sx={{
                          p: "8px",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Gender
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
                              {gender.name}
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
                      <TableCell
                        sx={{
                          p: "8px",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Date of Birth
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
                              {formatedDob}
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
                      <TableCell
                        sx={{
                          p: "8px",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Religion
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
                              {religion.name}
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
                      <TableCell
                        sx={{
                          p: "8px",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Blood Group
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
                              {blood_group.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>

                    {/* permanent address */}
                    {/* <TableRow
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
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Permanent Address
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
                              {permanent_address}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow> */}
                    {/* present address */}
                    {/* <TableRow
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
                                color: "#000000",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Present Address
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
                              {present_address}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow> */}
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
                marginBottom: "1rem",
              }}
            >
              <Button
                onClick={() => setActiveDetails("guardianDetails")}
                variant={
                  activeDetails === "guardianDetails" ||
                  activeDetails === undefined
                    ? "contained"
                    : ""
                }
                startIcon={<Icon icon="fluent:guardian-20-regular" />}
                color="subPrimary"
              >
                Parents Details
              </Button>
              <Button
                variant={activeDetails === "attendence" ? "contained" : ""}
                color="subPrimary"
                onClick={() => setActiveDetails("attendence")}
                component="label"
                startIcon={<Icon icon="fluent-mdl2:open-enrollment" />}
              >
                Attendence
              </Button>
              <Button
                variant={activeDetails === "leave" ? "contained" : ""}
                color="subPrimary"
                onClick={() => setActiveDetails("leave")}
                component="label"
                startIcon={<Icon icon="pepicons-pencil:leave" />}
              >
                Leave Transaction
              </Button>
              <Button
                variant={activeDetails === "fees" ? "contained" : ""}
                color="subPrimary"
                onClick={() => setActiveDetails("fees")}
                component="label"
                startIcon={<Icon icon="tdesign:money" />}
              >
                Fees
              </Button>
            </Box>
            <Box>{renderComponent(activeDetails)}</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleStudentDetails;
