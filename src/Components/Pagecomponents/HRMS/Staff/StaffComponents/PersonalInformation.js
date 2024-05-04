"use client";
import React, { useState } from "react";
import { Box, Typography, MenuItem, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useDropzone } from "react-dropzone";

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

const PersonalInformation = ({
  Controller,
  genderData,
  roleData,
  meritialStatusData,
  religionData,
  bloodGroupData,
  designationData,
  departmentData,
  shiftData,
  useFormContext,
  pickImage,
  setPickImage,
  register,
  editingRowData,
}) => {
 
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileSize, setImageFileSize] = useState("");
  const [imageTypeCheck, setImageTypeCheck] = useState("");
  const maxSize = 5000000;
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadImageName, setUploadImageName] = useState("");

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPickImage(file);

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }

    if (file.size > maxSize) {
      setImageFileSize("File size is very large");
    } else {
      setImageFileSize("");
    }

    if (file.type && !file.type.startsWith("image/")) {
      setImageTypeCheck("File Type is not an Image");
    } else {
      setImageTypeCheck("");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Grid container spacing={2}>
        {/* first  name */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>First Name</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.first_name?.message}
                  helperText={errors.first_name?.message}
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
        {/* last  name */}
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
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.last_name?.message}
                  helperText={errors.last_name?.message}
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
                  {genderData.map((gender) => (
                    <MenuItem key={gender.id} value={gender.id}>
                      {gender.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
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
                  label="Select shift"
                  sx={{ textAlign: "left" }}
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                >
                  {shiftData.map((shift) => (
                    <MenuItem key={shift.id} value={shift.id}>
                      {shift.name}
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
            <Typography sx={{ ml: "15px" }}>Date of Birth</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="dob"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    {...field}
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
        {/* date of joining */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>Date of Joining</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="doj"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    {...field}
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
        {/* emergency_number*/}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Emergency Number</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="emergency_number"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  label="Write Emergency Number"
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                ></TextField>
              )}
            />
          </Box>
        </Grid>
        {/* nid*/}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>NID no</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="nid"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  label="Write nid Number"
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                ></TextField>
              )}
            />
          </Box>
        </Grid>
     
        {/* Meritial */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Meritial</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="meritial"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  select
                  label="Select Meritial Status"
                  sx={{ textAlign: "left" }}
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                >
                  {meritialStatusData.map((meritial) => (
                    <MenuItem key={meritial.id} value={meritial.id}>
                      {meritial.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </Grid>
        {/* role */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Role</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="role"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  select
                  label="Select role"
                  sx={{ textAlign: "left" }}
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                >
                  {roleData.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </TextField>
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
                  {religionData.map((religion) => (
                    <MenuItem key={religion.id} value={religion.id}>
                      {religion.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </Grid>
        {/* designation */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Designation</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="designation"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  select
                  label="Select designation"
                  sx={{ textAlign: "left" }}
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                >
                  {designationData.map((designation) => (
                    <MenuItem key={designation.id} value={designation.id}>
                      {designation.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </Grid>
        {/* Department */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
              <Typography sx={{ ml: "15px" }}>Department</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Controller
              name="department"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  select
                  label="Select Department"
                  sx={{ textAlign: "left" }}
                  helperText={error?.message}
                  fullWidth
                  size="small"
                  placeholder="Type Here"
                >
                  {departmentData.map((department) => (
                    <MenuItem key={department.id} value={department.id}>
                      {department.name}
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
                  {bloodGroupData.map((bloodGroup) => (
                    <MenuItem key={bloodGroup.id} value={bloodGroup.id}>
                      {bloodGroup.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </Grid>
        {/* Staff photo upload */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>Staff Image (101 * 101)</Typography>
            <Box
              {...getRootProps()}
              style={{
                border:
                  imageFileSize || imageTypeCheck
                    ? "1px dashed red"
                    : "1px dashed #8F8F8F",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                {...getInputProps()}
              />
              {imageFileSize ? (
                <p style={{ color: "red" }}>{imageFileSize}</p>
              ) : "" || imageTypeCheck ? (
                <p style={{ color: "red" }}>{imageTypeCheck}</p>
              ) : (
                ""
              )}

              <Box>
                <Button
                  component="label"
                  variant="contained"
                  size="small"
                  sx={{
                    background:
                      "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
                    ":hover": {
                      bgcolor: "#796EF1",
                    },
                  }}
                >
                  Choose Image
                </Button>
              </Box>
              <Box>
                {editingRowData.data ? (
                  <>
                    {imagePreview ? (
                      <>
                        {pickImage.type.startsWith("image/") && (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                              height: "50px",
                              width: "50px",
                              maxWidth: "100px",
                              maxHeight: "100px",
                              marginTop: "10px",
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <img
                          src={`${process.env.NEXT_PUBLIC_HOST}/${editingRowData?.data?.photo}`}
                          alt="Picture of the author"
                          width={100}
                          height={100}
                        />
                      </>
                    )}
                  </>
                ) : (
                  imagePreview && (
                    <>
                      {pickImage.type.startsWith("image/") && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            height: "500px",
                            width: "500px",
                            maxWidth: "100px",
                            maxHeight: "100px",
                            marginTop: "10px",
                          }}
                        />
                      )}
                    </>
                  )
                )}
              </Box>
              <Box>
                <Box component="span">{uploadImageName}</Box>
                {errors.image && (
                  <Typography color="error">{errors.image.message}</Typography>
                )}
              </Box>
            </Box>

            {selectedFile && (
              <Box sx={{ mt: "7px" }}>
                <img
                  src={selectedFile}
                  alt="Preview"
                  style={{
                    height: "50px",
                    width: "50px",
                    maxWidth: "100px",
                    maxHeight: "100px",
                  }}
                />
              </Box>
            )}
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

export default PersonalInformation;
