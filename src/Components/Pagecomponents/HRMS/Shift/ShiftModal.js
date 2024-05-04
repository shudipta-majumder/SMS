import { Box, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useShiftContext } from "./ShiftContext";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { useOnlyIcon } from "../../../Layout/NavContext";

const schema = yup.object({
  shiftname: yup
    .string()
    .required("Shift Name is required")
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
  starttime: yup.string().required("Start Time is required"),
  // endtime: yup.string().required("Start Time is required"),
  remarks: yup
    .string()
    .required("Remarks is required")
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
});

const ShiftModal = ({ handleClose, editRowData, accessToken }) => {
    const {color, colorX, palette } = useOnlyIcon();
  const [editingID, setEditedID] = useState(editRowData && editRowData.ids);
  const [editingShiftName, setEditedShiftName] = useState(
    editRowData && editRowData.shiftname
  );
  const [editingStartTime, setEditedStartTime] = useState(
    editRowData && editRowData.starttime
  );
  const [editingEndTime, setEditedEndTime] = useState(
    editRowData && editRowData.endtime
  );
  const [editingRemarks, setEditedRemarks] = useState(
    editRowData && editRowData.remarks
  );

  const { setShiftSaved } = useShiftContext();

  const defaultValues = {
    shiftname: editRowData ? editingShiftName : "",
    starttime: editRowData ? editingStartTime : "",
    endtime: editRowData ? editingEndTime : "",
    remarks: editRowData ? editingRemarks : "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const shiftname = data.shiftname;
    setEditedShiftName(shiftname);
    const starttime24Hour = dayjs(data.starttime, "h-mm A").format("HH:mm");
    const endtime24Hour = dayjs(data.endtime, "h-mm A").format("HH:mm");
    const remarks = data.remarks;
    setEditedRemarks(remarks);

    const dataToSend = {
      name: shiftname,
      start_time: starttime24Hour,
      end_time: endtime24Hour,
      remarks: remarks,
    };

    let response;
    try {
      if (editRowData) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/staff/api/shift/detail/${editingID}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );
      } else {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/staff/api/shift`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );
        // console.log("object",response)
      }

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
        handleClose();
        setShiftSaved();
        toast.success(`Successfully ${ShiftName} Shift Saved`, {
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Shift Name
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="shiftname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.shiftname}
                      helperText={errors.shiftname?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Start Time
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker"]}>
                    <Controller
                      name="starttime"
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          {...field}
                          error={!!errors.starttime}
                          helperText={errors.starttime?.message}
                          label={editRowData ? editingStartTime : "Start Time"}
                          onChange={(value1) => {
                            let formatedStartTime =
                              dayjs(value1).format("HH-mm A");
                            field.onChange(formatedStartTime);
                          }}
                          sx={{ width: "100%" }}
                        />
                      )}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    End Time
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker"]}>
                    <Controller
                      name="endtime"
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          {...field}
                          error={!!errors.starttime}
                          helperText={errors.starttime?.message}
                          label={editRowData ? editingEndTime : "End Time"}
                          onChange={(value1, valu2) => {
                            let formatedEndTime =
                              dayjs(value1).format("HH-mm A");
                            field.onChange(formatedEndTime);
                          }}
                          sx={{ width: "100%" }}
                        />
                      )}
                    />
                  </DemoContainer>
                </LocalizationProvider>
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
                    Remarks
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="remarks"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.remarks}
                      helperText={errors.remarks?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    />
                  )}
                />
              </Box>
            </Grid>
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
                  background:
                    "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
                  ":hover": {
                    bgcolor: "#796EF1",
                  },
                  padding: "5px 30px",
                  fontWeight: "700",
                }}
              >
                Save
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
  );
};

export default ShiftModal;
