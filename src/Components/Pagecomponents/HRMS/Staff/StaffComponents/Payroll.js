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

const BasicDesign = {
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
}

const StaffEducation = ({
  Controller,
  contractTypeData,
  useFormContext,
  formEntriesPay,
  setFormEntriesPay,
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
    const updatedEntries = formEntriesPay.filter((entry) => entry.id !== id);
    setFormEntriesPay(updatedEntries);
  };
  const MAX_ENTRIES = 2;

  //   React.useEffect(() => {
  //       const lengthEdu = educationID.length;
  //       if (educationID.length > 1) {
  //         const newEntry = { id: formEntriesPay.length + 1 };
  //         setFormEntriesPay((prevEntries) => [...prevEntries, newEntry]);

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
    if (formEntriesPay.length < MAX_ENTRIES) {
      const newEntry = { id: formEntriesPay.length + 1 };
      setFormEntriesPay((prevEntries) => [...prevEntries, newEntry]);

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
      {formEntriesPay.map((entry) => (
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
                disabled={formEntriesPay.length === 1}
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", p:2 }}>
              <Grid container spacing={2}>
                {/* Contract Type*/}
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
                      <Typography sx={{ ml: "15px" }}>Contract Type</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`contract_type_${entry.id}`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          error={!!error}
                          select
                          label="Select Contract Type"
                          sx={{ textAlign: "left" }}
                          helperText={error?.message}
                          fullWidth
                          size="small"
                          placeholder="Type Here"
                        >
                          {contractTypeData.map((contract) => (
                            <MenuItem key={contract.id} value={contract.id}>
                              {contract.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Box>
                </Grid>

                {/* gross*/}
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
                      <Typography sx={{ ml: "15px" }}>Gross</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>

                    <Controller
                      name={`gross_${entry.id}`}
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

                {/* basic*/}
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
                      <Typography sx={{ ml: "15px" }}>Basic</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`basic_${entry.id}`}
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
                {/* medical*/}
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
                      <Typography sx={{ ml: "15px" }}>Medical</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`medical_${entry.id}`}
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
                {/* convence*/}
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
                      <Typography sx={{ ml: "15px" }}>Convence</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`convence_${entry.id}`}
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
                {/* others*/}
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
                      <Typography sx={{ ml: "15px" }}>Others</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`others_${entry.id}`}
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
                {/* Start Date */}
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <Typography sx={{ ml: "15px" }}>Start Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name={`start_date_pay_${entry.id}`}
                        control={control}
                        defaultValue={null}
                        render={({ field, fieldState: { error } }) => (
                          <DatePicker
                            {...field}
                            error={!!error}
                            helperText={error?.message}
                            className={BasicDesign.datePicker}
                            sx={{ backgroundColor: "#F8F7FA" }}
                            fullWidth
                            slotProps={{ textField: { size: "small" } }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
                {/* end Date */}
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <Typography sx={{ ml: "15px" }}>End Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name={`end_date_pay_${entry.id}`}
                        control={control}
                        defaultValue={null}
                        render={({ field, fieldState: { error } }) => (
                          <DatePicker
                            {...field}
                            error={!!error}
                            helperText={error?.message}
                            className={BasicDesign.datePicker}
                            sx={{ backgroundColor: "#F8F7FA" }}
                            fullWidth
                            slotProps={{ textField: { size: "small" } }}
                          />
                        )}
                      />
                    </LocalizationProvider>
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
                      name={`remarks_pay_${entry.id}`}
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
      {formEntriesPay.length < MAX_ENTRIES && (
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <IconButton
            onClick={handleAddMore}
            disabled={formEntriesPay.length === MAX_ENTRIES}
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
