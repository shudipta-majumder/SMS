import SectionTable from "../../../../Components/Pagecomponents/Academic/Section/SectionTable";
import BasicStructure from "../../../../Components/Pagecomponents/Academic/Section/BasicStructure";
import { Box } from "@mui/material";
import { SectionProvider } from "../../../../Components/Pagecomponents/Academic/Section/SectionContext";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({session}) => {
  return (
    <Box>
      <SectionProvider>
        <BasicStructure session={session} />
        <SectionTable session={session} />
      </SectionProvider>
    </Box>
  );
}

export default withAuth(MyServerComponent);