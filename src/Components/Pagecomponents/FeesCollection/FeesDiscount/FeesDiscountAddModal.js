"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useOnlyIcon } from "../../../Layout/NavContext";

const subjectSchema = yup.object().shape({
  name: yup.string().required("This field may not be blank."),
  percentage: yup.string(),
  description: yup.string(),
  remarks: yup.string(),
});

const FeesDiscountAddModal = ({
  handleAddModalClose,
  setAddFeeTypes,
  accessToken,
}) => {
    const {color, colorX, palette } = useOnlyIcon();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      percentage: "",
      amount: "",
      description: "",
      remarks: "",
    },
    resolver: yupResolver(subjectSchema),
    // validateCriteriaMode: "all",
  });

  const onSubmit = async (data) => {
    const convertToLowerCase = data.name.toLowerCase();
    const convertCode = convertToLowerCase.replace(/\s+/g, "-");
    console.log("space", convertCode);
    const feesTypeData = {
      name: data?.name,
      code: convertCode,
      percentage: data?.percentage,
      amount: data?.amount,
      description: data?.description,
      remarks: data?.remarks,
    };

    let response;
    let responseData;
    try {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/fees/api/fees-discount`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feesTypeData),
        }
      );
      console.log("object", response);

      responseData = await response.json();
      setAddFeeTypes(responseData);
      console.log("fees data:", responseData);

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
        handleAddModalClose();
        // setSubjectSaved();
        toast.success(
          `Successfully ${responseData.data.class_name.name} Board Saved`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      sx={{
        boxShadow:
          " 1px 1px 3px rgba(0, 0, 0, 0.1), -1px -1px 3px rgba(0, 0, 0, 0.1)",
        p: 5,
        backgroundColor: palette.customColors.boxBg,
      }}
    >
      <Box
        sx={{
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
            <Grid item xs={12} md={12}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Name
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
                      label="Write Name"
                      helperText={error?.message}
                      //   autoComplete="new-password"
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    ></TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Percentage
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="percentage"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      label="Write Percentage"
                      helperText={error?.message}
                      //   autoComplete="new-password"
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    ></TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Amount
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      label="Write Amount"
                      helperText={error?.message}
                      //   autoComplete="new-password"
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    ></TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
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
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      label="Write Remarks"
                      helperText={error?.message}
                      //   autoComplete="new-password"
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    ></TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Description
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      minRows={3}
                      aria-label="maximum height"
                      error={!!error}
                      label="Wrtie Description"
                      sx={{ textAlign: "left" }}
                      helperText={error?.message}
                      //   fullWidth
                      size="small"
                      placeholder="Type Here"
                    ></TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid
              item
              // sm={6}
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
                  marginRight: "10px",
                  fontWeight: "700",
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleAddModalClose}
                color="error"
                sx={{
                  padding: "5px 30px",
                  fontWeight: "700",
                }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default FeesDiscountAddModal;
