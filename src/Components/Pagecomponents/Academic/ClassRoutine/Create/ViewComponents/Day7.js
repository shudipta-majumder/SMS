import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import Schema from "./Schema";
import { toast } from "react-toastify";

const dayjs = require("dayjs");
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const Monday = ({
  daysValue,
  subjectListData,
  classRoomListData,
  teacherListData,
  classPeriodsListData,
  allSchedule,
  dataToSend,
  accessToken,
  searchedRoutineID,
  createdRoutineID,
}) => {
  const [subjectName, setSubjectName] = React.useState("");
  const [teacherName, setTeacherName] = React.useState("");
  const [classPeriods, setClassPeriods] = React.useState("");
  const [roomNo, setRoomNo] = React.useState("");

  const handleSubjectNameChange = (index, data) => {
    setSubjectName(data);
  };

  const handleTeacherNameChange = (index, data) => {
    setTeacherName(data);
  };
  const handleClassPeriodsChange = (index, data) => {
    setClassPeriods(data);
  };

  const handleRoomNoChange = (index, data) => {
    setRoomNo(data);
  };

  console.log("allSchedule", allSchedule);

  const { register, control, handleSubmit, reset, watch, setValue, formState } =
    useForm({
      defaultValues: {
        test:
          allSchedule &&
          allSchedule.map((scheduleItem) => ({
            scheduleid: scheduleItem.id ? scheduleItem.id : null,
            subject: scheduleItem.subject ? scheduleItem.subject : null,
            teacher: scheduleItem.teacher ? scheduleItem.teacher : null,
            classperiods: scheduleItem.class_period
              ? scheduleItem.class_period
              : null,
            roomno: scheduleItem.class_room ? scheduleItem.class_room : null,
          })),
      },
      resolver: yupResolver(Schema),
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const handleDelete = (index, itemId) => {
    const deletingID = itemId.scheduleid ? itemId.scheduleid : null;
    remove(index);
    console.log("Deleted item ID:", deletingID);

    if (deletingID) {
      fetch(
        `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-routine/detalis/delete/${deletingID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("PATCH request successful:", data);
        })
        .catch((error) => {
          console.error("Error while performing PATCH request:", error);
        });
    }
  };

  useEffect(() => {
    if (allSchedule.length === 0) {
      append({
        subject: null,
        teacher: null,
        classperiods: null,
        roomno: null,
      });
    }
  }, []);

  const onSubmit = async (data) => {
    // console.log("onsubmit data", data);
    const dataToPut = {
      routine_dtl: data.test.map((item) => ({
        id: item.scheduleid ? item.scheduleid : undefined,
        day: daysValue,
        subject: item.subject.id,
        teacher: item.teacher.id,
        class_period: item.classperiods.id,
        class_room: item.roomno.id,
      })),
      version: dataToSend.version,
      session: dataToSend.session,
      class_name: dataToSend.class_name,
      section: dataToSend.section,
      group: dataToSend.group,
    };

    console.log("dataToPut", dataToPut);

    let response;
    try {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-routine/v2/detail/${
          searchedRoutineID ? searchedRoutineID : createdRoutineID
        }`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToPut),
        }
      );

      const responseData = await response.json();

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
        toast.success(`${responseData.message}`, {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={2.75}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Subject
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={2.75}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Teacher
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={2.75}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Time Period
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={2.75}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Room No.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={1} sx={{ textAlign: "center" }}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Action
            </Typography>
          </Grid>
        </Grid>
        <Divider />

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          {fields.map((item, index) => {
            return (
              <Box key={item.id} sx={{ pt: "10px", pb: "10px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2.75}>
                    <Stack spacing={3}>
                      <Controller
                        name={`test.${index}.subject`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <Autocomplete
                            // value={field.value}
                            {...field}
                            // value={
                            //   field.value
                            //     ? subjectListData.data.find(
                            //         (option) => field.value === option.id
                            //       ) ?? null
                            //     : null
                            // }
                            sx={{
                              backgroundColor: "white",
                            }}
                            id="tags-filled"
                            options={subjectListData.data}
                            getOptionLabel={(option) =>
                              `${option.code} - ${option.name} ${
                                option.type ? `(${option.type.name})` : ""
                              }`
                            }
                            onChange={(_, data) => {
                              field.onChange(data);
                              handleRoomNoChange(index, data);
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  variant="outlined"
                                  label={option.name}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                error={!!error}
                                helperText={error?.message}
                                {...params}
                                variant="filled"
                                label="Subject"
                                placeholder="Select Class Subject"
                              />
                            )}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={12} md={2.75}>
                    <Stack spacing={3}>
                      <Controller
                        name={`test.${index}.teacher`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <Autocomplete
                            {...field}
                            sx={{
                              backgroundColor: "white",
                            }}
                            id="tags-filled"
                            options={teacherListData.data}
                            getOptionLabel={(option) =>
                              `${option.staff_id} - ${option.first_name} ${option.last_name}`
                            }
                            onChange={(_, data) => {
                              field.onChange(data);
                              handleRoomNoChange(index, data);
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  variant="outlined"
                                  label={option.staff_id}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                error={!!error}
                                helperText={error?.message}
                                {...params}
                                variant="filled"
                                label="Teacher"
                                placeholder="Select Class Teacher"
                              />
                            )}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2.75}>
                    <Stack spacing={3}>
                      <Controller
                        name={`test.${index}.classperiods`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <Autocomplete
                            {...field}
                            sx={{
                              backgroundColor: "white",
                            }}
                            id="tags-filled"
                            options={classPeriodsListData.data}
                            getOptionLabel={(option) =>
                              `${dayjs(option.start_time, "HH:MM:SS").format(
                                "h:mm:ss A"
                              )} - ${dayjs(option.end_time, "HH:MM:SS").format(
                                "h:mm:ss A"
                              )}`
                            }
                            onChange={(_, data) => {
                              field.onChange(data);
                              handleRoomNoChange(index, data);
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  variant="outlined"
                                  label={option.name}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                error={!!error}
                                helperText={error?.message}
                                {...params}
                                variant="filled"
                                label="Time Period"
                                placeholder="Select Class Period"
                              />
                            )}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2.75}>
                    <Stack spacing={3}>
                      <Controller
                        name={`test.${index}.roomno`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <Autocomplete
                            {...field}
                            sx={{
                              backgroundColor: "white",
                            }}
                            id="tags-filled"
                            options={classRoomListData.data}
                            getOptionLabel={(option) =>
                              `${option.building} ${option.room_no}`
                            }
                            onChange={(_, data) => {
                              field.onChange(data);
                              handleRoomNoChange(index, data);
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  variant="outlined"
                                  label={option.room_no}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                error={!!error}
                                helperText={error?.message}
                                {...params}
                                variant="filled"
                                label="Room NO"
                                placeholder="Select Room NO"
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
                    md={1}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      textAlign: "center",
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        append({
                          subject: null,
                          teacher: null,
                          classperiods: null,
                          roomno: null,
                        })
                      }
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index, item)}>
                      <Icon className="text-rose-700" icon="uiw:delete" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
          <Box sx={{ textAlign: "right" }}>
            {formState.isDirty && formState.submitCount === 0 && (
              <Typography variant="body2" color="warning.main">
                Warning: You have unsaved changes. Please save your changes.
              </Typography>
            )}
            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{
                background: "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
                ":hover": {
                  bgcolor: "#796EF1",
                },
                padding: "5px 30px",
                marginRight: "10px",
                fontWeight: "700",
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Monday;
