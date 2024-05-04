import ViewPage from "@/Components/Pagecomponents/Academic/TeachersTimetable/ViewPage";

// Fetching version api
const TeacherNameAPI = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/staff/api/teacher/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const TeacherListFetchingData = await res.json();
  return TeacherListFetchingData;
};

const DayListAPI = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/day/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const dayListData = await res.json();
  return dayListData;
};

const StudnetAdmissionPage = async ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  try {
    const TeacherListData = await TeacherNameAPI(accessToken);
    const dayListData = await DayListAPI(accessToken);

    return (
      <div>
        <ViewPage
          TeacherListData={TeacherListData}
          session={session}
          dayListData={dayListData}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in StudnetAdmissionPage:", error.message);
  }
};

export default StudnetAdmissionPage;
