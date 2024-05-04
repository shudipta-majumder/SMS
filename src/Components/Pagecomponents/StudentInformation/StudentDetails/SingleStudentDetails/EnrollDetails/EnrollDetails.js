import { Box, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const EnrollDetails = ({ enroll }) => {
  if (enroll && enroll) {
    return (
      <Box sx={{  backgroundColor: palette.customColors.boxBg, p: 2 }}>
        <Box sx={{ p: 1 }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table aria-label="simple table">
              <TableBody>
                {/* <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px 5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography
                          sx={{
                            color: "#000000",
                            fontSize: "15px",
                            fontWeight: "Medium",
                          }}
                        >
                          Enroll ID
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {enroll && enroll[0]?.id}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow> */}
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px 5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "#000000", fontSize: "15px" }}>
                          Version
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-Start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {enroll && enroll[0]?.version?.version}
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
                  <TableCell sx={{ p: "5px 5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "#000000", fontSize: "15px" }}>
                          Session
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {enroll && enroll[0]?.session?.session}
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
                  <TableCell sx={{ p: "5px 5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "#000000", fontSize: "15px" }}>
                          Class Name
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {enroll && enroll[0]?.class_name?.class_name}
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
                  <TableCell sx={{ p: "5px 5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "#000000", fontSize: "15px" }}>
                          Group
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {enroll && enroll[0]?.group}
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
                  <TableCell sx={{ p: "5px 5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "#000000", fontSize: "15px" }}>
                          Section
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {enroll && enroll[0]?.section?.section}
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
                  <TableCell sx={{ p: "5px 5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "#000000", fontSize: "15px" }}>
                          Class Roll
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {enroll && enroll[0]?.roll}
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
                  <TableCell sx={{ p: "5px 5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "#000000", fontSize: "15px" }}>
                          Date Of Joining
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>dob</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }

  return "This student hasn't been admitted yet.";
};

export default EnrollDetails;
