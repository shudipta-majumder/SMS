import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useSubjectContext } from "./SubjectContext";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../Layout/NavContext";

const schema = yup.object({
  subjectname: yup
    .string()
    .required("Subject Name is required")
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
  subjectcode: yup
    .string()
    .required("Subject Code is required")
    .matches(/^[0-9]+$/, "Only numbers are allowed for Subject Code"),
  subjectTypeSending: yup.string().required("Subject Type is required"),
});

const SubjectModal = ({ handleClose, accessToken, SubjectTypeListData }) => {
  const { setSubjectSaved } = useSubjectContext();
    const {color, colorX, palette } = useOnlyIcon();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const dataToSend = {
      code: data.subjectcode,
      type: data.subjectTypeSending,
      name: data.subjectname,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/academic/api/subject`,
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
        toast.error(`${subjectName} already exists`, {
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
        setSubjectSaved();
        toast.success(`Successfully ${subjectName} Subject Saved`, {
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
          display: "flex",
          flexDirection: "column",
          backgroundColor: palette.customColors.boxBg,
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
                    Subject Name
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="subjectname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.subjectname}
                      helperText={errors.subjectname?.message}
                      fullWidth
                      size="small"
                      margin="dense"
                      placeholder="Type Here"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Subject Code
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="subjectcode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.subjectcode}
                      helperText={errors.subjectcode?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px" }}>Subject Type</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="subjectTypeSending"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!errors.subjectTypeSending}>
                      <TextField
                        {...field}
                        error={!!error}
                        select
                        helperText={error?.message}
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="subject type"
                        sx={{
                          ".MuiSelect-icon": { color: "#786CF1" },
                          backgroundColor: "#F8F7FA",
                        }}
                      >
                        {SubjectTypeListData.data.map((subjectType) => (
                          <MenuItem key={subjectType.id} value={subjectType.id}>
                            {subjectType.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
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
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SubjectModal;
