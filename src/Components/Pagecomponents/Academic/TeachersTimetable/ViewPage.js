"use client";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Icon } from "@iconify/react";
import Sunday from "./ViewComponents/Sunday";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import { useOnlyIcon } from "../../../Layout/NavContext";

const ViewPage = ({ session, TeacherListData, dayListData }) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;
    const {color, colorX, palette } = useOnlyIcon();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routineTableData, setRoutineTableData] = useState({});
  const [searchClicked, setSearchClicked] = useState(false);
  const currentDay = dayjs().format("dddd");
  const [value, setValue] = React.useState(currentDay);
  const [teacherName, setTeacherName] = React.useState(null);

  const handleTeacherNameChange = (index, data) => {
    // setTeacherName(data);
  };

  const schema = yup.object().shape({
    teacher: yup
      .object()
      .shape({
        id: yup.number(),
        label: yup.string(),
      })
      .required("Teacher name is required"),
  });

  const defaultValues = {
    teacher: {
      id: "",
      label: "",
    },
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  useEffect(() => {
    if (searchClicked && teacherName) {
      fetch(
        `${process.env.NEXT_PUBLIC_HOST}/academic/api/teacher-timetable/${teacherName.id}`,
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
            setRoutineTableData(responseData.data);
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
 
  const allSchedule = routineTableData?.[value];

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
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <Stack spacing={3}>
              <Controller
                name="teacher"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    sx={{
                      backgroundColor: palette.customColors.boxBg,
                    }}
                    id="tags-filled"
                    options={
                      TeacherListData.data &&
                      TeacherListData.data.map((option) => ({
                        id: option.id,
                        label: `${option.staff_id} - ${option.first_name} ${option.last_name}`,
                      }))
                    }
                    onChange={(_, data) => {
                      setTeacherName(data);
                      field.onChange(data);
                      handleTeacherNameChange(data);
                    }}
                    getOptionLabel={(option) => option.label}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option.label}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        {...params}
                        placeholder="Teacher"
                        size="small"
                      />
                    )}
                  />
                )}
              />
            </Stack>
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
                  backgroundColor: "green",
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
            </Box>
          </Grid>
        </Grid>
      </Box>
      {Object.keys(routineTableData).length > 0 ? (
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
                ) : day === "Friday" ? (
                  <Box>
                    <Typography>This is WeakEnd</Typography>
                  </Box>
                ) : (
                  <>
                    <Typography>No Routine found on {value}</Typography>
                  </>
                )}
              </TabPanel>
            ))}
          </TabContext>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ViewPage;
