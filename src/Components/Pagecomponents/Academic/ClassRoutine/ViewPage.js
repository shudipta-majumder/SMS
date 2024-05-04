"use client";
import { Box, MenuItem, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Icon } from "@iconify/react";
import AddIcon from "@mui/icons-material/Add";
import Sunday from "./ViewComponents/Sunday";
import { useOnlyIcon } from "../../../Layout/NavContext";
import Link from "next/link";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const swalWithMuiButtons = MySwal.mixin({
  customClass: {
    confirmButton:
      "MuiButtonBase-root MuiButton-contained MuiButton-containedSuccess",
    cancelButton:
      "MuiButtonBase-root MuiButton-contained MuiButton-containedError",
  },
  buttonsStyling: true,
});

const ViewPage = ({
  session,
  versionData,
  classSectionData,
  sessionData,
  classnameData,
  groupData,
  dayListData,
}) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routineTableData, setRoutineTableData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [searchClicked, setSearchClicked] = useState(false);
  const [resetClicked, setResetClicked] = useState(false);
  const [verssionId, setVerssionId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [classNameId, setClassNameId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [groupId, setGroupId] = useState("");
  const currentDay = dayjs().format("dddd");
  const [value, setValue] = React.useState(currentDay);
  const { color, colorX } = useOnlyIcon();

  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "Academic")
    : null;
  const classRoutineSubMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find((subMenu) => subMenu.name === "Class Routine")
    : null;
  const classRoutinePermissions = classRoutineSubMenu?.permission || [];

  const handleSectionChange = (e) => {
    const selectedSectionId = e.target.value;
    const selectedSection = classSectionData.find(
      (section) => section.id === selectedSectionId
    );

    if (selectedSection) {
      setSectionId(selectedSectionId);
      setSectionName(selectedSection.section);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  const handleReset = () => {
    setResetClicked(true);
    setRoutineTableData(null);
  };

  useEffect(() => {
    if (searchClicked) {
      const dataToSend = {
        version: verssionId,
        session: sessionId,
        class_name: classNameId,
        section: sectionId,
        group: groupId,
      };

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

      setSearchClicked(false);
    }
  }, [searchClicked]);

  const routineData = (routineTableData && routineTableData.data[0]) || [];
  const routineId = routineData.id;
  const routineDetail = (routineData && routineData.routine_dtl) || [];

  const getScheduleByDay = (dayName) => {
    return (
      routineDetail &&
      routineDetail.filter((item) => item.day.long_name === dayName)
    );
  };

  const allSchedule = getScheduleByDay(value);

  const handleRoutineDelete = () => {
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(
            `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-routine/v2/delete/${routineId}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((responseData) => {
              if (responseData.code == 200) {
                swalWithMuiButtons.fire(
                  "Deleted!",
                  `Routine has been deleted.`,
                  "success"
                );
                handleReset();
              }
              if (responseData.code == 400) {
                toast.error(`Routine Already Deleted`, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }

              if (responseData.code == 401) {
                toast.error(`Permission Denied`, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              } else {
                // Handle errors here
              }
            })
            .catch((error) => {
              console.error("Error deleting data:", error);
            });
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          swalWithMuiButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box
        sx={{
          textAlign: "right",
        }}
      >
        {classRoutinePermissions &&
        classRoutinePermissions.includes("create") ? (
          <Link href={`/academic/class-routine/create`}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size="small"
              type="submit"
              sx={{
                background: `${`linear-gradient(45deg, ${color} 30%, ${colorX} 90%)`}`,
                ":hover": {
                  bgcolor: "#796EF1",
                },
                padding: "5px 30px",
                fontWeight: "700",
              }}
            >
              ADD & Edit
            </Button>
          </Link>
        ) : (
          ""
        )}
      </Box>

      <Box>
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
                onChange={handleSectionChange}
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

      {routineDetail && routineDetail.length > 0 ? (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mb: "10px",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {dayListData?.data.map((day) => (
                  <Tab label={day.long_name} value={day.long_name.toString()} />
                ))}
              </TabList>
              <Box>
                {classRoutinePermissions &&
                classRoutinePermissions.includes("delete") ? (
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
                    onClick={handleRoutineDelete}
                  >
                    Delete
                  </Button>
                ) : (
                  ""
                )}
              </Box>
            </Box>

            {days.map((day) => (
              <TabPanel key={day} value={day} sx={{ p: 0 }}>
                {allSchedule ? (
                  day === "Friday" ? (
                    <Box>
                      <Typography>This is WeakEnd</Typography>
                    </Box>
                  ) : (
                    <Sunday allSchedule={allSchedule} />
                  )
                ) : (
                  ""
                )}
              </TabPanel>
            ))}
          </TabContext>
        </Box>
      ) : (
        <Typography>No Class Routine </Typography>
      )}
    </Box>
  );
};

export default ViewPage;
