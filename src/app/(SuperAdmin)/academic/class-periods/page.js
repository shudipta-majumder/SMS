import ClassePeriodsTable from '../../../../Components/Pagecomponents/Academic/ClassPeriods/ClassePeriodsTable';
import BasicStructure from '../../../../Components/Pagecomponents/Academic/ClassPeriods/BasicStructure';
import { Box } from '@mui/material';
import { ClassePeriodsProvider } from '../../../../Components/Pagecomponents/Academic/ClassPeriods/ClassePeriodsContext';
import { withAuth } from '@/authHoc/withAuth';

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <ClassePeriodsProvider>
        <BasicStructure session={session} />
        <ClassePeriodsTable session={session} />
      </ClassePeriodsProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
