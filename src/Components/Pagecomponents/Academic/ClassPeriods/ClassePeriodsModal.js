import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useClassePeriodsContext } from "./ClassePeriodsContext";
import Grid from "@mui/material/Grid";
import { useOnlyIcon } from "../../../Layout/NavContext";

const ClassePeriodsModal = ({ handleClose, accessToken }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [amClickedStart, setAmClickedStart] = useState(false);
  const [pmClickedStart, setPmClickedStart] = useState(false);
  const [amClickedEnd, setAmClickedEnd] = useState(false);
  const [pmClickedEnd, setPmClickedEnd] = useState(false);
    const {color, colorX, palette } = useOnlyIcon();
  const [periodName, setPeriodName] = useState(null);
  const { setClassePeriodsSaved } = useClassePeriodsContext();

  const formatTime = (time, isPM) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);

    if (isPM) {
      // If it's PM, add 12 hours (unless it's 12 PM)
      const adjustedHours = hours === 12 ? 12 : hours + 12;
      return `${adjustedHours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      // If it's AM, handle midnight (12 AM)
      const adjustedHours = hours === 12 ? 0 : hours;
      return `${adjustedHours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  };

  const handleSave = () => {
    // Format start time
    const formattedStartTime =
      amClickedStart || pmClickedStart
        ? formatTime(startTime, pmClickedStart)
        : startTime;

    // Format end time
    const formattedEndTime =
      amClickedEnd || pmClickedEnd
        ? formatTime(endTime, pmClickedEnd)
        : endTime;

    const dataToSend = new FormData();
    dataToSend.append("name", periodName);
    dataToSend.append("start_time", formattedStartTime);
    dataToSend.append("end_time", formattedEndTime);

    const CustomToast = () => (
      <Box>
        <Typography>Successfully Added</Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Periods Name:
          </Typography>
          {periodName}
        </Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Start Time:
          </Typography>
          {startTime} {(amClickedStart && "am") || (pmClickedStart && "pm")}
        </Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            End Time:
          </Typography>
          {endTime} {(amClickedEnd && "am") || (pmClickedEnd && "pm")}
        </Typography>
      </Box>
    );

    fetch(`${process.env.NEXT_PUBLIC_HOST}/academic/api/class-period`, {
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
          setClassePeriodsSaved();
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
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px", color: palette.text.secondary }}>
                  Class Period Name
                </Typography>
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
                value={periodName}
                onChange={(e) => setPeriodName(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px", color: palette.text.secondary }}>
                  Start Time
                </Typography>
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
                placeholder="HH:mm:ss"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          sx={{
                            fontSize: "20px",
                            color: amClickedStart ? "#1976D2" : "gray",
                          }}
                          onClick={() => {
                            setAmClickedStart(true);
                            setPmClickedStart(false);
                          }}
                        >
                          am
                        </IconButton>
                      </InputAdornment>
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          sx={{
                            fontSize: "20px",
                            color: pmClickedStart ? "#1976D2" : "gray",
                          }}
                          onClick={() => {
                            setPmClickedStart(true);
                            setAmClickedStart(false);
                          }}
                        >
                          pm
                        </IconButton>
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px", color: palette.text.secondary }}>
                  End Time
                </Typography>
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
                placeholder="HH:mm:ss"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          sx={{
                            fontSize: "20px",
                            color: amClickedEnd ? "#1976D2" : "gray",
                          }}
                          onClick={() => {
                            setAmClickedEnd(true);
                            setPmClickedEnd(false);
                          }}
                        >
                          am
                        </IconButton>
                      </InputAdornment>
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          sx={{
                            fontSize: "20px",
                            color: pmClickedEnd ? "#1976D2" : "gray",
                          }}
                          onClick={() => {
                            setPmClickedEnd(true);
                            setAmClickedEnd(false);
                          }}
                        >
                          pm
                        </IconButton>
                      </InputAdornment>
                    </>
                  ),
                }}
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

export default ClassePeriodsModal;
