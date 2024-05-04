import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TableHead, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { AttendanceIcon } from "@/Components/utility/useIconifyIcon";
import dayjs from "dayjs";

// const rows = [
//   createData(
//     "10-January-2024",
//     "9:00AM-2:30PM",
//     "08:48:31 AM",
//     "04:30:51 PM",
//     "Present"
//   ),
//   createData(
//     "10-January-2024",
//     "9:00AM-2:30PM",
//     "08:48:31 AM",
//     "04:30:51 PM",
//     "Present"
//   ),
//   createData(
//     "10-January-2024",
//     "9:00AM-2:30PM",
//     "08:48:31 AM",
//     "04:30:51 PM",
//     "Present"
//   ),
//   createData(
//     "10-January-2024",
//     "9:00AM-2:30PM",
//     "08:48:31 AM",
//     "04:30:51 PM",
//     "Present"
//   ),
//   createData(
//     "10-January-2024",
//     "9:00AM-2:30PM",
//     "08:48:31 AM",
//     "04:30:51 PM",
//     "Present"
//   ),
//   createData(
//     "10-January-2024",
//     "9:00AM-2:30PM",
//     "08:48:31 AM",
//     "04:30:51 PM",
//     "Present"
//   ),
//   createData(
//     "10-January-2024",
//     "9:00AM-2:30PM",
//     "08:48:31 AM",
//     "04:30:51 PM",
//     "Present"
//   ),
//   createData(
//     "10-January-2024",
//     "9:00AM-2:30PM",
//     "08:48:31 AM",
//     "04:30:51 PM",
//     "Present"
//   ),
//   createData(
//     "10-January-2024",
//     "9:00AM-2:30PM",
//     "08:48:31 AM",
//     "04:30:51 PM",
//     "Present"
//   ),
// ];

export default function AttendanceListTable({ attendancelist }) {
  const columns = [
    { id: "Date", align: "left", label: "Date" },
    { id: "Shift", align: "left", label: "Shift" },
    {
      id: " InTime",
      label: "In Time",
      align: "left",
    },
    {
      id: "OutTime",
      label: "Out Time",
      align: "left",
    },
    {
      id: "Status",
      label: "Status",
      align: "left",
    },
  ];

  function createData(Date, Shift, InTime, OutTime, Status) {
    return { Date, Shift, InTime, OutTime, Status };
  }

  const rows = attendancelist?.map((attendance, key) => {
    return createData(
      attendance.date || "N/A",
      attendance.shift || "N/A",
      attendance.in_time || "N/A",
      attendance.out_time || "N/A",
      attendance.status || "N/A"
    );
  });
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 0,
          padding: "15px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AttendanceIcon />
        </Box>
        <Typography
          sx={{
            marginLeft: "10px",
            fontWeight: "600",
            fontSize: "20px",
            color: "#667085",
          }}
          variant="h5"
        >
          Attendance
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          height: "170px",
        }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="caption table ">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
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
                    background: "#E8E7FD",
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
                  <Typography sx={{ marginRight: "1.375rem" }}>
                    {dayjs(row.Date).format("DD-MMMM-YYYY")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: 0 }}>
                  <Box
                    sx={{
                      color: "#667085",
                    }}
                  >
                    <Typography>{row.Shift}</Typography>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.InTime}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.OutTime}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color:
                      row.Status === "Absent"
                        ? "#F04438"
                        : row.Status === "Present"
                        ? "#12B76A"
                        : row.Status === "Weekend"
                        ? "#F79009"
                        : "#667085",
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
