import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import NoticeBoard from "./NoticeBoard/NoticeBoard";
import ClassRoutine from "./ClassRoutine/ClassRoutine";
import AttendanceList from "./Attendance/AttendanceList";
import CombineTable from "./CombineTables/CombineTable";
import TeacherDetails from "./TeacherDetails/TeacherDetails";

const TeacherDashboardMain = ({ teacherData }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <TeacherDetails teacherData={teacherData?.basic_info} />
        </Grid>
        <Grid item lg={6}>
          <NoticeBoard />
        </Grid>
        <Grid item lg={12}>
          <ClassRoutine routineData={teacherData?.today_class_routine} />
        </Grid>
        <Grid item lg={6}>
          <AttendanceList attendancelist={teacherData?.attendance_list} />
        </Grid>
        <Grid item lg={6}>
          <CombineTable leavetransation={teacherData?.leave_app_list} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDashboardMain;
