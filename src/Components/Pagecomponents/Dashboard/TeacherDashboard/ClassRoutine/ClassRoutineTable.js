import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TableHead, Typography } from "@mui/material";
import { ClassRoutineIcon } from "@/Components/utility/useIconifyIcon";

export default function ClassRoutineTable({ routineData }) {
  const columns = [
    { id: "Serial", align: "left", label: "Serial" },
    { id: "TimeSlot", align: "left", label: "Time Slot" },
    {
      id: "Version",
      label: "Version",
      align: "left",
    },
    {
      id: "Group",
      label: "Group",
      align: "left",
    },
    {
      id: "Class",
      label: "Class",
      align: "left",
    },
    {
      id: "Section",
      label: "Section",
      align: "left",
    },
    { id: "Subject", align: "left", label: "Subject" },
    {
      id: "buildingno",
      label: "Building No",
      align: "left",
    },
    {
      id: "RoomNo",
      label: "Room No",
      align: "left",
    },
    {
      id: "Present",
      label: "Present",
      align: "left",
    },
  ];

  function createData(
    Serial,
    TimeSlot,
    Version,
    Group,
    Class,
    Section,
    Subject,
    buildingno,
    RoomNo,
    Present
  ) {
    return {
      Serial,
      TimeSlot,
      Version,
      Group,
      Class,
      Section,
      Subject,
      buildingno,
      RoomNo,
      Present,
    };
  }

  const rows = routineData?.map((routine, key) => {
    return createData(
      key + 1 || "N/A",
      `${routine.start_time} - ${routine.end_time}` || "N/A",
      routine.version || "N/A",
      routine.group || "N/A",
      routine.class_name || "N/A",
      routine.section || "N/A",
      routine.subject || "N/A",
      routine.buildingg || "N/A",
      routine.room_no || "N/A",
      routine.present === 0 ? "0" : routine.present
    );
  });
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
                  {row.Serial}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.TimeSlot}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.Version}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.Group}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.Class}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.Section}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.Subject}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.buildingno}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.RoomNo}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "5px",
                    color: "#667085",
                  }}
                  align="left"
                >
                  {row.Present}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
