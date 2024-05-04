import { Box, Typography, FormControl, MenuItem } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useDistrictContext } from "./DistrictContext";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../Layout/NavContext";

const schema = yup.object({
  Districtcode: yup
    .string()
    .required()
    .label("District Code")
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
  Districtname: yup
    .string()
    .required()
    .label("District Name")
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
  Division: yup.string().required().label("Division"),
});

const DistrictModal = ({ handleClose, editRowData, accessToken }) => {
    const {color, colorX, palette } = useOnlyIcon();
  const [editingID, setEditedID] = useState(editRowData && editRowData.ids);
  const [editingDistrictCode, setEditingDistrictCode] = useState(
    editRowData && editRowData.districtcode
  );
  const [editingDistrictName, setEditedDistrictName] = useState(
    editRowData && editRowData.Districtname
  );
  const [editingDivisionName, setEditedDivisionName] = useState(
    editRowData && editRowData.Divisionname
  );
  const [editingDivisionID, setEditedDivisionID] = useState(
    editRowData && editRowData.divisionId
  );
  const [DivisionNames, setDivisionNames] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultValues = {
    Districtcode: editRowData ? editingDistrictCode : "",
    Districtname: editRowData ? editingDistrictName : "",
    Division: editRowData ? editingDivisionID : "",
  };

  const { setDistrictSaved } = useDistrictContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/setup/api/division/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.code == 200) {
          setDivisionNames(responseData.data);
          setIsLoading(false);
        }
      })
      .catch((fetchError) => {
        setError(fetchError);
        setIsLoading(false);
      });
  }, []);

  const onSubmit = async (data) => {
    const DistrictCode = data.Districtcode;
    setEditingDistrictCode(DistrictCode);
    const Districtname = data.Districtname;
    setEditedDistrictName(Districtname);
    const Divisionname = data.Division;
    setEditedDivisionName(Divisionname);

    const dataToSend = {
      dist_code: DistrictCode,
      name: Districtname,
      division: Divisionname,
    };

    let response;
    try {
      if (editRowData) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/setup/api/district/detail/${editingID}`,
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
          `${process.env.NEXT_PUBLIC_HOST}/setup/api/district`,
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
        setDistrictSaved();
        toast.success(`Successfully ${Districtname} District Saved`, {
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
                  <Typography sx={{ ml: "15px", color: palette.text.secondary }}>District Code</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="Districtcode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.Districtcode}
                      helperText={errors.Districtcode?.message}
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
                  <Typography sx={{ ml: "15px", color: palette.text.secondary }}>District Name</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="Districtname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.Districtname?.message}
                      helperText={errors.Districtname?.message}
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
                  <Typography sx={{ ml: "15px", color: palette.text.secondary }}>Division Name</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="Division"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      {/* <InputLabel size="small" id="demo-simple-select-label">
                        Division Name
                      </InputLabel> */}
                      <TextField
                        select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Division name"
                        sx={{
                          ".MuiSelect-icon": { color: "#786CF1" },
                          backgroundColor: "#F8F7FA",
                        }}
                        {...field}
                        error={!!errors.Division?.message}
                        helperText={errors.Division?.message}
                      >
                        {isLoading ? (
                          <p>Loading...</p>
                        ) : error ? (
                          <p>Error: {error.message}</p>
                        ) : (
                          DivisionNames.map((Division) => (
                            <MenuItem key={Division.id} value={Division.id}>
                              {Division.name}
                            </MenuItem>
                          ))
                        )}
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

export default DistrictModal;
