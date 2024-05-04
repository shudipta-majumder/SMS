import { Box, Typography, FormControl, MenuItem } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useGradeContext } from "./GradeContext";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../Layout/NavContext";

const schema = yup.object({
  grade: yup
    .string()
    .required()
    .label("Grade")
    .matches(/^[A-Za-z +\-]+$/, "Only letters and + _ allowed"),
  startMark: yup
    .string()
    .required()
    .label("Start Mark")
    .matches(/^[0-9 ]+$/, "Only numbers are allowed"),
  endMark: yup
    .string()
    .required()
    .label("End Mark")
    .matches(/^[0-9 ]+$/, "Only numbers are allowed"),
  point: yup
    .string()
    .required()
    .label("Point")
    .matches(/^[0-9. ]+$/, "Only number and . are allowed"),
  slno: yup
    .string()
    .required()
    .label("Serial NO")
    .matches(/^[0-9 ]+$/, "Only numbers are allowed"),
});

const GradeModal = ({ handleClose, editRowData, accessToken }) => {
    const {color, colorX, palette } = useOnlyIcon();
  const [editingID, setEditedID] = useState(editRowData && editRowData.ids);
  const [editingGrade, setEditingGrade] = useState(
    editRowData && editRowData.grade
  );
  const [editingStartMark, setEditedStartMark] = useState(
    editRowData && editRowData.startmark
  );
  const [editingEndMark, setEditedEndMark] = useState(
    editRowData && editRowData.endmark
  );
  const [editingPoint, setEditedPoint] = useState(
    editRowData && editRowData.point
  );
  const [editingSerialNo, setEditedSerialNo] = useState(
    editRowData && editRowData.serialno
  );

  const defaultValues = {
    grade: editRowData ? editingGrade : "",
    startMark: editRowData ? editingStartMark : "",
    endMark: editRowData ? editingEndMark : "",
    point: editRowData ? editingPoint : "",
    startMark: editRowData ? editingStartMark : "",
    slno: editRowData ? editingSerialNo : "",
  };

  const { setGradeSaved } = useGradeContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const Grade = data.grade;
    setEditingGrade(Grade);
    const startMark = data.startMark;
    setEditedStartMark(startMark);
    const endMark = data.endMark;
    setEditedEndMark(endMark);
    const point = data.point;
    setEditedPoint(point);
    const slno = data.slno;
    setEditedSerialNo(slno);

    const dataToSend = {
      name: Grade,
      start_mark: startMark,
      end_mark: endMark,
      point: point,
      sl_no: slno,
    };

    let response;
    try {
      if (editRowData) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/exam/api/grade/detail/${editingID}`,
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
          `${process.env.NEXT_PUBLIC_HOST}/exam/api/grade`,
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
        setGradeSaved();
        toast.success(`Successfully ${Gradename} Grade Saved`, {
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
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Grade
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="grade"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.grade}
                      helperText={errors.grade?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Start Mark
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="startMark"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.startMark}
                      helperText={errors.startMark?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    End Mark
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="endMark"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.endMark}
                      helperText={errors.endMark?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Point
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="point"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.point}
                      helperText={errors.point?.message}
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
                    Serial No
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="slno"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.slno}
                      helperText={errors.slno?.message}
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

export default GradeModal;
