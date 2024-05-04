import ExamNamesTable from "../../../../Components/Pagecomponents/Exam/ExamNames/ExamNamesTable";
import BasicStructure from "../../../../Components/Pagecomponents/Exam/ExamNames/BasicStructure";
import { Box } from "@mui/material";
import { ExamNamesProvider } from "../../../../Components/Pagecomponents/Exam/ExamNames/ExamNamesContext";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = async ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;

  let SessionDataList;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/session/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    if (responseData.code === 200) {
      SessionDataList = responseData?.data;
    } else {
      SessionDataList = [];
    }
  } catch (error) {
    SessionDataList = [];
  }

  return (
    <Box>
      <ExamNamesProvider>
        <BasicStructure
          session={session}
          SessionDataList={SessionDataList}
          menuData={menuData}
          accessToken={accessToken}
        />
        <ExamNamesTable
          session={session}
          SessionDataList={SessionDataList}
          menuData={menuData}
          accessToken={accessToken}
        />
      </ExamNamesProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
