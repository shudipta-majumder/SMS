"use client";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Schema from "./Schema";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useOnlyIcon } from "../../../../Layout/NavContext";

const customDesign = {
  customTextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "0",
      padding: "16px",
    },
  },
  avatar: {
    width: 100,
    height: 100,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  datePicker: {
    "& .MuiIconButton-root": {
      color: "#7A6EF1",
    },
  },
};

const examDetailFields = ({
  SubjectList,
  RoomList,
  TeacherList,
  ExamRoutineDetail,
  ID,
  accessToken,
}) => {
  const { palette, color, colorX, colorY } = useOnlyIcon();

  function setTime(hourMinuteSecond) {
    const [hour, minute, second] = hourMinuteSecond.split(":").map(Number);
    return dayjs()
      .set("hour", hour)
      .set("minute", minute)
      .set("second", second)
      .startOf("minute");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      examDetail:
        ExamRoutineDetail.exam_routine_dtl.length > 0
          ? ExamRoutineDetail.exam_routine_dtl.map((examDetail) => ({
              examID: examDetail.id ? examDetail.id : null,
              exam_date: examDetail ? dayjs(examDetail?.exam_date) : null,
              subject_name: examDetail ? examDetail?.subject?.id : "",
              room_no: examDetail ? examDetail?.room?.id : "",
              exam_start_time: examDetail
                ? setTime(examDetail?.start_time)
                : null,
              exam_end_time: examDetail ? setTime(examDetail?.end_time) : null,
              teacher: examDetail ? examDetail?.teacher : null,
            }))
          : [
              {
                exam_date: null,
                subject_name: "",
                room_no: "",
                exam_start_time: null,
                exam_end_time: null,
                teacher: [],
              },
              {
                exam_date: null,
                subject_name: "",
                room_no: "",
                exam_start_time: null,
                exam_end_time: null,
                teacher: [],
              },
            ],
    },
    resolver: yupResolver(Schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "examDetail",
  });
  const ExamName = ExamRoutineDetail?.exam?.id;

  const onSubmit = async (data) => {
    console.log("data", data);

    let dataToEdit = {
      exam: ExamName && ExamName,
      exam_routine_dtl: data?.examDetail?.map((exam) => ({
        id: exam.examID ? exam.examID : undefined,
        exam_date: dayjs(exam.exam_date).format("YYYY-MM-DD"),
        subject: exam.subject_name,
        room: exam.room_no,
        start_time: dayjs(exam.exam_start_time).format("hh:mm:ss"),
        end_time: dayjs(exam.exam_end_time).format("hh:mm:ss"),
        teacher: exam.teacher.map((teacher) => teacher.id),
      })),
    };

    console.log("dataToEdit", dataToEdit);

    let response;
    try {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/exam/api/exam-routine/detail/${
          ID && ID
        }`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToEdit),
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((item, index) => {
            return (
              <Box>
                <Grid
                  container
                  spacing={2}
                  key={item.id}
                  sx={{ bgcolor: "white", padding: "10px" }}
                >
                  {/* Exam Date */}
                  <Grid item xs={12} sm={12} md={6} lg={2.4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                        }}
                      >
                        <Typography sx={{ ml: "15px" }}>Exam Date</Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name={`examDetail.${index}.exam_date`}
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              onError={(newError) => setError(newError)}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  error:
                                    !!errors?.examDetail?.[index]?.exam_date,
                                  helperText:
                                    errors?.examDetail?.[index]?.exam_date
                                      ?.message,
                                },
                              }}
                              className={customDesign.datePicker}
                              sx={{ backgroundColor: "#F8F7FA" }}
                              fullWidth
                              onChange={(date) => {
                                field.onChange(date);
                                // handleStartDateChange(date);
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  {/* Subject Name */}
                  <Grid item xs={12} sm={12} md={6} lg={2.4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                        }}
                      >
                        <Typography sx={{ ml: "15px" }}>
                          Subject Name
                        </Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <Controller
                        name={`examDetail.${index}.subject_name`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            error={!!error}
                            select
                            label="Select Subject Name"
                            sx={{ textAlign: "left" }}
                            helperText={error?.message}
                            fullWidth
                            size="small"
                            placeholder="Type Here"
                          >
                            {SubjectList?.map((subject) => (
                              <MenuItem key={subject?.id} value={subject?.id}>
                                {subject?.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Box>
                  </Grid>
                  {/* Room No */}
                  <Grid item xs={12} sm={12} md={6} lg={2.4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                        }}
                      >
                        <Typography sx={{ ml: "15px" }}>Room No</Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <Controller
                        name={`examDetail.${index}.room_no`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            error={!!error}
                            select
                            label="Select Room No"
                            sx={{ textAlign: "left" }}
                            helperText={error?.message}
                            fullWidth
                            size="small"
                            placeholder="Type Here"
                          >
                            {RoomList?.map((roomno) => (
                              <MenuItem key={roomno?.id} value={roomno?.id}>
                                {roomno?.room_no}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Box>
                  </Grid>
                  {/* Start Time */}
                  <Grid item xs={12} sm={12} md={6} lg={2.4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                        }}
                      >
                        <Typography sx={{ ml: "15px" }}>Start Time</Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name={`examDetail.${index}.exam_start_time`}
                          control={control}
                          render={({ field }) => (
                            <TimePicker
                              {...field}
                              // onError={(newError) => setError(newError)}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  error:
                                    !!errors?.examDetail?.[index]
                                      ?.exam_start_time,
                                  helperText:
                                    errors?.examDetail?.[index]?.exam_start_time
                                      ?.message,
                                },
                              }}
                              className={customDesign.datePicker}
                              sx={{ backgroundColor: "#F8F7FA" }}
                              fullWidth
                              onChange={(date) => {
                                field.onChange(date);
                                // handleStartDateChange(date);
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  {/* End Time */}
                  <Grid item xs={12} sm={12} md={6} lg={2.4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                        }}
                      >
                        <Typography sx={{ ml: "15px" }}>End Time</Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={[
                            "TimePicker",
                            "DateTimePicker",
                            "DateTimeRangePicker",
                          ]}
                          sx={{ p: 0 }}
                        >
                          <DemoItem>
                            <Controller
                              name={`examDetail.${index}.exam_end_time`}
                              control={control}
                              render={({ field }) => (
                                <TimePicker
                                  {...field}
                                  onError={(newError) => setError(newError)}
                                  slotProps={{
                                    textField: {
                                      size: "small",
                                      error:
                                        !!errors?.examDetail?.[index]
                                          ?.exam_end_time,
                                      helperText:
                                        errors?.examDetail?.[index]
                                          ?.exam_end_time?.message,
                                    },
                                  }}
                                  className={customDesign.datePicker}
                                  sx={{ backgroundColor: "#F8F7FA" }}
                                  fullWidth
                                  onChange={(date) => {
                                    field.onChange(date);
                                    // handleStartDateChange(date);
                                  }}
                                />
                              )}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  {/* Teacher List */}
                  <Grid item xs={12} sm={12} md={6} lg={4.8}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                        }}
                      >
                        <Typography sx={{ ml: "15px" }}>
                          Teacher Name
                        </Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <Stack spacing={3}>
                        <Controller
                          name={`examDetail.${index}.teacher`}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <Autocomplete
                              {...field}
                              sx={{
                                backgroundColor: palette.customColors.boxBg,
                              }}
                              multiple
                              id="tags-filled"
                              options={TeacherList}
                              getOptionLabel={(option) =>
                                `${option.staff_id} - ${option.first_name} ${option.last_name}`
                              }
                              onChange={(_, data) => {
                                field.onChange(data);
                                // handleRoomNoChange(index, data);
                              }}
                              freeSolo
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip
                                    key={option.staff_id}
                                    variant="outlined"
                                    label={`${option.staff_id} - ${option.first_name} ${option.last_name}`}
                                    {...getTagProps({ index })}
                                  />
                                ))
                              }
                              renderInput={(params) => (
                                <TextField
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
                    </Box>
                  </Grid>

                  <Box
                    sx={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    <Button
                      startIcon={<Icon icon="solar:eraser-bold-duotone" />}
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#af4b4b",
                        padding: "5px 30px",
                        fontWeight: "700",
                      }}
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Grid>
              </Box>
            );
          })}

          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                background: `${`linear-gradient(45deg, ${color} 30%, ${colorX} 90%)`}`,
                ":hover": {
                  bgcolor: "#796EF1",
                },
                padding: "5px 30px",
                marginRight: "10px",
                fontWeight: "700",
              }}
              onClick={() => {
                append({
                  exam_date: null,
                  subject_name: "",
                  room_no: "",
                  exam_start_time: null,
                  exam_end_time: null,
                  teacher: [],
                });
              }}
            >
              Add More +
            </Button>
            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{
                background: `${`linear-gradient(45deg, ${color} 30%, ${colorX} 90%)`}`,
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
        </form>
      </Box>
    </>
  );
};

export default examDetailFields;
