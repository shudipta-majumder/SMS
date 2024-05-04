import SectionTable from "../../../../Components/Pagecomponents/Academic/ClassSection/SectionTable";
import BasicStructure from "../../../../Components/Pagecomponents/Academic/ClassSection/BasicStructure";
import { Box } from "@mui/material";
import { SectionProvider } from "../../../../Components/Pagecomponents/Academic/ClassSection/SectionContext";
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
