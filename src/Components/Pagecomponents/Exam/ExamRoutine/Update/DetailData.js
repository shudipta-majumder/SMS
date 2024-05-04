import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ExamRoutineDetailGrid from "./ExamRoutineDetailGrid";
import {
  fetchSubjectList,
  fetchClassRoomList,
  fetchTeacherList,
} from "@/authHoc/SetupAllList";

const FeesEntryCreatePage = async ({ searchPharams }) => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.data?.token?.access;
  const ID = searchPharams?.searchParams?.q;

  //fetching specific fees entry details api
  const ExamRoutineDetailApi = async (accessToken) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/exam/api/exam-routine/detail/${ID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );
    const ExamRoutineDetailDataResponse = await res.json();
    return ExamRoutineDetailDataResponse.data;
  };

  const ExamRoutineDetail = await ExamRoutineDetailApi(accessToken);
  const SubjectList = await fetchSubjectList(accessToken);
  const RoomList = await fetchClassRoomList(accessToken);
  const TeacherList = await fetchTeacherList(accessToken);
  return (
    <>
      <ExamRoutineDetailGrid
        ExamRoutineDetail={ExamRoutineDetail}
        SubjectList={SubjectList}
        RoomList={RoomList}
        TeacherList={TeacherList}
        accessToken={accessToken}
        ID={ID}
      />
    </>
  );
};

export default FeesEntryCreatePage;
