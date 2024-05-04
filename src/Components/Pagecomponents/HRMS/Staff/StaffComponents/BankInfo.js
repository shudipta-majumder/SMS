"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  MenuItem,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import Avatar from "@mui/material/Avatar";
import { Icon } from "@iconify/react";
import Divider from "@mui/material/Divider";

const StaffEducation = ({
  Controller,
  bankData,
  useFormContext,
  formEntriesBank,
  setFormEntriesBank,
  educationID,
}) => {
  const [age, setAge] = React.useState("");
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [formValues, setFormValues] = useState({});
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedFile(event.target.result);
      };
      reader.readAsDataURL(file);
      setSelectedFileName(file.name);
    } else {
      alert("Please select a valid image file.");
      setSelectedFileName("");
    }
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleRemove = (id) => {
    const updatedEntries = formEntriesBank.filter((entry) => entry.id !== id);
    setFormEntriesBank(updatedEntries);
  };
  const MAX_ENTRIES = 1;

  //   React.useEffect(() => {
  //       const lengthEdu = educationID.length;
  //       if (educationID.length > 1) {
  //         const newEntry = { id: formEntriesBank.length + 1 };
  //         setFormEntriesBank((prevEntries) => [...prevEntries, newEntry]);

  //         // Reset text field values for the new entry
  //         const emptyEntry = {
  //           edu_board: "",
  //         };

  //         // Update state with the new entry values
  //         const updatedFormValues = { ...formValues, [newEntry.id]: emptyEntry };
  //         setFormValues(updatedFormValues);
  //       }
  // }, [educationID]);

  const handleAddMore = () => {
    if (formEntriesBank.length < MAX_ENTRIES) {
      const newEntry = { id: formEntriesBank.length + 1 };
      setFormEntriesBank((prevEntries) => [...prevEntries, newEntry]);

      // Reset text field values for the new entry
      const emptyEntry = {
        edu_board: "",
      };

      // Update state with the new entry values
      const updatedFormValues = { ...formValues, [newEntry.id]: emptyEntry };
      setFormValues(updatedFormValues);
    }
  };

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box>
      {formEntriesBank.map((entry) => (
        <Box
          key={entry.id}
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {entry.id !== 1 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                onClick={() => handleRemove(entry.id)}
                disabled={formEntriesBank.length === 1}
              >
                <Icon
                  icon="ph:minus-fill"
                  style={{ color: "#796DF1", fontSize: "30px" }}
                />
              </IconButton>

              <Typography>Remove</Typography>
            </Box>
          )}

          <Grid container spacing={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                p: 2,
              }}
            >
              <Grid container spacing={2}>
                {/* Bank Info*/}
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "row", gap: "3px" }}
                    >
                      <Typography sx={{ ml: "15px" }}>Bank Name</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`bank_name_${entry.id}`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          error={!!error}
                          select
                          label="Select Bank Info"
                          sx={{ textAlign: "left" }}
                          helperText={error?.message}
                          fullWidth
                          size="small"
                          placeholder="Type Here"
                        >
                          {bankData.map((bank) => (
                            <MenuItem key={bank.id} value={bank.id}>
                              {bank.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Box>
                </Grid>

                {/* Account Tittle*/}
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "row", gap: "3px" }}
                    >
                      <Typography sx={{ ml: "15px" }}>Account Title</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>

                    <Controller
                      name={`account_title_${entry.id}`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
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

                {/* account_number*/}
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "row", gap: "3px" }}
                    >
                      <Typography sx={{ ml: "15px" }}>
                        Account Number
                      </Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`account_number_${entry.id}`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
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
                {/* branch_name*/}
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "row", gap: "3px" }}
                    >
                      <Typography sx={{ ml: "15px" }}>Branch Name</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`branch_name_${entry.id}`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
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
                {/* remarks*/}
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "row", gap: "3px" }}
                    >
                      <Typography sx={{ ml: "15px" }}>Remarks</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`remarks_bank_${entry.id}`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
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
              </Grid>
            </Box>
          </Grid>
        </Box>
      ))}
      {formEntriesBank.length < MAX_ENTRIES && (
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <IconButton
            onClick={handleAddMore}
            disabled={formEntriesBank.length === MAX_ENTRIES}
          >
            <Icon
              icon="ph:plus-fill"
              style={{ color: "#796DF1", fontSize: "30px" }}
            />
          </IconButton>
          <Typography>Add More</Typography>
          {/* <Box sx={{ marginLeft: "28px" }}>
          <Divider />
        </Box> */}
        </Box>
      )}
    </Box>
  );
};

export default StaffEducation;
