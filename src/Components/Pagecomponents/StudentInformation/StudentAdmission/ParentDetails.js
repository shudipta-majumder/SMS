"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
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

const useStyles = makeStyles((theme) => ({
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
}));

const FirstStep = () => {
  const [age, setAge] = React.useState("");
  const [value, setValue] = React.useState(dayjs("2022-04-17"));
 
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>Father Name</Typography>
            <Box
              sx={{ backgroundColor: "#F8F7FA" }}
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Full Name"
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>Contact No</Typography>
            <Box
              sx={{ backgroundColor: "#F8F7FA" }}
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="+880"
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>Occupation</Typography>
            <Box
              sx={{ backgroundColor: "#F8F7FA" }}
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Occupation"
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>Mother Name</Typography>
            <Box
              sx={{ backgroundColor: "#F8F7FA" }}
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Full Name"
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>Contact No</Typography>
            <Box
              sx={{ backgroundColor: "#F8F7FA" }}
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="+880"
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>Occupation</Typography>
            <Box
              sx={{ backgroundColor: "#F8F7FA" }}
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Occupation"
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>Father Photo</Typography>
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
              <Box sx={{ mt: "7px" }} className={classes.avatarContainer}>
                <Avatar
                  alt="Selected Photo"
                  src={selectedFile}
                  className={classes.avatar}
                />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography sx={{ ml: "15px" }}>Mother Photo</Typography>
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
              <Box sx={{ mt: "7px" }} className={classes.avatarContainer}>
                <Avatar
                  alt="Selected Photo"
                  src={selectedFile}
                  className={classes.avatar}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FirstStep;
