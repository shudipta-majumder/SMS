import { Box, Typography, FormControl, MenuItem } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useThanaContext } from "./ThanaContext";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../Layout/NavContext";

const schema = yup.object({
  thanacode: yup
    .string()
    .required()
    .label("Thana Code")
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
  thananame: yup
    .string()
    .required()
    .label("Thana Name")
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
  district: yup.string().required().label("District"),
});

const ThanaModal = ({ handleClose, editRowData, accessToken }) => {
    const {color, colorX, palette } = useOnlyIcon();
  const [editingID, setEditedID] = useState(editRowData && editRowData.ids);
  const [editingThanaCode, setEditingThanaCode] = useState(
    editRowData && editRowData.thanacode
  );
  const [editingThanaName, setEditedThanaName] = useState(
    editRowData && editRowData.Thananame
  );
  const [editingDistrictName, setEditedDistrictName] = useState(
    editRowData && editRowData.districtname
  );
  const [editingDistrictID, setEditedDistrictID] = useState(
    editRowData && editRowData.districtId
  );
  const [districtNames, setDistrictNames] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultValues = {
    thanacode: editRowData ? editingThanaCode : "",
    thananame: editRowData ? editingThanaName : "",
    district: editRowData ? editingDistrictID : "",
  };

  console.log("object", editingThanaName);
  const { setThanaSaved } = useThanaContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/setup/api/district/list`, {
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
          setDistrictNames(responseData.data);
          setIsLoading(false);
        }
      })
      .catch((fetchError) => {
        setError(fetchError);
        setIsLoading(false);
      });
  }, []);

  const onSubmit = async (data) => {
    const ThanaCode = data.thanacode;
    setEditingThanaCode(ThanaCode);
    const Thananame = data.thananame;
    setEditedThanaName(Thananame);
    const Districtname = data.district;
    setEditedDistrictName(Districtname);

    const dataToSend = {
      thana_code: ThanaCode,
      name: Thananame,
      district: Districtname,
    };
    let response;
    try {
      if (editRowData) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/setup/api/thana/detail/${editingID}`,
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
          `${process.env.NEXT_PUBLIC_HOST}/setup/api/thana`,
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
        setThanaSaved();
        toast.success(`Successfully ${Thananame} Thana Saved`, {
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
                    Thana Code
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="thanacode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.thanacode}
                      helperText={errors.thanacode?.message}
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
                    Thana Name
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="thananame"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.thananame?.message}
                      helperText={errors.thananame?.message}
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
                    District Name
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <TextField
                        select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="district name"
                        sx={{
                          ".MuiSelect-icon": { color: "#786CF1" },
                          backgroundColor: "#F8F7FA",
                        }}
                        {...field}
                        error={!!errors.district?.message}
                        helperText={errors.district?.message}
                      >
                        {isLoading ? (
                          <p>Loading...</p>
                        ) : error ? (
                          <p>Error: {error.message}</p>
                        ) : (
                          districtNames.map((district) => (
                            <MenuItem key={district.id} value={district.id}>
                              {district.name}
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

export default ThanaModal;
