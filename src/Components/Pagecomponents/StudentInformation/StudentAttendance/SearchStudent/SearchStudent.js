"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FaSearch } from "react-icons/fa";
import "dayjs/locale/en-gb";

const subjectSchema = yup.object().shape({
  class_name: yup.string().required("This field may not be blank."),
  section: yup.string().required("This field may not be blank."),
  session: yup.string().required("This field may not be blank."),
  version: yup.string().required("This field may not be blank."),
});

const SearchStudent = ({
  classSectionData,
  versionData,
  accessToken,
  groupFetchingData,
  setStudentAttendanceSearch,
}) => {
 
  const [versionId, setVersion] = useState();
  const [sessionId, setSession] = useState();
  const [sectionId, setSectionId] = useState();
  const [classnameId, setClassname] = useState();
  const [classSession, setClassSession] = useState();
  const [className, setClassName] = useState();
  const [data, setData] = useState(classSectionData);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      class_name: "",
      session: "",
      subject: "",
      section: "",
      version: "",
      group: "",
      date: null,
    },
    resolver: yupResolver(subjectSchema),
  });

  // -------- filtering version ----------

  let singleClassSection = classSectionData?.data?.filter(
    (cls) => cls?.version?.id === versionId
  );

  // ----------- Showing session ------------

  let filterSessionData = singleClassSection?.map((sess) => sess?.session);

  // ----------- filtering dublicate session values ------------

  const uniqueSessionIds = new Set();

  const removeDublicateSessions = filterSessionData?.filter((item) => {
    if (uniqueSessionIds.has(item.session)) {
      return false;
    }
    uniqueSessionIds.add(item.session);
    return true;
  });

  // ----------- filtering class ------------

  let singleSession = classSectionData?.data?.filter(
    (cls) => cls?.session?.id === sessionId
  );

  // ----------- Showing class ------------

  let filterClassNameData = singleSession?.map(
    (flClass) => flClass?.class_name
  );

  // ----------- removing dublicate class values ------------

  const uniqueClassNameIds = new Set();

  const removeDublicateClassNames = filterClassNameData?.filter((item) => {
    const combination = `${item.id}-${item.name}`;
    if (uniqueClassNameIds.has(combination)) {
      return false;
    }
    uniqueClassNameIds.add(combination);
    return true;
  });

  // ----------- filtering section ------------

  let singleClass = classSectionData?.data?.filter(
    (sec) =>
      sec?.class_name?.id === classnameId && sec?.session?.id === sessionId
  );

  // ----------- Showing section ------------

  let filterSectionData = singleClass?.map((flSection) => flSection?.section);

  const onSubmit = async (data) => {
    const dataToSend = {
      version: versionId,
      session: sessionId,
      class_name: classnameId,
      section: sectionId,
      group: data.group,
      attn_date: dayjs(data.date).format("YYYY-MM-DD"),
    };
    console.log("dataToSend", dataToSend);

    let response;
    try {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/student/api/attendance/search`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const responseData = await response.json();
      console.log("setStudentAttendanceSearch", responseData);

      if (responseData.code == 400) {
        toast.error(`${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        throw new Error("Network response was not ok");
      }
      if (responseData.code == 401) {
        toast.error("Permission denied", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        throw new Error("Network response was not ok");
      }
      if (responseData.code == 200) {
        setStudentAttendanceSearch(responseData);
        // toast.success(
        //   `Successfully ${responseData.data.class_name.name} Board Saved`,
        //   {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //   }
        // );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Grid container spacing={2}>
          {/* version */}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px" }}>Version</Typography>
                <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                  *
                </Typography>
              </Box>
              <Controller
                name="version"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error}
                    select
                    label="Select Version Name"
                    sx={{ textAlign: "left" }}
                    helperText={error?.message}
                    fullWidth
                    size="small"
                    placeholder="Type Here"
                    onChange={(e) => {
                      field.onChange(e);
                      setVersion(e.target.value);
                      setClassSession(
                        versionData?.data?.filter(
                          (ver) => ver?.id === versionId
                        )
                      );
                    }}
                  >
                    {versionData?.data?.map((version) => (
                      <MenuItem key={uuidv4()} value={version?.id}>
                        {version?.version}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* session */}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px" }}>Session</Typography>
                <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                  *
                </Typography>
              </Box>
              <Controller
                name="session"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error}
                    select
                    label="Select Session Name"
                    sx={{ textAlign: "left" }}
                    helperText={error?.message}
                    fullWidth
                    size="small"
                    placeholder="Type Here"
                    onChange={(e) => {
                      field.onChange(e);
                      setSession(e.target.value);
                      setClassSession(
                        removeDublicateSessions?.filter(
                          (ses) => ses?.id === sessionId
                        )
                      );
                    }}
                  >
                    {removeDublicateSessions?.map((session) => (
                      <MenuItem key={uuidv4()} value={session.id}>
                        {session?.session}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* classname */}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px" }}>Class Name</Typography>
                <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                  *
                </Typography>
              </Box>
              <Controller
                name="class_name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error}
                    select
                    label="Select Class Name"
                    sx={{ textAlign: "left" }}
                    helperText={error?.message}
                    fullWidth
                    size="small"
                    placeholder="Type Here"
                    onChange={(e) => {
                      field.onChange(e);
                      setClassname(e.target.value);
                      setClassSession(
                        removeDublicateClassNames?.filter(
                          (c) => c?.id === classnameId
                        )
                      );
                    }}
                  >
                    {removeDublicateClassNames?.map((classname) => (
                      <MenuItem key={uuidv4()} value={classname?.id}>
                        {classname?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* section */}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px" }}>Section</Typography>
                <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                  *
                </Typography>
              </Box>
              <Controller
                name="section"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error}
                    select
                    label="Select Section Name"
                    sx={{ textAlign: "left" }}
                    helperText={error?.message}
                    fullWidth
                    size="small"
                    placeholder="Type Here"
                    onChange={(e) => {
                      field.onChange(e);
                      setSectionId(e.target.value);
                      setClassSession(
                        removeDublicateClassNames?.filter(
                          (sec) => sec?.id === sectionId
                        )
                      );
                    }}
                  >
                    {filterSectionData?.map((section) => (
                      <MenuItem key={uuidv4()} value={section?.id}>
                        {section?.section}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* group */}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px" }}>Group</Typography>
                <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                  *
                </Typography>
              </Box>
              <Controller
                name="group"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error}
                    select
                    label="Select Group Name"
                    helperText={error?.message}
                    fullWidth
                    size="small"
                    placeholder="Type Here"
                  >
                    {groupFetchingData?.data?.map((group) => (
                      <MenuItem key={group?.id} value={group?.id}>
                        {group?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* select date */}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px" }}>Date</Typography>
                <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                  *
                </Typography>
              </Box>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label={"DD/MM/YYYY"}
                      {...field}
                      sx={{ backgroundColor: "#F8F7FA" }}
                      fullWidth
                      slotProps={{ textField: { size: "small" } }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              mt: "10px",
            }}
          >
            <Button
              variant="contained"
              size="small"
              type="submit"
              startIcon={<FaSearch />}
              sx={{
                background: "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
                ":hover": {
                  bgcolor: "#796EF1",
                },
                // padding: "5px 30px",
                marginRight: "10px",
                fontWeight: "700",
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchStudent;
