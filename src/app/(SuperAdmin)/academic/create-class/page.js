import ClasseTable from '../../../../Components/Pagecomponents/Academic/Class/ClasseTable';
import BasicStructure from '../../../../Components/Pagecomponents/Academic/Class/BasicStructure';
import { Box } from '@mui/material';
import { ClasseProvider } from '../../../../Components/Pagecomponents/Academic/Class/ClasseContext';
import { withAuth } from '@/authHoc/withAuth';

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <ClasseProvider>
        <BasicStructure session={session} />
        <ClasseTable session={session} />
      </ClasseProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
