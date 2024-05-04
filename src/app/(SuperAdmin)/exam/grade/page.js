import GradeTable from "../../../../Components/Pagecomponents/Exam/Grade/GradeTable";
import BasicStructure from "../../../../Components/Pagecomponents/Exam/Grade/BasicStructure";
import { Box } from "@mui/material";
import { GradeProvider } from "../../../../Components/Pagecomponents/Exam/Grade/GradeContext";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <GradeProvider>
        <BasicStructure session={session} />
        <GradeTable session={session} />
      </GradeProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
