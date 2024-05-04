"use client"
import React from "react";
import {
  FaGroup,
  LineMdCalendar,
  MdiGoogleClassroom,
  UisWindowSection,
} from "@/Components/utility/useIconifyIcon";
import FeesEntryFields from "./FeesEntryFields";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

const FeesEntryGrid = ({
  feesTypeData,
  feesEntryData,
  accessToken,
  ID,
}) => {
  return (
    <>
      <Box sx={{ width: "100%", marginBottom: "10px" }}>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item xs={6} md={4} lg={2.4}>
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
                subheader={feesEntryData.data.session.session}
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2.4}>
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
                subheader={feesEntryData.data.version.version}
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2.4}>
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
                subheader={feesEntryData?.data?.class_name?.name}
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2.4}>
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
                subheader={feesEntryData?.data?.section?.section}
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2.4}>
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
                subheader={feesEntryData?.data?.group?.group}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <FeesEntryFields
        feesTypeData={feesTypeData}
        feesEntryData={feesEntryData}
        accessToken={accessToken}
        feesEntryId={ID}
      />
    </>
  );
};

export default FeesEntryGrid;
