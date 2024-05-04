"use client";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const page = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box
      sx={{
         backgroundColor: palette.customColors.boxBg,
        padding: "10px 30px 10px 30px",
        mt: "10px",
        borderRadius: "10px"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
          Advance Search
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            className="flex flex-row justify-center items-center"
          >
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <Box sx={{ ml: "10px" }}>
                  <Typography> Select Version</Typography>
                </Box>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Select"
                    onChange={handleChange}
                    sx={{ ".MuiSelect-icon": { color: "#786CF1" } }}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <Box sx={{ ml: "10px" }}>
                  <Typography> Select Version</Typography>
                </Box>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Select"
                    onChange={handleChange}
                    sx={{ ".MuiSelect-icon": { color: "#786CF1" } }}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <Box sx={{ ml: "10px" }}>
                  <Typography> Select Version</Typography>
                </Box>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Select"
                    onChange={handleChange}
                    sx={{ ".MuiSelect-icon": { color: "#786CF1" } }}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <Box sx={{ ml: "10px" }}>
                  <Typography> Select Version</Typography>
                </Box>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Select"
                    onChange={handleChange}
                    sx={{ ".MuiSelect-icon": { color: "#786CF1" } }}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            size="small"
            type="submit"
            sx={{
              background: "linear-gradient(45deg, #786CF1 30%, #978DF3 90%)",
              ":hover": {
                bgcolor: "#796EF1",
              },
              padding: "5px 30px",
              fontWeight: "700",
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default page;
