"use client";
import { Box, MenuItem, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useExamNamesContext } from "./ExamNamesContext";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../Layout/NavContext";

const ExamNamesModal = ({
  handleClose,
  accessToken,
  ExamNamesList,
  VerssionList,
  SessionList,
  ClassList,
  SectionList,
  GroupList,
}) => {
  const { palette } = useOnlyIcon();
  const defaultValues = {
    exam: "",
    session: "",
    version: "",
    class_name: "",
    section: "",
    group: "",
  };
  const { setExamNamesSaved } = useExamNamesContext();

  const schema = yup.object({
    exam: yup.string().required("This field may not be blank."),
    session: yup.string().required("This field may not be blank."),
    version: yup.string().required("This field may not be blank."),
    class_name: yup.string().required("This field may not be blank."),
    section: yup.string().required("This field may not be blank."),
    group: yup.string().required("This field may not be blank."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const ExamNames = data.exam;
    const Session = data.session;
    const version = data.version;
    const className = data.class_name;
    const section = data.section;
    const group = data.group;

    const dataToSend = {
      exam: ExamNames,
      version: version,
      session: Session,
      class_name: className,
      section: section,
      group: group,
      exam_routine_dtl: []
    };

    let response;
    try {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/exam/api/exam-routine`,
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
        setExamNamesSaved();
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
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    ExamNames Name
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="exam"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      select
                      label="Select exam"
                      sx={{ textAlign: "left" }}
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    >
                      {ExamNamesList.map((exam) => (
                        <MenuItem key={exam.id} value={exam.id}>
                          {exam.name}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    Session
                  </Typography>
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
                      label="Select Session"
                      sx={{ textAlign: "left" }}
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    >
                      {SessionList.map((session) => (
                        <MenuItem key={session.id} value={session.id}>
                          {session.session}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    Verssion
                  </Typography>
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
                      label="Select Verssion"
                      sx={{ textAlign: "left" }}
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    >
                      {VerssionList.map((version) => (
                        <MenuItem key={version.id} value={version.id}>
                          {version.version}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    Class
                  </Typography>
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
                      label="Select Class"
                      sx={{ textAlign: "left" }}
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    >
                      {ClassList.map((classname) => (
                        <MenuItem key={classname.id} value={classname.id}>
                          {classname.name}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    Section
                  </Typography>
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
                      label="Select Section"
                      sx={{ textAlign: "left" }}
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    >
                      {SectionList.map((section) => (
                        <MenuItem key={section.id} value={section.id}>
                          {section.section}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    Group
                  </Typography>
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
                      label="Select Group"
                      sx={{ textAlign: "left" }}
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    >
                      {GroupList.map((group) => (
                        <MenuItem key={group.id} value={group.id}>
                          {group.name}
                        </MenuItem>
                      ))}
                    </TextField>
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

export default ExamNamesModal;
