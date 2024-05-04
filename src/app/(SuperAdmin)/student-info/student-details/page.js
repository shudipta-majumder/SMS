import { Box, Typography } from "@mui/material/index";
import React from "react";
// import Search from "../../../../Components/Pagecomponents/StudentInformation/StudentDetails/Search/page";
// import Icon from "../../../../Components/icon/page";
import StudentAdmissionTable from "@/Components/Pagecomponents/StudentInformation/StudentDetails/Table/StudentAdmissionTable/StudentAdmissionTable";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Box>
      {/* <Search /> */}

      <Box>
        <StudentAdmissionTable session={session} />
      </Box>
    </Box>
  );
};

export default page;
