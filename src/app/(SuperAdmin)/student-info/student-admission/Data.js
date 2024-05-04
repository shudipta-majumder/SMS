import React from "react";
import StudentAdmission from "./StudentAdmission";

//fetching gender api
const genderApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/gender/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const genderFetchingData = await res.json();
  return genderFetchingData;
};

//fetching religion api
const religionApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/religion/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const religionFetchingData = await res.json();
  return religionFetchingData;
};

//fetching blood group api
const bloodGroupApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/bloodgroup/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const bloodGroupFetchingData = await res.json();
  return bloodGroupFetchingData;
};

//fetching relation api
const relationApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/relation/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const relationFetchingData = await res.json();
  return relationFetchingData;
};

//fetching occupation api
const occupationApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/occupation/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const occupationFetchingData = await res.json();
  return occupationFetchingData;
};

//fetching classname api
const classNameApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/academic/api/class`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const classNameFetchingData = await res.json();
  return classNameFetchingData;
};
const sectionNameApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/academic/api/section`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const sectionFetchingData = await res.json();
  return sectionFetchingData;
};

// Fetching session api
const sessionNameApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/academic/api/session`,
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
// Fetching shift api
const shiftNameApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/staff/api/shift/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const shiftFetchingData = await res.json();
  return shiftFetchingData;
};

const fetchClassSectionApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-section`,
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

// Fetching single student admission data api
const singleStudentAdmissionApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/student/api/student/detail/432`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const singleStudentAdmission = await res.json();
  return singleStudentAdmission;
};

const StudnetAdmissionPage = async ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  try {
    const genderData = await genderApiName(accessToken);
    const religionData = await religionApiName(accessToken);
    const bloodGroupData = await bloodGroupApiName(accessToken);
    const relationData = await relationApiName(accessToken);
    const occupationData = await occupationApiName(accessToken);
    const classNameData = await classNameApi(accessToken);
    const sectioinData = await sectionNameApi(accessToken);
    const sessionData = await sessionNameApi(accessToken);
    const versionData = await versionNameApi(accessToken);
    const shiftData = await shiftNameApi(accessToken);
    const classSectionData = await fetchClassSectionApi(accessToken);
    const studentAdmissionApiData = await singleStudentAdmissionApi(
      accessToken
    );
    console.log("occupationData", occupationData.data);
    return (
      <div>
        <StudentAdmission
          genderData={genderData.data}
          religionData={religionData.data}
          bloodGroupData={bloodGroupData.data}
          relationData={relationData.data}
          occupationData={occupationData.data}
          classNameData={classNameData.data}
          sectioinData={sectioinData.data}
          sessionData={sessionData.data}
          versionData={versionData.data}
          shiftData={shiftData.data}
          studentAdmissionApiData={studentAdmissionApiData.data}
          session={session}
          classSectionData={classSectionData}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in StudnetAdmissionPage:", error.message);
  }
};

export default StudnetAdmissionPage;
