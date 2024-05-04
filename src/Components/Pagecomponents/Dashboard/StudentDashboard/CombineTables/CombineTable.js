import React from "react";
import { Box, Grid } from "@mui/material";
import LeaveApplicationList from "../LeaveApplicationList/LeaveApplicationList";
import FeesPaidList from "../FeesPaidStatus/FeesPaidList";

const CombineTable = ({ studentData }) => {
  return (
    <Box sx={{ mt: "8px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              //   position: "relative",
              borderRadius: "10px",
              padding: "0px 0px 0px 0px",
              boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Grid container>
              <Grid item lg={6}>
                <LeaveApplicationList
                  leaveapplist={studentData.leave_app_list}
                />
              </Grid>
              <Grid item lg={6}>
                <FeesPaidList />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CombineTable;
