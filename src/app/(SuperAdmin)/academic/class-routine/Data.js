import ViewPage from "@/Components/Pagecomponents/Academic/ClassRoutine/ViewPage";

// Fetching version api
const versionNameApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/academic/api/version`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const versionFetchingData = await res.json();
  return versionFetchingData;
};
const SessionNameApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/academic/api/session/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const sessionFetchingData = await res.json();
  return sessionFetchingData;
};
const classNameApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/academic/api/class/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const classFetchingData = await res.json();
  return classFetchingData;
};
const groupNameApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/academic/api/group/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const groupFetchingData = await res.json();
  return groupFetchingData;
};

const fetchClassSectionApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/academic/api/section/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const classSectionData = await res.json();
  return classSectionData;
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


const StudnetAdmissionPage = async ({session}) => {
    const accessToken = session?.user?.data?.token?.access;
  try {
    const classSectionData = await fetchClassSectionApi(accessToken);
    const versionData = await versionNameApi(accessToken);
    const sessionData = await SessionNameApi(accessToken);
    const classnameData = await classNameApi(accessToken);
    const groupData = await groupNameApi(accessToken);
    const dayListData = await DayListAPI(accessToken);


    return (
      <div>
        <ViewPage
          versionData={versionData.data}
          classSectionData={classSectionData.data}
          sessionData={sessionData.data}
          classnameData={classnameData.data}
          groupData={groupData.data}
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
