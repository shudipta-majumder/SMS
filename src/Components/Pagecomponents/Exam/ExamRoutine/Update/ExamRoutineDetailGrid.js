"use client";
import React from "react";
import {
  FaGroup,
  HealthiconsIExamMultipleChoiceOutline,
  LineMdCalendar,
  MdiGoogleClassroom,
  UisWindowSection,
} from "@/Components/utility/useIconifyIcon";
import DetailsFieldUpdate from "./DetailsFieldUpdate";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

const FeesEntryGrid = ({
  SubjectList,
  RoomList,
  TeacherList,
  ExamRoutineDetail,
  accessToken,
  ID,
}) => {
  return (
    <>
      <Box sx={{ width: "100%", marginBottom: "10px" }}>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item xs={6} md={4} lg={2}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#2f3349" }} aria-label="recipe">
                    <Box
                      sx={{
                        fontSize: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <HealthiconsIExamMultipleChoiceOutline
                        sx={{ color: "white" }}
                      />
                    </Box>
                  </Avatar>
                }
                title="Exam Name"
                subheader={
                  ExamRoutineDetail.exam ? ExamRoutineDetail.exam.name : "N/A"
                }
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#2f3349" }} aria-label="recipe">
                    <Box
                      sx={{
                        fontSize: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <LineMdCalendar sx={{ color: "white" }} />
                    </Box>
                  </Avatar>
                }
                title="Session"
                subheader={
                  ExamRoutineDetail.session
                    ? ExamRoutineDetail.session.session
                    : "N/A"
                }
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#2f3349" }} aria-label="recipe">
                    <Box
                      sx={{
                        fontSize: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      EB
                    </Box>
                  </Avatar>
                }
                title="Version"
                subheader={
                  ExamRoutineDetail.version
                    ? ExamRoutineDetail.version?.version
                    : "N/A"
                }
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#2f3349" }} aria-label="recipe">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MdiGoogleClassroom sx={{ color: "white" }} />
                    </Box>
                  </Avatar>
                }
                title="Class Name"
                subheader={
                  ExamRoutineDetail.class_name
                    ? ExamRoutineDetail.class_name?.name
                    : "N/A"
                }
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#2f3349" }} aria-label="recipe">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <UisWindowSection sx={{ color: "white" }} />
                    </Box>
                  </Avatar>
                }
                title="Section"
                subheader={
                  ExamRoutineDetail.section
                    ? ExamRoutineDetail.section?.section
                    : "N/A"
                }
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#2f3349" }} aria-label="recipe">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FaGroup sx={{ color: "white" }} />
                    </Box>
                  </Avatar>
                }
                title="Group"
                subheader={
                  ExamRoutineDetail.group
                    ? ExamRoutineDetail.group?.name
                    : "N/A"
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <DetailsFieldUpdate
        SubjectList={SubjectList}
        RoomList={RoomList}
        TeacherList={TeacherList}
        ExamRoutineDetail={ExamRoutineDetail}
        accessToken={accessToken}
        ID={ID}
      />
    </>
  );
};

export default FeesEntryGrid;
