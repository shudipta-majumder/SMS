import ClasseRoomTable from '../../../../Components/Pagecomponents/Academic/ClassRoom/ClasseRoomTable';
import BasicStructure from '../../../../Components/Pagecomponents/Academic/ClassRoom/BasicStructure';
import { Box } from '@mui/material';
import { ClasseRoomProvider } from '../../../../Components/Pagecomponents/Academic/ClassRoom/ClasseRoomContext';
import { withAuth } from '@/authHoc/withAuth';

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <ClasseRoomProvider>
        <BasicStructure session={session} />
        <ClasseRoomTable session={session} />
      </ClasseRoomProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
