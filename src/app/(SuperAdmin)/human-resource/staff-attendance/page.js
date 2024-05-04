import React from "react";
import Search from "@/Components/Pagecomponents/HRMS/StaffAttendance/Search";
import { Box } from "@mui/material";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <Search session={session} />
    </Box>
  );
};

export default withAuth(MyServerComponent);
