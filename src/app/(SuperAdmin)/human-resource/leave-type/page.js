import LeaveTypeTable from "../../../../Components/Pagecomponents/HRMS/LeaveType/LeaveTypeTable";
import BasicStructure from "../../../../Components/Pagecomponents/HRMS/LeaveType/BasicStructure";
import { Box } from "@mui/material";
import { LeaveTypeProvider } from "../../../../Components/Pagecomponents/HRMS/LeaveType/LeaveTypeContext";
import {withAuth} from "@/authHoc/withAuth";

const MyServerComponent = ({session}) => {
  return (
    <Box>
      <LeaveTypeProvider>
        <BasicStructure session={session}/>
        <LeaveTypeTable session={session}/>
      </LeaveTypeProvider>
    </Box>
  );
}

export default withAuth(MyServerComponent);