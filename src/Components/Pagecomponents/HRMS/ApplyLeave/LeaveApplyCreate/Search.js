"use client";

import { Box, Typography, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../../Layout/NavContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import { useRouter } from "next/navigation";

const swalWithMuiButtons = MySwal.mixin({
  customClass: {
    confirmButton:
      "MuiButtonBase-root MuiButton-contained MuiButton-containedSuccess",
    cancelButton:
      "MuiButtonBase-root MuiButton-contained MuiButton-containedError",
  },
  buttonsStyling: true,
});

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

const schema = yup.object().shape({
  empolyee: yup.string(),
  responsibleemployee: yup
    .object()
    .shape({
      id: yup.number(),
      name: yup.string(),
    })
    .required("responsibleemployee is required"),
  leavetype: yup.string().required().label("Leave Type"),
  fromdate: yup
    .date()
    .nullable()
    .required("Start Date is required")
    .typeError("Start Date must be a valid date"),
  enddate: yup
    .date()
    .nullable()
    .required("End Date is required")
    .min(
      yup.ref("fromdate"),
      "The end date should not be less than the starting date."
    )
    .typeError("End Date must be a valid date"),
  totaldays: yup.string(),
  addressduringleave: yup.string().required().label("Address During Leave"),
  reasonforleave: yup.string().required().label("Reason For Leave"),
  remarks: yup.string(),
});

const LeaveCreate = ({
  LeaveStatusData,
  EmployeeName,
  LeaveTypeData,
  EmpolyeeData,
  editingRowData,
  accessToken,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalLeaveDays, setTotalLeaveDays] = useState(null);
  const { palette, color } = useOnlyIcon();
  const router = useRouter();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const totalDays = end.diff(start, "day");
    const addedDaysTotal = totalDays + 1;
    setTotalLeaveDays(addedDaysTotal);
  }, [startDate, endDate, editingRowData]);

  const defaultValues = {
    empolyee: EmployeeName ? EmployeeName : "N/A",
    responsibleemployee:
      (editingRowData && editingRowData?.responsible) || null,
    leavetype: (editingRowData && editingRowData.leave_type.id) || "",
    fromdate: (editingRowData && dayjs(editingRowData.start_date)) || null,
    enddate: (editingRowData && dayjs(editingRowData.end_date)) || null,
    totaldays: (editingRowData && editingRowData.day_count) || "",
    addressduringleave:
      (editingRowData && editingRowData.add_during_leave) || "",
    reasonforleave: (editingRowData && editingRowData.reason_for_leave) || "",
    remarks: (editingRowData && editingRowData.remarks) || "",
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
    const ResponsibleEmployee = data.responsibleemployee?.id;
    const LeaveType = data.leavetype;
    const FromDate = data.fromdate;
    const EndDate = data.enddate;
    const AddressDuringLeave = data.addressduringleave;
    const ReasonForLeave = data.reasonforleave;
    const Remarks = data.remarks;

    const dataToSend = {
      // apply_by: 205,
      responsible: ResponsibleEmployee,
      leave_type: LeaveType,
      start_date: dayjs(FromDate).format("YYYY-MM-DD"),
      end_date: dayjs(EndDate).format("YYYY-MM-DD"),
      add_during_leave: AddressDuringLeave,
      reason_for_leave: ReasonForLeave,
      remarks: Remarks,
    };

    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        // html: `You won't be able to revert <b>${deletedClasseRoomName}!</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Confirm",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          console.log("under confirm");
          // swalWithMuiButtons.fire(
          //   "Successfull!",
          //   `Class has been deleted.`,
          //   "success"
          // );
          let response;
          try {
            if (editingRowData) {
              response = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/staff/api/leave-trns/detail/${editingRowData.id}`,
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
                `${process.env.NEXT_PUBLIC_HOST}/staff/api/leave-trns/create`,
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
            console.log("responseData", responseData);
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
              console.log("under 200");
              toast.success(`Successfully Leave Applyed`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              router.push("/human-resource/apply-leave");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          swalWithMuiButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: palette.customColors.boxBg,
          p: 2,
          borderRadius: "5px",
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
            {/* Empollye*/}
            <Grid item xs={12} sm={12} md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Empolyee
                  </Typography>
                </Box>
                <Controller
                  name="empolyee"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                      inputProps={{ readOnly: true }}
                      sx={{
                        ".MuiSelect-icon": { color: "#786CF1" },
                        backgroundColor: "#F8F7FA",
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>

            {/* Responsible Employee*/}
            <Grid item xs={12} sm={12} lg={3}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Typography
                  sx={{ textAlign: "left", color: palette.text.secondary }}
                >
                  Responsible Employee
                </Typography>
                <Box>
                  <Stack spacing={3}>
                    <Controller
                      name="responsibleemployee"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Autocomplete
                          {...field}
                          sx={{
                            backgroundColor: palette.customColors.boxBg,
                          }}
                          id="tags-filled"
                          options={EmpolyeeData}
                          getOptionLabel={(option) =>
                            `${option.staff_id} - ${option.first_name} ${option.last_name}`
                          }
                          onChange={(_, data) => {
                            field.onChange(data);
                            // handleRoomNoChange(index, data);
                          }}
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
                              error={!!error}
                              helperText={error?.message}
                              {...params}
                              placeholder="Employee"
                              size="small"
                            />
                          )}
                        />
                      )}
                    />
                  </Stack>
                </Box>
              </Box>
            </Grid>

            {/* Leave Type*/}
            <Grid item xs={12} sm={12} md={3}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Leave Type
                  </Typography>
                </Box>
                <Controller
                  name="leavetype"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                      select
                      label="select leave type"
                      size="small"
                      placeholder="Type Here"
                      sx={{
                        textAlign: "left",
                        backgroundColor: palette.customColors.boxBg,
                      }}
                    >
                      {LeaveTypeData.map((leave) => (
                        <MenuItem key={leave.id} value={leave.id}>
                          {leave.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} sm={12} md={3}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Typography
                  sx={{ textAlign: "left", color: palette.text.secondary }}
                >
                  From Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="fromdate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        onError={(newError) => setError(newError)}
                        slotProps={{
                          textField: {
                            size: "small",
                            error: !!errors.fromdate,
                            helperText: errors.fromdate?.message,
                          },
                        }}
                        className={customDesign.datePicker}
                        sx={{ backgroundColor: "#F8F7FA" }}
                        fullWidth
                        onChange={(date) => {
                          field.onChange(date);
                          handleStartDateChange(date);
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            {/* End Date */}
            <Grid item xs={12} sm={12} md={3}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Typography
                  sx={{ textAlign: "left", color: palette.text.secondary }}
                >
                  End Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="enddate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        className={customDesign.datePicker}
                        sx={{ backgroundColor: "#F8F7FA" }}
                        fullWidth
                        onError={(newError) => setError(newError)}
                        slotProps={{
                          textField: {
                            size: "small",
                            error: !!errors.enddate,
                            helperText: errors.enddate?.message,
                          },
                        }}
                        onChange={(date) => {
                          field.onChange(date);
                          handleEndDateChange(date);
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            {/* Total Leave Days*/}
            <Grid item xs={12} sm={12} md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Total Leave Days
                  </Typography>
                </Box>
                <Controller
                  name="totaldays"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      value={
                        (editingRowData && editingRowData.day_count) ||
                        totalLeaveDays
                      }
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                      sx={{
                        ".MuiSelect-icon": { color: "#786CF1" },
                        backgroundColor: "#F8F7FA",
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>
            {/* Address During Leave*/}
            <Grid item xs={12} sm={12} md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Address During Leave
                  </Typography>
                </Box>
                <Controller
                  name="addressduringleave"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      multiline
                      size="small"
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                      aria-label="minimum height"
                    />
                  )}
                />
              </Box>
            </Grid>
            {/* Reason For Leave*/}
            <Grid item xs={12} sm={12} md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Reason For Leave
                  </Typography>
                </Box>
                <Controller
                  name="reasonforleave"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      multiline
                      size="small"
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                      aria-label="minimum height"
                    />
                  )}
                />
              </Box>
            </Grid>
            {/*Remarks*/}
            <Grid item xs={12} sm={12} md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Remarks
                  </Typography>
                </Box>
                <Controller
                  name="remarks"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      multiline
                      size="small"
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                      aria-label="minimum height"
                    />
                  )}
                />
              </Box>
            </Grid>
            {/* Immage*/}
            {/* <Grid item xs={12} sm={12} md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px" }}>File type should be PNG, JPG, PDF, DOC</Typography>
                </Box>
                <Controller
                  name="file"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Textarea
                      aria-label="minimum height"
                      minRows={3}
                      placeholder="Minimum 3 rows"
                    />
                  )}
                />
              </Box>
            </Grid> */}

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: "10px",
                mt: "10px",
              }}
            >
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
              >
                Reset
              </Button>
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
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ backgroundColor: palette.customColors.boxBg }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3} className="flex flex-row  items-end">
              {LeaveStatusData?.map((leave) => (
                <>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2.4}>
                    <Box
                      sx={{
                        backgroundColor: "#f5f0f0",
                        boxShadow: "10px 10px 10px #d9d9d9, 0 0 0 #fff",
                        position: "relative",
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <Grid
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Grid xs={12}>
                          <Box className="flex flex-row justify-between items-center ">
                            <Typography>{leave.leave_type.name}</Typography>

                            <Typography>
                              {leave.taken_days} / {leave.leave_days}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid xs={12}>
                          <Box sx={{ position: "relative", mb: "20px" }}>
                            <Box
                              as="div"
                              sx={{
                                content: '" "',
                                position: "absolute",
                                top: "calc(100%)",
                                backgroundColor: "rgb(173, 168, 167)",
                                width: "100%",
                                height: "15px",
                              }}
                            />

                            <Box
                              as="div"
                              sx={{
                                content: '" "',
                                position: "absolute",
                                top: "calc(100%)",
                                background: `${color}`,
                                width: `${
                                  (leave.taken_days / leave.leave_days) * 100
                                }%`,
                                height: "15px",
                              }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeaveCreate;
