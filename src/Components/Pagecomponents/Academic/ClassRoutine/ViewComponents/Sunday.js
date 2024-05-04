import React from "react";
import { OiBook } from "@/Components/utility/useIconifyIcon";
import { BiSmartwatch } from "@/Components/utility/useIconifyIcon";
import { IconParkSolidPeople } from "@/Components/utility/useIconifyIcon";
import { IcBaselineMeetingRoom } from "@/Components/utility/useIconifyIcon";
import { Box, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Sunday = ({ allSchedule }) => {
  console.log("allSchedulefrom component", allSchedule);
  return (
    <>
      <Grid container spacing={2}>
        {allSchedule && allSchedule.map((shedule) => (
          <Grid item xs={12} sm={12} md={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Box>
                    <OiBook />
                  </Box>
                  <Typography sx={{color: "green"}}> {shedule.subject?.name}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Box>
                    <BiSmartwatch />
                  </Box>
                  <Typography sx={{color: "green"}}>
                    {" "}
                    {shedule.class_period?.start_time} -{" "}
                    {shedule.class_period?.end_time}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Box>
                    <IconParkSolidPeople />
                  </Box>
                  <Typography sx={{color: "green"}}>
                    {" "}
                    {shedule.teacher?.first_name} {shedule.teacher?.last_name} (
                    {shedule.teacher?.staff_id})
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Box>
                    <IcBaselineMeetingRoom />
                  </Box>
                  <Typography sx={{color: "green"}}>
                    {" "}
                    {shedule.class_room?.building}-{shedule.class_room?.room_no}{" "}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Sunday;
