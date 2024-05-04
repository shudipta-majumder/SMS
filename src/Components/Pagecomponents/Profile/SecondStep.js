

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";


export default function BasicTable() {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#EDEBFF" }}>
          <TableRow>
            <TableCell>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>Contact Details</Typography>
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
                    Edit Details
                  </Typography>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
                  <Typography sx={{ color: "#ABABAB", fontSize: "13px" }}>
                    Worker Type
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
                  <Typography sx={{ fontSize: "13px" }}>Super Admin</Typography>
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
                  <Typography sx={{ color: "#ABABAB", fontSize: "13px" }}>
                    Team
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
                  <Typography sx={{ fontSize: "13px" }}>IT Head</Typography>
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
                  <Typography sx={{ color: "#ABABAB", fontSize: "13px" }}>
                    Role
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
                  <Typography sx={{ fontSize: "13px" }}>Monitoring</Typography>
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
                  <Typography sx={{ color: "#ABABAB", fontSize: "13px" }}>
                    Contact No
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
                  <Typography sx={{ fontSize: "13px" }}>
                    +8801795773160
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
                  <Typography sx={{ color: "#ABABAB", fontSize: "13px" }}>
                    Contract Start Date
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
                  <Typography sx={{ fontSize: "13px" }}>
                    May 1st, 2023
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
                  <Typography sx={{ color: "#ABABAB", fontSize: "13px" }}>
                    Payment
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
                  <Typography sx={{ fontSize: "13px" }}>
                    Not Applicable
                  </Typography>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

  );
}
