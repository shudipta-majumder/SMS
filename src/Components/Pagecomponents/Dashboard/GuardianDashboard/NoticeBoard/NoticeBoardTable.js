import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  DashboardDownloadIcon,
  DashboardNoticeIcon,
  DashboardViewIcon,
} from "@/Components/utility/useIconifyIcon";
import { Box, Typography } from "@mui/material";

function createData(sl, noticeName, noticeDate) {
  return { sl, noticeName, noticeDate };
}

const rows = [
  createData("1", "Exam Preparation Notification!", "20/05/2024 | 11:42:10 PM"),
  createData("2", "Exam Preparation Notification!", "20/05/2024 | 11:42:10 PM"),
  createData("3", "Exam Preparation Notification!", "20/05/2024 | 11:42:10 PM"),
  createData("3", "Exam Preparation Notification!", "20/05/2024 | 11:42:10 PM"),
  createData("3", "Exam Preparation Notification!", "20/05/2024 | 11:42:10 PM"),
  createData("3", "Exam Preparation Notification!", "20/05/2024 | 11:42:10 PM"),
  createData("3", "Exam Preparation Notification!", "20/05/2024 | 11:42:10 PM"),
  createData("3", "Exam Preparation Notification!", "20/05/2024 | 11:42:10 PM"),
  createData("3", "Exam Preparation Notification!", "20/05/2024 | 11:42:10 PM"),
];

export default function NoticeBoardTable() {
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
          padding: "20px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DashboardNoticeIcon />
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
          Notice Board
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          height: "160px",
        }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="caption table ">
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell>{row.sl}</TableCell>
                <TableCell
                  sx={{
                    padding: "13px",
                  }}
                  align="left"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#475467",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {row.noticeName}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    padding: "13px",
                  }}
                  align="left"
                >
                  {row.noticeDate}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "13px",
                    display: "flex",
                  }}
                  align="left"
                >
                  <Box mr={2}>
                    <DashboardViewIcon />
                  </Box>
                  <DashboardDownloadIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
