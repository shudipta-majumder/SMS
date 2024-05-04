import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import StudentDetails from "./StudentDetails/StudentDetails";
import NoticeBoard from "./NoticeBoard/NoticeBoard";
import ClassRoutine from "./ClassRoutine/ClassRoutine";
import TeacherList from "./TeachersList/TeacherList";
import AttendanceList from "./Attendance/AttendanceList";
import CombineTable from "./CombineTables/CombineTable";

const GuardianDashboardMain = ({ guardianData }) => {
  // const [activeIndex, setActiveIndex] = useState(0);
  // const studentRender = (index) => {
  //   switch (index) {
  //     case 0:
  //       if (detail?.data?.std_leave_trns.length === 0) {
  //         return "No Leave Transaction yet";
  //       }
  //       return (
  //         <LeaveTransaction
  //           leave={
  //             detail?.data?.std_leave_trns.length === 0
  //               ? "No Leave Transaction data available"
  //               : detail?.data?.std_leave_trns
  //           }
  //         />
  //       );
  //     case "fees":
  //       if (detail?.data?.enroll.length === 0) {
  //         return "No fees added yet.";
  //       }
  //       return (
  //         <FeesDetails
  //           fees={
  //             detail?.data?.fees_trns.length === 0
  //               ? "No Fees data available"
  //               : detail?.data?.fees_trns
  //           }
  //         />
  //       );

  //     // default:
  //     //   return <GuardianDetails detail={detail?.data?.guardians} />;
  //   }
  // };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={12} xl={6}>
          <StudentDetails guardianData={guardianData} />
        </Grid>
        <Grid item lg={6} md={12}>
          <NoticeBoard />
        </Grid>
        <Grid item lg={6} md={12}>
          <ClassRoutine />
        </Grid>
        <Grid item lg={6} md={12}>
          <TeacherList />
        </Grid>
        <Grid item lg={6} md={12}>
          <AttendanceList guardianData={guardianData} />
        </Grid>
        <Grid item lg={6} md={12}>
          <CombineTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GuardianDashboardMain;
