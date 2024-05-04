"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Avatar from "@mui/material/Avatar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { Controller, useForm } from "react-hook-form";
import "dayjs/locale/en-gb";

const yesterday = dayjs().subtract(1, "day");

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
};

const FirstStep = ({
  Controller,
  genderData,
  religionData,
  bloodGroupData,
  shiftData,
  useFormContext,
  setSelectedFile,
  selectedFile,
  setSelectBirthFile,
  selectBirthFile,
}) => {
  const [age, setAge] = React.useState("");
  const [value, setValue] = React.useState(dayjs("2022-04-17"));
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imagePreview, setImagePreview] = React.useState(null);
  const [pickImage, setPickImage] = React.useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log("std image", file);
  };
  const handleBirthCertFileChange = (e) => {
    const birthfile = e.target.files[0];
    setSelectBirthFile(birthfile);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const { control } = useFormContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Frist Name</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="first_name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  label="First Name"
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                ></TextField>
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Last Name</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="last_name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  label="Write Last Name"
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                ></TextField>
              )}
            />
          </Box>
        </Grid>
        {/* Gender */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Gender</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="gender"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  select
                  label="Select Gender"
                  sx={{ textAlign: "left" }}
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                >
                  {genderData?.map((gender) => (
                    <MenuItem key={gender.id} value={gender.id}>
                      {gender.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </Grid>
        {/* email address */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Email</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  label="Write Email Address"
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                ></TextField>
              )}
            />
          </Box>
        </Grid>
        {/* date of birth */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Date of Birth</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <Controller
                name="dob"
                control={control}
                // defaultValue={yesterday}
                render={({ field }) => (
                  <DatePicker
                    label={"DD/MM/YYYY"}
                    {...field}
                    // className={errors.dob ? "error" : ""}
                    sx={{ backgroundColor: "#F8F7FA" }}
                    fullWidth
                    slotProps={{ textField: { size: "small" } }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        {/* mobile no */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Mobile No</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="mobile_no"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  label="Write Mobile Number"
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                ></TextField>
              )}
            />
          </Box>
        </Grid>
        {/* religion */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Religion</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="religion"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  select
                  label="Select Religion"
                  sx={{ textAlign: "left" }}
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                >
                  {religionData?.map((religion) => (
                    <MenuItem key={religion.id} value={religion.id}>
                      {religion.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </Grid>
        {/* student photo upload */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>
              Student Image (101 * 101)
            </Typography>
            <Box
              sx={{
                backgroundColor: "#F8F7FA",
                p: "10px 10px",
                border: 1,
                borderColor: "gray",
                borderRadius: "4px",
              }}
            >
              <input
                accept="image/*"
                id="file-input"
                name="photo"
                type="file"
                onChange={handleFileChange}
                style={{
                  display: "none",
                }}
              />
              <label
                htmlFor="file-input"
                style={{
                  backgroundColor: "#7468F1",
                  color: "white",
                  padding: "2px 10px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  userSelect: "none",
                }}
              >
                Choose File
              </label>
              <span>{selectedFileName}</span>
            </Box>

            {selectedFile && (
              <Box sx={{ mt: "7px" }} className={BasicDesign.avatarContainer}>
                <Avatar
                  alt="Selected Photo"
                  src={selectedFile}
                  className={BasicDesign.avatar}
                />
              </Box>
            )}
          </Box>
        </Grid>
        {/* admission date */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>Admission Date</Typography>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <Controller
                name="admission_date"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    adapterLocale="en-gb"
                    {...field}
                    // className={errors.dob ? "error" : ""}
                    sx={{ backgroundColor: "#F8F7FA" }}
                    fullWidth
                    slotProps={{ textField: { size: "small" } }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        {/* Shift */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Shift</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="shift"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  select
                  label="Select Shift"
                  sx={{ textAlign: "left" }}
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                >
                  {shiftData?.map((shift) => (
                    <MenuItem key={shift.id} value={shift.id}>
                      {shift.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </Grid>
        {/* blood group */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Blood Group</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="blood_group"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  select
                  label="Select Blood Group"
                  sx={{ textAlign: "left" }}
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                >
                  {bloodGroupData?.map((bloodGroup) => (
                    <MenuItem key={bloodGroup.id} value={bloodGroup.id}>
                      {bloodGroup.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </Grid>
        {/* birth_reg_scert_no */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>
                Birth Registration Certificate No
              </Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="birth_reg_scert_no"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  label="Write Birth Registration Certificate No"
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                ></TextField>
              )}
            />
          </Box>
        </Grid>
        {/* Birth registration certificate */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>
              Birth registration certificate
            </Typography>
            <Box
              sx={{
                backgroundColor: "#F8F7FA",
                p: "10px 10px",
                border: 1,
                borderColor: "gray",
                borderRadius: "4px",
              }}
            >
              <input
                accept="image/*"
                id="file-input2"
                name="birth_cert_file"
                type="file"
                onChange={handleBirthCertFileChange}
                style={{
                  display: "none",
                }}
              />
              <label
                htmlFor="file-input2"
                style={{
                  backgroundColor: "#7468F1",
                  color: "white",
                  padding: "2px 10px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  userSelect: "none",
                }}
              >
                Choose File
              </label>
              {/* <span>{selectBirthFile.name}</span> */}
            </Box>

            {/* {selectBirthFile && (
              <Box sx={{ mt: "7px" }} className={BasicDesign.avatarContainer}>
                <Avatar
                  alt="Selected Photo"
                  src={selectBirthFile}
                  className={BasicDesign.avatar}
                />
              </Box>
            )} */}
          </Box>
        </Grid>
        {/* present address */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Present Address</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="present_address"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  label="Write Present Address"
                  helperText={error?.message}
                  fullWidth
                  size="large"
                  variant="outlined"
                  className={BasicDesign.customTextField}
                  multiline
                  rows={3}
                  placeholder="Type Here"
                ></TextField>
              )}
            />
          </Box>
        </Grid>
        {/* present address */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Parmanent Address</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="permanent_address"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  label="Select Subject Code"
                  helperText={error?.message}
                  fullWidth
                  size="large"
                  variant="outlined"
                  className={BasicDesign.customTextField}
                  multiline
                  rows={3}
                  placeholder="Type Here"
                ></TextField>
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FirstStep;
