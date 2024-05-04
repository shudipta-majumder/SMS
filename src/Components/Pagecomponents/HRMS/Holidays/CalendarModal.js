import * as yup from "yup";
import dayjs from "dayjs";
import Icon from "../../../icon/page";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useCalendarContext } from "./CalendarContext";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useState } from "react";
import { useOnlyIcon } from "@/Components/Layout/NavContext";

const CalendarModal = ({
  accessToken,
  handleClose,
  updateEvent,
  holidayTypes,
  handleDelete,
}) => {
  const { palette, color, colorX } = useOnlyIcon();
  const { setCalendarSaved } = useCalendarContext();
  const [onChangedHolidayType, setOnchangedHolidayType] = useState(
    updateEvent?.type === 1 ? "holiday" : "event"
  );

  console.log("updateEvent", updateEvent);

  const schema = yup.object({
    name: yup.string().required("This field is required"),
    type: yup.string().required("This field is required"),
    start_date: yup.string().required("This field is required"),
    end_date: yup.string().required("This field is required"),
  });

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: updateEvent ? updateEvent?.name : "",
      type: updateEvent ? updateEvent?.type : "",
      start_date: updateEvent
        ? dayjs(
            `${updateEvent?.start_date}T${
              updateEvent?.start_time ? updateEvent?.start_time : "00:00:00"
            }`
          )
        : null,
      end_date: updateEvent
        ? dayjs(
            `${updateEvent?.end_date}T${
              updateEvent?.end_time ? updateEvent?.end_time : "23:59:59"
            }`
          )
        : null,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const dateObjStart = dayjs(data.start_date);
    const dateObjEnd = dayjs(data.end_date);

    const formattedDateStart = dateObjStart.format("YYYY-MM-DD");
    const formattedDateEnd = dateObjEnd.format("YYYY-MM-DD");
    const formattedTimeStart = dateObjStart.format("HH:mm:ss");
    const formattedTimeEnd = dateObjEnd.format("HH:mm:ss");

    const dataToSend = {
      name: data.name,
      type: data.type,
      start_date: formattedDateStart,
      end_date: formattedDateEnd,
      start_time: formattedTimeStart,
      end_time: data.type === "1" ? "23:59:59" : formattedTimeEnd, //if type is hoiday then end time will be 11.59pm
    };

    const postApi = `${process.env.NEXT_PUBLIC_HOST}/hrms/api/holiday`;
    const putApi = `${process.env.NEXT_PUBLIC_HOST}/hrms/api/holiday/detail/${updateEvent?.id}`;

    try {
      const response = await fetch(
        updateEvent && updateEvent.id ? putApi : postApi,
        {
          method: updateEvent && updateEvent.id ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const responseData = await response.json();

      if (responseData.code === 200) {
        handleClose();
        setCalendarSaved();
        toast.success(responseData?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (responseData.code === 400) {
        toast.error(`already exists`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (responseData.code === 401) {
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
      }
    } catch (error) {}

    reset();
  };

  const handleChange = (e) => {
    if (e.target.value === 1) {
      setOnchangedHolidayType("holiday");
      setValue("type", 1);
    } else {
      setOnchangedHolidayType("event");
      setValue("type", 2);
    }
  };

  return (
    <section>
      <Box>
        <Box
          sx={{
            backgroundColor: palette.customColors.boxBg,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ textAlign: "center" }}
          >
            {updateEvent && updateEvent?.id ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  component={"h3"}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: palette.text.secondary,
                  }}
                >
                  Update Event
                </Box>
                <Box>
                  <IconButton onClick={() => handleDelete(updateEvent?.id)}>
                    <Icon
                      title="Delete"
                      className="text-rose-700"
                      icon="uiw:delete"
                    />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box component={"h3"} sx={{ color: palette.text.secondary }}>
                Add Event
              </Box>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      sx={{ ml: "15px", color: palette.text.secondary }}
                    >
                      Title
                    </Typography>
                    <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                      *
                    </Typography>
                  </Box>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        fullWidth
                        size="small"
                        placeholder="Type Here"
                      />
                    )}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      sx={{ ml: "15px", color: palette.text.secondary }}
                    >
                      Type
                    </Typography>
                    <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                      *
                    </Typography>
                  </Box>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        select
                        {...field}
                        onChange={handleChange}
                        error={!!error}
                        helperText={error?.message}
                        size="small"
                        fullWidth
                      >
                        {holidayTypes.length > 0 ? (
                          holidayTypes.map((holidayType) => (
                            <MenuItem
                              key={holidayType.id}
                              value={holidayType.id}
                              sx={{ color: holidayType.code }}
                            >
                              {holidayType.name}
                            </MenuItem>
                          ))
                        ) : (
                          <small className="text-red-500 px-6">
                            Server response was not ok!
                          </small>
                        )}
                      </TextField>
                    )}
                  />
                </Box>
              </Grid>

              {/*-------->>> Start & End Date <<<---------*/}
              {/* <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography sx={{ ml: '15px' }}>Start Date</Typography>
                    <Typography sx={{ color: '#786CF1', fontSize: '20px' }}>*</Typography>
                  </Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name='start_date'
                      control={control}
                      inputFormat='YYYY/MM/DD'
                      views={['year', 'month', 'day']}
                      render={({ field, fieldState: { error } }) => {
                        return (
                          <DatePicker {...field} error={!!error} helperText={error?.message} fullWidth slotProps={{ textField: { size: 'small' } }} />
                        );
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid> */}

              {onChangedHolidayType === "holiday" ? (
                <>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          sx={{ ml: "15px", color: palette.text.secondary }}
                        >
                          Start Date
                        </Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="start_date"
                          control={control}
                          inputFormat="YYYY/MM/DD"
                          views={["year", "month", "day"]}
                          render={({ field, fieldState: { error } }) => {
                            return (
                              <DatePicker
                                {...field}
                                error={!!error}
                                helperText={error?.message}
                                fullWidth
                                slotProps={{ textField: { size: "small" } }}
                              />
                            );
                          }}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          sx={{ ml: "15px", color: palette.text.secondary }}
                        >
                          End Date
                        </Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="end_date"
                          control={control}
                          inputFormat="YYYY/MM/DD"
                          views={["year", "month", "day"]}
                          render={({ field, fieldState: { error } }) => {
                            return (
                              <DatePicker
                                {...field}
                                error={!!error}
                                helperText={error?.message}
                                fullWidth
                                slotProps={{ textField: { size: "small" } }}
                              />
                            );
                          }}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          sx={{ ml: "15px", color: palette.text.secondary }}
                        >
                          Start Date
                        </Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["MobileDateTimePicker"]}>
                          <Controller
                            name="start_date"
                            control={control}
                            inputFormat="YYYY/MM/DD"
                            views={["year", "month", "day"]}
                            render={({ field, fieldState: { error } }) => {
                              return (
                                <DemoItem>
                                  <MobileDateTimePicker
                                    {...field}
                                    error={!!error}
                                    helperText={error?.message}
                                    fullWidth
                                    slotProps={{ textField: { size: "small" } }}
                                  />
                                </DemoItem>
                              );
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          sx={{ ml: "15px", color: palette.text.secondary }}
                        >
                          End Date
                        </Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["MobileDateTimePicker"]}>
                          <Controller
                            name="end_date"
                            control={control}
                            inputFormat="YYYY/MM/DD"
                            views={["year", "month", "day"]}
                            render={({ field, fieldState: { error } }) => {
                              return (
                                <DemoItem>
                                  <MobileDateTimePicker
                                    {...field}
                                    error={!!error}
                                    helperText={error?.message}
                                    fullWidth
                                    slotProps={{ textField: { size: "small" } }}
                                  />
                                </DemoItem>
                              );
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                </>
              )}

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "10px",
                  mt: "10px",
                }}
              >
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
                    fontWeight: "700",
                  }}
                >
                  {updateEvent && updateEvent.id ? "Update" : "Save"}
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    background:
                      "linear-gradient(45deg,#B22222 70%, #C11B17 30% )",
                    ":hover": {
                      bgcolor: "#796EF1",
                    },
                    padding: "5px 30px",
                    fontWeight: "700",
                  }}
                  onClick={handleClose}
                >
                  close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default CalendarModal;
