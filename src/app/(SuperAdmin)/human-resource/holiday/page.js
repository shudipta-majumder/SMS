import { Box } from '@mui/material';
import { withAuth } from '@/authHoc/withAuth';
import BasicStructure from '@/Components/Pagecomponents/HRMS/Holidays/BasicStructure';
import CalendarEvent from '@/Components/Pagecomponents/HRMS/Holidays/CalendarEvent';
import { CalendarProvider } from '@/Components/Pagecomponents/HRMS/Holidays/CalendarContext';

const MyServerComponent = async ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;

  let holidayTypes;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/setup/api/holiday-type/list`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();

    if (responseData.code === 200) {
      holidayTypes = responseData?.data;
    } else {
      holidayTypes = [];
    }
  } catch (error) {
    holidayTypes = [];
  }

  return (
    <Box>
      <CalendarProvider>
        <BasicStructure session={session} holidayTypes={holidayTypes} />
        <CalendarEvent accessToken={accessToken} holidayTypes={holidayTypes} />
      </CalendarProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
