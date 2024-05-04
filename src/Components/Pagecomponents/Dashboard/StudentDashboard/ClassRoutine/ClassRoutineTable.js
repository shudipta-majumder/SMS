import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TableHead, Typography } from "@mui/material";
import { ClassRoutineIcon } from "@/Components/utility/useIconifyIcon";

const columns = [
  { id: "Subject", align: "left", label: "Subject" },
  { id: "RoomNo", align: "left", label: "Room No" },
  {
    id: "TimeSlot",
    label: "Time Slot",
    align: "left",
  },
  {
    id: "AssignedTeacher",
    label: "Assigned  Teacher",
    align: "left",
  },
];

function createData(sl, noticeName, noticeDate, AssignedTeacher) {
  return { sl, noticeName, noticeDate, AssignedTeacher };
}

const rows = [
  createData(
    "Bangla 1st",
    "201- Science Building",
    "9:30AM-10:30AM",
    "Sumon Mojumdar"
  ),
  createData(
    "Bangla 2nd",
    "211- Science Building",
    "100:30AM-11:30AM",
    "Khairul Kabir Sumon"
  ),
  createData(
    "English 1st",
    "214- Science Building",
    "11:30AM-12:30PM",
    "Ms Rehena Rahman"
  ),
  createData(
    "English 2nd",
    "301- Science Building",
    "2:30PM-3:30PM",
    "Ms Nazia Esha"
  ),
  createData(
    "English 2nd",
    "301- Science Building",
    "2:30PM-3:30PM",
    "Ms Nazia Esha"
  ),
  createData(
    "English 2nd",
    "301- Science Building",
    "2:30PM-3:30PM",
    "Ms Nazia Esha"
  ),
];

export default function ClassRoutineTable() {
  return (
    <Box
    //   sx={{
    //     boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
    //     borderRadius: "10px",
    //   }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 0,
          padding: "15px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ClassRoutineIcon />
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
          Today’s Class Routine
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          height: "195px",
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
                    background: "#CCF6F2",
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
                  }}
                >
                  {row.sl}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.noticeName}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.noticeDate}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.AssignedTeacher}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
