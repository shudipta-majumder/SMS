import React from "react";
import SubjectTable from "../../../../Components/Pagecomponents/Academic/Subject/SubjectTable";
import BasicStructure from "../../../../Components/Pagecomponents/Academic/Subject/BasicStructure";
import { SubjectProvider } from "../../../../Components/Pagecomponents/Academic/Subject/SubjectContext";
import { Box } from "@mui/material";

// Fetching version api
const SubjectTypeList = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/subject-type/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const SubjectTypeFetchingData = await res.json();
  return SubjectTypeFetchingData;
};

const StudnetAdmissionPage = async ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  try {
    const SubjectTypeListData = await SubjectTypeList(accessToken);

    return (
      <div>
        <Box>
          <SubjectProvider>
            <BasicStructure
              session={session}
              SubjectTypeListData={SubjectTypeListData}
            />
            <SubjectTable session={session} />
          </SubjectProvider>
        </Box>
      </div>
    );
  } catch (error) {
    console.error("Error in StudnetAdmissionPage:", error.message);
  }
};

export default StudnetAdmissionPage;
