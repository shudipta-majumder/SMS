import SubjectTable from '../../../../Components/Pagecomponents/Academic/ClassSubject/SubjectTable';
import BasicStructure from '../../../../Components/Pagecomponents/Academic/ClassSubject/BasicStructure';
import { Box } from '@mui/material';
import { SubjectProvider } from '../../../../Components/Pagecomponents/Academic/ClassSubject/SubjectContext';
import { withAuth } from '@/authHoc/withAuth';

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <SubjectProvider>
        <BasicStructure session={session} />
        <SubjectTable session={session} />
      </SubjectProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
