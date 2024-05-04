import React from "react";
import APIFetchApplyLeave from "@/Components/Pagecomponents/HRMS/ApplyLeave/LeaveApplyCreate/APIFetch";
import { Box } from "@mui/material";
const page = (searchPharams) => {
  return (
    <Box>
      <APIFetchApplyLeave searchPharams={searchPharams}/>
    </Box>
  );
};

export default page;
