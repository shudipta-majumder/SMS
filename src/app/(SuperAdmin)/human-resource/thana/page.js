import ThanaTable from "../../../../Components/Pagecomponents/HRMS/Thana/ThanaTable";
import BasicStructure from "../../../../Components/Pagecomponents/HRMS/Thana/BasicStructure";
import { Box } from "@mui/material";
import { ThanaProvider } from "../../../../Components/Pagecomponents/HRMS/Thana/ThanaContext";
import {withAuth} from "@/authHoc/withAuth";

const MyServerComponent = ({session}) => {
  return (
    <Box>
      <ThanaProvider>
        <BasicStructure session={session}/>
        <ThanaTable session={session}/>
      </ThanaProvider>
    </Box>
  );
}

export default withAuth(MyServerComponent);