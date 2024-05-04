import React from "react";
import { Box } from "@mui/material";
import LeaveApplicationTable from "./LeaveApplicationTable";

const LeaveApplicationList = ({ leavetransation }) => {
  return (
    <Box sx={{ mt: "8px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <Box
            sx={{
              position: "relative",
              borderRadius: "10px",
              padding: "0px 0px 0px 0px",
            }}
          >
            <LeaveApplicationTable leavetransation={leavetransation} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeaveApplicationList;
