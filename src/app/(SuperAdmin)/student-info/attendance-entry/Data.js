import { Box, Typography } from "@mui/material";
import React from "react";
import AttendanceTable from "@/Components/Pagecomponents/StudentInformation/StudentAttendance/Table/AttendanceTable";

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

//Fetching Group api
const groupNameApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/academic/api/group`,
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

const fetchAttendanceTypeApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/attendance-typee/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const attendanceTypeData = await res.json();
  return attendanceTypeData;
};

const StudentAttendancePage = async ({ accessToken }) => {
  const classSectionData = await fetchClassSectionApi(accessToken);
  const versionData = await versionNameApi(accessToken);
  const groupFetchingData = await groupNameApi(accessToken);
  const attendanceTypeFetchingData = await fetchAttendanceTypeApi(accessToken);
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "600",
          ml: "30px",
          padding: "8px 0px",
        }}
      >
        Student Attendance
      </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px 10px",
        }}
      >
        <Box sx={{ ml: "20px", mb: "10px" }}></Box>
        <AttendanceTable
          classSectionData={classSectionData}
          accessToken={accessToken}
          versionData={versionData}
          groupFetchingData={groupFetchingData}
          attendanceTypeFetchingData={attendanceTypeFetchingData}
        />
      </Box>
    </Box>
  );
};

export default StudentAttendancePage;
