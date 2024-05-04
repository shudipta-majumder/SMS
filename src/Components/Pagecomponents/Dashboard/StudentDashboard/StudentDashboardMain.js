import React from "react";
import StudentDetails from "./StudentDetails/StudentDetails";
import { Box, Grid } from "@mui/material";
import NoticeBoard from "./NoticeBoard/NoticeBoard";
import ClassRoutine from "./ClassRoutine/ClassRoutine";
import TeacherList from "./TeachersList/TeacherList";
import AttendanceList from "./Attendance/AttendanceList";
import CombineTable from "./CombineTables/CombineTable";

const StudentDashboardMain = ({ studentData }) => {
  console.log("std data", studentData);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <StudentDetails basicinfo={studentData.basic_info} />
        </Grid>
        <Grid item lg={6}>
          <NoticeBoard />
        </Grid>
        <Grid item lg={6}>
          <ClassRoutine />
        </Grid>
        <Grid item lg={6}>
          <TeacherList />
        </Grid>
        <Grid item lg={6}>
          <AttendanceList attendancelist={studentData?.attendance_list} />
        </Grid>
        <Grid item lg={6}>
          <CombineTable studentData={studentData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboardMain;
