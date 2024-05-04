import StaffTable from "../../../../Components/Pagecomponents/HRMS/Staff/StaffTable";
import BasicStructure from "../../../../Components/Pagecomponents/HRMS/Staff/BasicStructure";
import { Box } from "@mui/material";
import { StaffProvider } from "../../../../Components/Pagecomponents/HRMS/Staff/StaffContext";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <StaffProvider>
        <BasicStructure session={session}/>
        <StaffTable session={session} />
      </StaffProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
