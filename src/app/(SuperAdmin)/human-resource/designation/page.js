import DesignationTable from "../../../../Components/Pagecomponents/HRMS/Designation/DesignationTable";
import BasicStructure from "../../../../Components/Pagecomponents/HRMS/Designation/BasicStructure";
import { Box } from "@mui/material";
import { DesignationProvider } from "../../../../Components/Pagecomponents/HRMS/Designation/DesignationContext";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <DesignationProvider>
        <BasicStructure session={session} />
        <DesignationTable session={session} />
      </DesignationProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
