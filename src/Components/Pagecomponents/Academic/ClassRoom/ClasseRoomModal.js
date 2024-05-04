import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useClasseRoomContext } from "./ClasseRoomContext";
import Grid from "@mui/material/Grid";
import { useOnlyIcon } from "../../../Layout/NavContext";

const ClasseRoomModal = ({ handleClose, accessToken }) => {
  const [floorTypeSending, setFloorTypeSending] = useState(null);
  const [floorTypeName, setFloorTypeName] = useState(null);
  const [building, setBuilding] = useState(null);
  const [roomno, setRoomno] = useState(null);
  const { setClasseRoomSaved } = useClasseRoomContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [floorTypes, setFloorTypes] = useState([]);
    const {color, colorX, palette } = useOnlyIcon();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/setup/api/floor/list`, {
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
          setFloorTypes(responseData.data);
          setIsLoading(false);
        }
      })
      .catch((fetchError) => {
        setError(fetchError);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setFloorTypeSending(event.target.value);
    const selectedFloorType = floorTypes.find(
      (floorType) => floorType.id === event.target.value
    );
    setFloorTypeName(selectedFloorType ? selectedFloorType.name : null);
  };

  const handleSave = () => {
    const dataToSend = new FormData();
    dataToSend.append("floor_type", floorTypeSending);
    dataToSend.append("building", building);
    dataToSend.append("room_no", roomno);
    const CustomToast = () => (
      <Box>
        <Typography>Successfully Added</Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Room NO:
          </Typography>
          {roomno}
        </Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Building:
          </Typography>
          {building}
        </Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Floor:
          </Typography>
          {floorTypeName}
        </Typography>
      </Box>
    );

    fetch(`${process.env.NEXT_PUBLIC_HOST}/academic/api/class-room`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      body: dataToSend,
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.code == 200) {
          handleClose();
          setClasseRoomSaved();
          toast.success(<CustomToast />, {
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
        if (responseData.code == 400) {
          toast.error(`${roomno} already exists.`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
              fontWeight: "bold",
            },
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px", color: palette.text.secondary }}>Floor Type</Typography>
                <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                  *
                </Typography>
              </Box>
              <FormControl fullWidth>
                <InputLabel size="small" id="demo-simple-select-label">
                  Floor Type
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="floor type"
                  onChange={handleChange}
                  sx={{
                    ".MuiSelect-icon": { color: "#786CF1" },
                    backgroundColor: "#F8F7FA",
                  }}
                >
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error: {error.message}</p>
                  ) : (
                    floorTypes.map((floorType) => (
                      <MenuItem key={floorType.id} value={floorType.id}>
                        {floorType.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px", color: palette.text.secondary  }}>Building</Typography>
                <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                  *
                </Typography>
              </Box>
              <TextField
                sx={{
                  backgroundColor: "#F8F7FA",
                  border: 0,
                  borderRadius: "10px",
                }}
                border="none"
                className="max-w-[400px]"
                fullWidth
                size="small"
                placeholder="Type Here"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px", color: palette.text.secondary  }}>Room No</Typography>
                <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                  *
                </Typography>
              </Box>
              <TextField
                sx={{
                  backgroundColor: "#F8F7FA",
                  border: 0,
                  borderRadius: "10px",
                }}
                border="none"
                fullWidth
                size="small"
                placeholder="Type Here"
                value={roomno}
                onChange={(e) => setRoomno(e.target.value)}
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
              mt: "10px",
            }}
          >
            <Button
              variant="contained"
              size="small"
              type="submit"
              onClick={handleSave}
              sx={{
                background: "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
                ":hover": {
                  bgcolor: "#796EF1",
                },
                padding: "5px 30px",
                fontWeight: "700",
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ClasseRoomModal;
