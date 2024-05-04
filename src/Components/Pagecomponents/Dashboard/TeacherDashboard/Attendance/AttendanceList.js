import React from "react";
import { Box } from "@mui/material";
import AttendanceListTable from "./AttendanceTable";

const AttendanceList = ({ attendancelist }) => {
  return (
    <Box sx={{ mt: "8px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              position: "relative",
              borderRadius: "10px",
              padding: "0px 0px 0px 0px",
              boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <AttendanceListTable attendancelist={attendancelist} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AttendanceList;
