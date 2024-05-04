import ShiftTable from "../../../../Components/Pagecomponents/HRMS/Shift/ShiftTable";
import BasicStructure from "../../../../Components/Pagecomponents/HRMS/Shift/BasicStructure";
import { Box } from "@mui/material";
import { ShiftProvider } from "../../../../Components/Pagecomponents/HRMS/Shift/ShiftContext";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <ShiftProvider>
        <BasicStructure session={session} />
        <ShiftTable session={session} />
      </ShiftProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
