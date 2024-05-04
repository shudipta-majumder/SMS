import BoardTable from "../../../../Components/Pagecomponents/HRMS/Board/BoardTable";
import BasicStructure from "../../../../Components/Pagecomponents/HRMS/Board/BasicStructure";
import { Box } from "@mui/material";
import { BoardProvider } from "../../../../Components/Pagecomponents/HRMS/Board/BoardContext";
import {withAuth} from "@/authHoc/withAuth";

const MyServerComponent = ({session}) => {
  return (
    <Box>
      <BoardProvider>
        <BasicStructure session={session}/>
        <BoardTable session={session}/>
      </BoardProvider>
    </Box>
  );
}

export default withAuth(MyServerComponent);