import DistrictTable from "../../../../Components/Pagecomponents/HRMS/District/DistrictTable";
import BasicStructure from "../../../../Components/Pagecomponents/HRMS/District/BasicStructure";
import { Box } from "@mui/material";
import { DistrictProvider } from "../../../../Components/Pagecomponents/HRMS/District/DistrictContext";
import {withAuth} from "@/authHoc/withAuth";

const MyServerComponent = ({session}) => {
  return (
    <Box>
      <DistrictProvider>
        <BasicStructure session={session}/>
        <DistrictTable session={session}/>
      </DistrictProvider>
    </Box>
  );
}

export default withAuth(MyServerComponent);