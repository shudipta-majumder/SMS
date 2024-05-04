"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  TextField,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Icon } from "@iconify/react";
import Day7 from "./ViewComponents/Day7";
import dayjs from "dayjs";

const RoutineCreateUpdate = ({
  accessToken,
  versionData,
  sessionData,
  classnameData,
  classSectionData,
  groupData,
  dayListData,
  subjectListData,
  classRoomListData,
  teacherListData,
  classPeriodsListData,
}) => {
  // const accessToken = session?.user?.data?.token?.access;
  const [daysValue, setDaysValue] = React.useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routineTableData, setRoutineTableData] = useState(null);
  const [subjectName, setSubjectName] = React.useState("");
  const [teacherName, setTeacherName] = React.useState("");
  const [roomNo, setRoomNo] = React.useState("");
  // const [searchClicked, setSearchClicked] = useState(false);
  const [resetClicked, setResetClicked] = useState(false);
  const [createdRoutineID, setCreatedRoutineID] = useState(null);
  const [searchedRoutineID, setSearchedRoutineID] = useState(null);
  const [verssionId, setVerssionId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [classNameId, setClassNameId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [groupId, setGroupId] = useState("");

  const handleChange = (event, newValue) => {
    setDaysValue(newValue);
  };

  // useEffect(() => {
  //   const dataToSends = {
  //     version: 84,
  //     session: 458,
  //     class_name: 36,
  //     section: 80,
  //     group: 2,
  //   };

  //   fetch(
  //     `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-routine/v2/search`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(dataToSends),
  //     }
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       if (responseData.code == 200) {
  //         console.log("into else condition", responseData);
  //         setSearchedRoutineID(responseData.data[0].id);
  //       }
  //       if (responseData.code == 401) {
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((fetchError) => {
  //       setError(fetchError);
  //       setIsLoading(false);
  //     });
  // }, []);

  const dataToSend = {
    version: verssionId,
    session: sessionId,
    class_name: classNameId,
    section: sectionId,
    group: groupId,
  };

  const handleSearchClick = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-routine/v2/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.code == 200) {
          if (responseData.data.length === 0) {
            console.log("into if condition");
            const dataToSend = {
              version: verssionId,
              session: sessionId,
              class_name: classNameId,
              section: sectionId,
              group: groupId,
              routine_dtl: [],
            };

            fetch(
              `${process.env.NEXT_PUBLIC_HOST}/academic/api/v2/class-routine`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
              }
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((responseData) => {
                if (responseData.code == 200) {
                  console.log("into if responsedata", responseData);
                  setCreatedRoutineID(responseData.data.id);
                }
                if (responseData.code == 401) {
                  console.log("unauthorized data");
                }
              })
              .catch((fetchError) => {
                setError(fetchError);
              });
          } else {
            console.log("into else condition", responseData);
            setSearchedRoutineID(responseData.data[0].id);
          }
        }
        if (responseData.code == 401) {
          setIsLoading(false);
        }
      })
      .catch((fetchError) => {
        setError(fetchError);
        setIsLoading(false);
      });
  };

  const handleReset = () => {
    setResetClicked(true);
    setRoutineTableData(null);
    setSearchedRoutineID(null);
    setCreatedRoutineID(null);
  };

  useEffect(() => {
    // if (value || searchedRoutineID || createdRoutineID) {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-routine/v2/detail/${
        searchedRoutineID ? searchedRoutineID : createdRoutineID
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.code == 200) {
          setRoutineTableData(responseData);
          setCount(responseData.pagination.count);
          setIsLoading(false);
        }
        if (responseData.code == 401) {
          setIsLoading(false);
        }
      })
      .catch((fetchError) => {
        setError(fetchError);
        setIsLoading(false);
      });
    // }
  }, [daysValue, searchedRoutineID, createdRoutineID]);

  const routineDetail =
    (routineTableData && routineTableData.data.routine_dtl) || [];

  const getScheduleByDay = (dayName) => {
    return (
      routineDetail && routineDetail.filter((item) => item.day.id === dayName)
    );
  };

  const allSchedule = getScheduleByDay(daysValue);
  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <Box sx={{ mb: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Typography sx={{ textAlign: "left" }}>Version</Typography>
              <TextField
                select
                label="Select version"
                sx={{ textAlign: "left", backgroundColor: "white" }}
                fullWidth
                size="small"
                placeholder="Type Here"
                onChange={(e) => setVerssionId(e.target.value)}
              >
                {versionData.map((verssion) => (
                  <MenuItem key={verssion.id} value={verssion.id}>
                    {verssion.version}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Typography sx={{ textAlign: "left" }}>Session</Typography>
              <TextField
                select
                label="Select session"
                sx={{ textAlign: "left", backgroundColor: "white" }}
                fullWidth
                size="small"
                placeholder="Type Here"
                onChange={(e) => setSessionId(e.target.value)}
              >
                {sessionData.map((session) => (
                  <MenuItem key={session.id} value={session.id}>
                    {session.session}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Typography sx={{ textAlign: "left" }}>Class Name</Typography>
              <TextField
                select
                label="Select class name"
                sx={{ textAlign: "left", backgroundColor: "white" }}
                fullWidth
                size="small"
                placeholder="Type Here"
                onChange={(e) => setClassNameId(e.target.value)}
              >
                {classnameData.map((classname) => (
                  <MenuItem key={classname.id} value={classname.id}>
                    {classname.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Typography sx={{ textAlign: "left" }}>Section</Typography>
              <TextField
                select
                label="Select section"
                sx={{ textAlign: "left", backgroundColor: "white" }}
                fullWidth
                size="small"
                placeholder="Type Here"
                onChange={(e) => setSectionId(e.target.value)}
              >
                {classSectionData.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    {section.section}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Typography sx={{ textAlign: "left" }}>Group</Typography>
              <TextField
                select
                label="Select group"
                sx={{ textAlign: "left", backgroundColor: "white" }}
                fullWidth
                size="small"
                placeholder="Type Here"
                onChange={(e) => setGroupId(e.target.value)}
              >
                {groupData.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              mb: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: "20px",
              }}
            >
              <Button
                startIcon={<Icon icon="material-symbols:search" />}
                variant="contained"
                size="small"
                type="submit"
                sx={{
                  backgroundColor: "#55ce63",
                  ":hover": {
                    bgcolor: "green",
                  },
                  padding: "5px 30px",
                  fontWeight: "700",
                }}
                onClick={handleSearchClick}
              >
                Search
              </Button>

              <Button
                startIcon={<Icon icon="solar:eraser-bold-duotone" />}
                variant="contained"
                size="small"
                type="submit"
                sx={{
                  backgroundColor: "#f62d51",
                  padding: "5px 30px",
                  fontWeight: "700",
                }}
                onClick={handleReset}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {routineTableData ? (
        <Box sx={{ backgroundColor: "white", p: 1 }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={daysValue}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {dayListData?.data.map((day) => (
                    <Tab label={day.long_name} value={day.id} />
                  ))}
                </TabList>
              </Box>
              {days.map((day) => (
                <TabPanel key={day} value={day}>
                  {allSchedule ? (
                    day === 6 ? (
                      <Box>
                        <Typography>This is WeakEnd</Typography>
                      </Box>
                    ) : (
                      <Day7
                        daysValue={daysValue}
                        createdRoutineID={createdRoutineID}
                        searchedRoutineID={searchedRoutineID}
                        accessToken={accessToken}
                        allSchedule={allSchedule}
                        dataToSend={dataToSend}
                        subjectListData={subjectListData}
                        classRoomListData={classRoomListData}
                        teacherListData={teacherListData}
                        classPeriodsListData={classPeriodsListData}
                      />
                    )
                  ) : (
                    ""
                  )}
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default RoutineCreateUpdate;
