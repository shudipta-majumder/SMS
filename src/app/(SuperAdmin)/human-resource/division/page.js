import DivisionTable from "../../../../Components/Pagecomponents/HRMS/Division/DivisionTable";
import BasicStructure from "../../../../Components/Pagecomponents/HRMS/Division/BasicStructure";
import { Box } from "@mui/material";
import { DivisionProvider } from "../../../../Components/Pagecomponents/HRMS/Division/DivisionContext";
import {withAuth} from "@/authHoc/withAuth";

const MyServerComponent = ({session}) => {
  return (
    <Box>
      <DivisionProvider>
        <BasicStructure session={session}/>
        <DivisionTable session={session}/>
      </DivisionProvider>
    </Box>
  );
}

export default withAuth(MyServerComponent);