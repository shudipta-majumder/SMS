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
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Icon } from "@iconify/react";

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
  boardData,
  useFormContext,
  formEntriesEdu,
  setFormEntriesEdu,
}) => {
 

  const handleRemove = (id) => {
    const updatedEntries = formEntriesEdu.filter((entry) => entry.id !== id);
    setFormEntriesEdu(updatedEntries);
  };
  const MAX_ENTRIES = 4;

  //   React.useEffect(() => {
  //       const lengthEdu = educationID.length;
  //       if (educationID.length > 1) {
  //         const newEntry = { id: formEntriesEdu.length + 1 };
  //         setFormEntriesEdu((prevEntries) => [...prevEntries, newEntry]);

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
    if (formEntriesEdu.length < MAX_ENTRIES) {
      const newEntry = { id: formEntriesEdu.length + 1 };
      setFormEntriesEdu((prevEntries) => [...prevEntries, newEntry]);
    }
  };

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box>
      {formEntriesEdu.map((entry) => (
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
                disabled={formEntriesEdu.length === 1}
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
                {/* Edu Board*/}
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
                      <Typography sx={{ ml: "15px" }}>Edu Board</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`edu_board_${entry.id}`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          error={!!error}
                          select
                          label="Select Edu Board"
                          sx={{ textAlign: "left" }}
                          helperText={error?.message}
                          fullWidth
                          size="small"
                          placeholder="Type Here"
                        >
                          {boardData.map((eduBoard) => (
                            <MenuItem key={eduBoard.id} value={eduBoard.id}>
                              {eduBoard.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Box>
                </Grid>

                {/* institution_name*/}
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
                        Institution Name
                      </Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`institution_name_${entry.id}`}
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
                {/* registration_no*/}
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
                        Registration No
                      </Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`registration_no_${entry.id}`}
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
                {/* title*/}
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
                      <Typography sx={{ ml: "15px" }}>Title</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`title_${entry.id}`}
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
                        name={`start_date_${entry.id}`}
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
                        name={`end_date_${entry.id}`}
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
                {/* passing_year*/}
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
                      <Typography sx={{ ml: "15px" }}>Passing Year</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`passing_year_${entry.id}`}
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
                {/* result*/}
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
                      <Typography sx={{ ml: "15px" }}>Result</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`result_${entry.id}`}
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
                {/* result_out_of*/}
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
                      <Typography sx={{ ml: "15px" }}>Result Out of</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      name={`result_out_of_${entry.id}`}
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
                {/* rremarks*/}
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
                      name={`remarks_${entry.id}`}
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
      {formEntriesEdu.length < MAX_ENTRIES && (
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <IconButton
            onClick={handleAddMore}
            disabled={formEntriesEdu.length === MAX_ENTRIES}
          >
            <Icon
              icon="ph:plus-fill"
              style={{ color: "#796DF1", fontSize: "30px" }}
            />
          </IconButton>
          <Typography>Add More</Typography>
        </Box>
      )}
    </Box>
  );
};

export default StaffEducation;
