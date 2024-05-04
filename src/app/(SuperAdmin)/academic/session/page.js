import SessionTable from "../../../../Components/Pagecomponents/Academic/Session/SessionTable";
import BasicStructure from "../../../../Components/Pagecomponents/Academic/Session/BasicStructure";
import { Box } from "@mui/material";
import { SessionProvider } from "../../../../Components/Pagecomponents/Academic/Session/SessionContext";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({session}) => {
  return (
    <Box>
      <SessionProvider>
        <BasicStructure session={session} />
        <SessionTable session={session} />
      </SessionProvider>
    </Box>
  );
}

export default withAuth(MyServerComponent);