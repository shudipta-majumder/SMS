import { Box, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useCountryContext } from "./CountryContext";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../Layout/NavContext";

const schema = yup.object({
  countrycode: yup
    .string()
    .required("Remarks is required")
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
  countryname: yup
    .string()
    .required("Country Name is required")
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
});

const CountryModal = ({ handleClose, editRowData, accessToken }) => {
  const [editingID, setEditedID] = useState(editRowData && editRowData.ids);
    const {color, colorX, palette } = useOnlyIcon();
  const [editingCountryCode, setEditingCountryCode] = useState(
    editRowData && editRowData.countrycode
  );
  const [editingCountryName, setEditedCountryName] = useState(
    editRowData && editRowData.Countryname
  );
  const defaultValues = {
    countrycode: editRowData ? editingCountryCode : "",
    countryname: editRowData ? editingCountryName : "",
  };
  const { setCountrySaved } = useCountryContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const CountryCode = data.countrycode;
    setEditingCountryCode(CountryCode);
    const Countryname = data.countryname;
    setEditedCountryName(Countryname);

    const dataToSend = {
      coun_code: CountryCode,
      name: Countryname,
    };

    let response;
    try {
      if (editRowData) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/setup/api/country/detail/${editingID}`,
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
          `${process.env.NEXT_PUBLIC_HOST}/setup/api/country`,
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
        setCountrySaved();
        toast.success(`Successfully ${Countryname} Country Saved`, {
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
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Country Code
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="countrycode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.countrycode}
                      helperText={errors.countrycode?.message}
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
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Country Name
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="countryname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.countryname?.message}
                      helperText={errors.countryname?.message}
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

export default CountryModal;
