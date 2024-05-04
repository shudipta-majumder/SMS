import { Box, Typography} from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useLeaveTypeContext } from "./LeaveTypeContext";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../Layout/NavContext";

const schema = yup.object({
  leave_type_code: yup
    .string()
    .required()
    .label("LeaveType Code")
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
  LeaveTypename: yup
    .string()
    .required()
    .label("LeaveType Name")
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
    max_days: yup
    .number()
    .required()
    .label("Max Days")
    .integer( "Only letters are allowed"),
 
});

const LeaveTypeModal = ({ handleClose, editRowData, accessToken }) => {
    const {color, colorX, palette } = useOnlyIcon();
  const editingID = editRowData && editRowData.ids;
  const [editingLeaveTypeCode, setEditingLeaveTypeCode] = useState(
    editRowData && editRowData.LeaveTypecode
  );
  const [editingLeaveTypeName, setEditedLeaveTypeName] = useState(
    editRowData && editRowData.LeaveTypename
  );

  const [editingMaxDays, setEditedMaxDays] = useState(
    editRowData && editRowData.maxdays
  );
  const [editedRemarks, setEditedRemarks] = useState(
    editRowData && editRowData.remarks
  );

  const defaultValues = {
    leave_type_code: editRowData ? editingLeaveTypeCode : "",
    LeaveTypename: editRowData ? editingLeaveTypeName : "",
    max_days: editRowData ? editingMaxDays : "",
    remarks: editRowData ? editedRemarks : "",
  };

  console.log("object", editingLeaveTypeName);
  const { setLeaveTypeSaved } = useLeaveTypeContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });



  const onSubmit = async (data) => {
    const LeaveTypeCode = data.leave_type_code;
    setEditingLeaveTypeCode(LeaveTypeCode);
    const LeaveTypename = data.LeaveTypename;
    setEditedLeaveTypeName(LeaveTypename);
    const max_days = data.max_days;
    setEditedMaxDays(max_days);
    const remarks = data.remarks;
    setEditedRemarks(remarks);

    const dataToSend = {
      leave_type_code: LeaveTypeCode,
      name: LeaveTypename,
      max_days: max_days,
      remarks: remarks,
    };
    
    let response;
    try {
      if (editRowData) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/hrms/api/leave-type/detail/${editingID}`,
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
          `${process.env.NEXT_PUBLIC_HOST}/hrms/api/leave-type`,
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
        setLeaveTypeSaved();
        toast.success(`Successfully ${LeaveTypename} LeaveType Saved`, {
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
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography sx={{ ml: "15px", color: palette.text.secondary }}>LeaveType Code</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="leave_type_code"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.leave_type_code}
                      helperText={errors.leave_type_code?.message}
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
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px", color: palette.text.secondary }}>LeaveType Name</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="LeaveTypename"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.LeaveTypename?.message}
                      helperText={errors.LeaveTypename?.message}
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
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px", color: palette.text.secondary }}>Max Days</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="max_days"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.max_days?.message}
                      helperText={errors.max_days?.message}
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
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px", color: palette.text.secondary }}>Remarks</Typography>
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
                      error={!!errors.remarks?.message}
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

export default LeaveTypeModal;
