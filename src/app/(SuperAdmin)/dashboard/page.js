import React from "react";
import { Box } from "@mui/material";
import { withAuth } from "@/authHoc/withAuth";
import StudentDashboardMain from "@/Components/Pagecomponents/Dashboard/StudentDashboard/StudentDashboardMain";
import GuardianDashboardMain from "@/Components/Pagecomponents/Dashboard/GuardianDashboard/GuardianDashboardMain";
import TeacherDashboardMain from "@/Components/Pagecomponents/Dashboard/TeacherDashboard/TeacherDashboardMain";
import SuperAdminDashboardMain from "@/Components/Pagecomponents/Dashboard/SuperAdmin/SuperAdminDashboard/SuperAdminDashboardMain";

const MyServerComponent = async ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;

  console.log("dashboard session", session);

  const role = session?.user.data?.user_type;

  const DashboardApiFetch = async (accessToken) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/auth/api/dashboard`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const responseData = await res.json();

      if (responseData?.code === 200) {
        return responseData?.data;
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error fetching exam names:", error);
      return [];
    }
  };

  const dashboardData = await DashboardApiFetch(accessToken);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {session?.user.data?.user_type === "STUDENT" ? (
        <StudentDashboardMain studentData={dashboardData} />
      ) : session?.user.data?.user_type === "GUARDIAN" ? (
        <GuardianDashboardMain guardianData={dashboardData} />
      ) : session?.user.data?.user_type === "TEACHER" ? (
        <TeacherDashboardMain teacherData={dashboardData} />
      ) : session?.user.data?.user_type === "ADMIN" ? (
        <SuperAdminDashboardMain />
      ) : (
        "no dashboard"
      )}
    </Box>
  );
};

export default withAuth(MyServerComponent);
