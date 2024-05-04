import BankTable from "../../../../Components/Pagecomponents/HRMS/Bank/BankTable";
import BasicStructure from "../../../../Components/Pagecomponents/HRMS/Bank/BasicStructure";
import { Box } from "@mui/material";
import { BankProvider } from "../../../../Components/Pagecomponents/HRMS/Bank/BankContext";
import {withAuth} from "@/authHoc/withAuth";

const MyServerComponent = ({session}) => {
  return (
    <Box>
      <BankProvider>
        <BasicStructure session={session}/>
        <BankTable session={session}/>
      </BankProvider>
    </Box>
  );
}

export default withAuth(MyServerComponent);