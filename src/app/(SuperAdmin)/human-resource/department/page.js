import DepartmentTable from "../../../../Components/Pagecomponents/HRMS/Department/DepartmentTable";
import BasicStructure from "../../../../Components/Pagecomponents/HRMS/Department/BasicStructure";
import { Box } from "@mui/material";
import { DepartmentProvider } from "../../../../Components/Pagecomponents/HRMS/Department/DepartmentContext";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <DepartmentProvider>
        <BasicStructure session={session} />
        <DepartmentTable session={session} />
      </DepartmentProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
