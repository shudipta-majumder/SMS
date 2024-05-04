import CountryTable from "../../../../Components/Pagecomponents/HRMS/Country/CountryTable";
import BasicStructure from "../../../../Components/Pagecomponents/HRMS/Country/BasicStructure";
import { Box } from "@mui/material";
import { CountryProvider } from "../../../../Components/Pagecomponents/HRMS/Country/CountryContext";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <CountryProvider>
        <BasicStructure session={session} />
        <CountryTable session={session} />
      </CountryProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
