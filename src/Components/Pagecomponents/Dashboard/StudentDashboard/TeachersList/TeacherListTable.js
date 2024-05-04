import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TableHead, Typography } from "@mui/material";
import {
  ClassTeacherBadgeIcon,
  TeacherListIcon,
} from "@/Components/utility/useIconifyIcon";
import Avatar from "@mui/material/Avatar";

const columns = [
  { id: "SL", align: "left", label: "SL" },
  { id: "TeacherName", align: "left", label: "Teacher Name" },
  {
    id: "AssignedSubject",
    label: "Assigned Subject",
    align: "left",
  },
  {
    id: "MobileNumber",
    label: "Mobile Number",
    align: "left",
  },
];

function createData(SL, TeacherName, AssignedSubject, MobileNumber) {
  return { SL, TeacherName, AssignedSubject, MobileNumber };
}

const rows = [
  createData("1", "Sumon Mojumdar", "Bangla 1st", "01700 00 00 00"),
  createData("2", "Sumon Mojumdar", "Bangla 1st", "01700 00 00 00"),
  createData("3", "Sumon Mojumdar", "Bangla 1st", "01700 00 00 00"),
  createData("4", "Sumon Mojumdar", "Bangla 1st", "01700 00 00 00"),
  createData("5", "Sumon Mojumdar", "Bangla 1st", "01700 00 00 00"),
  createData("5", "Sumon Mojumdar", "Bangla 1st", "01700 00 00 00"),
  createData("7", "Sumon Mojumdar", "Bangla 1st", "01700 00 00 00"),
  createData("8", "Sumon Mojumdar", "Bangla 1st", "01700 00 00 00"),
];

export default function TeacherListTable() {
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
          <TeacherListIcon />
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
          Teacher’s List
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
                    background: "#DCF6E8",
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
                    {row.SL}
                  </Typography>
                  {index === 0 && <ClassTeacherBadgeIcon />}
                </TableCell>
                <TableCell sx={{ padding: 0 }}>
                  <Box
                    sx={{
                      color: "#667085",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      sx={{ width: 20, height: 20 }}
                      src="/images/dashboards/StudentDashboard/TeacherList/teacherAvatar.png"
                    />
                    <Typography>{row.TeacherName}</Typography>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.AssignedSubject}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.MobileNumber}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
