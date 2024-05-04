"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@mui/material/Checkbox";

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
  relationData,
  occupationData,
  useFormContext,
  addMore,
  setAddMore,
  removeForm,
  setRemoveForm,
  useFieldArray,
  isChecked,
  setIsChecked,
  handleGuardianChecked,
  fields,
  append,
  remove,
  control,
  setValue,
  setGauardianPhoto,
  register,
  guardianPhoto,
}) => {
  const [age, setAge] = React.useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [formEntries, setFormEntries] = useState([{ id: 1 }]);

  const handleAddMoreShow = () => {
    setAddMore(false);
    setRemoveForm(true);
  };

  const handleRemoveForm = () => {
    setAddMore(true);
    setRemoveForm(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {fields.map((item, index) => {
          return (
            <>
              <Grid container spacing={2} key={item.id}>
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
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
                      <Typography sx={{ ml: "15px" }}>Frist Name</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      // name="gardian_first_name"
                      name={`guardianSchema.${index}.gardian_first_name`}
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
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
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
                      <Typography sx={{ ml: "15px" }}>Last Name</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      // name="gardian_last_name"
                      name={`guardianSchema.${index}.gardian_last_name`}
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
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
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
                      <Typography sx={{ ml: "15px" }}>Gender</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      // name="gardian_gender"
                      name={`guardianSchema.${index}.gardian_gender`}
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
                {/* mobile no */}
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
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
                      <Typography sx={{ ml: "15px" }}>Mobile No</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      // name="gardian_mobile_no"
                      name={`guardianSchema.${index}.gardian_mobile_no`}
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
                {/* relation */}
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
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
                      <Typography sx={{ ml: "15px" }}>Relation</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      // name="relation"
                      name={`guardianSchema.${index}.relation`}
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
                          {relationData?.map((relation) => (
                            <MenuItem key={relation.id} value={relation.id}>
                              {relation.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Box>
                </Grid>
                {/* Gardian photo upload */}
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <Typography sx={{ ml: "15px" }}>
                      Gardian Image (101 * 101)
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
                        type="file"
                        id={`file-input-${index}`}
                        {...register(`guardianSchema.${index}.gardian_image`)}
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor={`file-input-${index}`}
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

                    {/* {`guardianSchema.${index}.gardian_image` && (
                      <Box
                        sx={{ mt: "7px" }}
                        className={classes.avatarContainer}
                      >
                        <Avatar
                          alt="Selected Photo"
                          src={selectedFile}
                          className={classes.avatar}
                        />
                      </Box>
                    )} */}
                  </Box>
                </Grid>
                {/* occupation */}
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
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
                      <Typography sx={{ ml: "15px" }}>Occupation</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      // name="occupation"
                      name={`guardianSchema.${index}.occupation`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          error={!!error}
                          select
                          label="Select Parent Occupation"
                          sx={{ textAlign: "left" }}
                          helperText={error?.message}
                          fullWidth
                          size="small"
                          placeholder="Type Here"
                        >
                          {occupationData?.map((occupation) => (
                            <MenuItem key={occupation.id} value={occupation.id}>
                              {occupation.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Box>
                </Grid>
                {/* nid */}
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
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
                      <Typography sx={{ ml: "15px" }}>Nid</Typography>
                      <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                        *
                      </Typography>
                    </Box>
                    <Controller
                      // name="nid"
                      name={`guardianSchema.${index}.nid`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          error={!!error}
                          label="Nid"
                          helperText={error?.message}
                          fullWidth
                          size="small"
                          placeholder="Type Here"
                        ></TextField>
                      )}
                    />
                  </Box>
                </Grid>
                {/* is guardian */}
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <Typography sx={{ ml: "15px" }}>
                      Is Local Guardian?
                    </Typography>
                    <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                      *
                    </Typography>
                    <Controller
                      name={`guardianSchema.${index}.is_guardian`}
                      control={control}
                      defaultValue={false}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormControlLabel
                          control={
                            <Checkbox checked={value} onChange={onChange} />
                          }
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Box
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
                  <Button
                    // className={classes.button}
                    type="button"
                    variant="contained"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            </>
          );
        })}

        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            type="button"
            onClick={() => {
              append({
                gardian_first_name: "",
                gardian_last_name: "",
                gardian_gender: "",
                gardian_mobile_no: "",
                relation: "",
                occupation: "",
                nid: "",
                gardian_image: null,
                is_guardian: isChecked,
              });
            }}
          >
            Add More +
          </Button>
        </Box>
      </Box>
      {/* add more form appear */}
    </>
  );
};

export default FirstStep;
