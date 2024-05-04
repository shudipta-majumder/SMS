import ExamNamesTable from "../../../../Components/Pagecomponents/Exam/ExamRoutine/ExamNamesTable";
import BasicStructure from "../../../../Components/Pagecomponents/Exam/ExamRoutine/BasicStructure";
import { Box } from "@mui/material";
import { ExamNamesProvider } from "../../../../Components/Pagecomponents/Exam/ExamRoutine/ExamNamesContext";
import { withAuth } from "@/authHoc/withAuth";
import {
  fetchExamNamesList,
  fetchVerssionList,
  fetchSessionList,
  fetchClassList,
  fetchSectionList,
  fetchGroupList,
} from "../../../../authHoc/SetupAllList";

const MyServerComponent = async ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;

  const ExamNamesList = await fetchExamNamesList(accessToken);
  const VerssionList = await fetchVerssionList(accessToken);
  const SessionList = await fetchSessionList(accessToken);
  const ClassList = await fetchClassList(accessToken);
  const SectionList = await fetchSectionList(accessToken);
  const GroupList = await fetchGroupList(accessToken);

  return (
    <Box>
      <ExamNamesProvider>
        <BasicStructure
          ExamNamesList={ExamNamesList}
          VerssionList={VerssionList}
          SessionList={SessionList}
          ClassList={ClassList}
          SectionList={SectionList}
          GroupList={GroupList}
          menuData={menuData}
          accessToken={accessToken}
        />
        <ExamNamesTable
          session={session}
          ExamNamesList={ExamNamesList}
          menuData={menuData}
          accessToken={accessToken}
        />
      </ExamNamesProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);
