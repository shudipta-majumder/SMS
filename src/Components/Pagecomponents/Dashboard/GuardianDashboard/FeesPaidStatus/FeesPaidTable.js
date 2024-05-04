import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box, TableHead, Typography } from "@mui/material";
import { FeesPaidIcon } from "@/Components/utility/useIconifyIcon";

const columns = [
  { id: "Date", align: "left", label: "Due Date" },
  { id: "Day", align: "left", label: "Fees Type" },
  {
    id: "Amount",
    label: "Amount",
    align: "left",
  },
  {
    id: "Status",
    label: "Status",
    align: "left",
  },
];

function createData(Date, Day, Amount, Status) {
  return { Date, Day, Amount, Status };
}

const rows = [
  createData("10-January-2024", "Monthly Fee", "2000", "Pay Now"),
  createData("10-January-2024", "Monthly Fee", "2000", "Pay Now"),
  createData("10-January-2024", "Monthly Fee", "2000", "Pay Now"),
  createData("10-January-2024", "Monthly Fee", "2000", "Pay Now"),
  createData("10-January-2024", "Monthly Fee", "2000", "Pay Now"),
  createData("10-January-2024", "Monthly Fee", "2000", "Pay Now"),
  createData("10-January-2024", "Monthly Fee", "2000", "Pay Now"),
];

export default function FeesPaidTable() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 0,
          padding: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "2rem",
            height: "2.5rem",
          }}
        >
          <FeesPaidIcon />
        </Box>
        <Typography
          sx={{
            marginLeft: "10px",
            fontWeight: "600",
            fontSize: "16px",
            color: "#667085",
          }}
          variant="h5"
        >
          Fees Paid Status
        </Typography>
      </Box>
      <TableContainer
        // component={Paper}
        sx={{
          height: "170px",
        }}
      >
        <Table
          sx={{ minWidth: 200, backgroundColor: "#F3F3FE" }}
          stickyHeader
          aria-label="caption table "
        >
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "#667085",
                    // padding: "10px 0px 10px 16px",
                    padding:
                      index >= 1 ? "10px 0px 10px 7px" : "10px 0px 10px 16px",
                    borderTop: 0,
                    borderTopLeftRadius: index === 0 ? "0.625rem" : "0",
                    borderBottomLeftRadius: index === 0 ? "0.625rem" : "0",
                    borderTopRightRadius:
                      index === columns.length - 1 ? "0.625rem" : "0",
                    borderBottomRightRadius:
                      index === columns.length - 1 ? "0.625rem" : "0",
                    background: "#D0D0EB",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell
                  sx={{
                    padding: "5px 5px 5px 16px",
                    color: "#667085",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>{row.Date}</Typography>
                </TableCell>
                <TableCell sx={{ padding: 0 }}>
                  <Box
                    sx={{
                      color: "#667085",
                      //   display: "flex",
                      //   alignItems: "center",
                      //   gap: "10px",
                    }}
                  >
                    {/* <Avatar
                      alt="Remy Sharp"
                      sx={{ width: 20, height: 20 }}
                      src="/images/dashboards/StudentDashboard/TeacherList/teacherAvatar.png"
                    /> */}
                    <Typography sx={{ fontSize: "14px" }}>{row.Day}</Typography>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                    fontSize: "14px",
                  }}
                  align="left"
                >
                  {row.Amount}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                    fontSize: "14px",
                  }}
                  align="left"
                >
                  {row.Status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
