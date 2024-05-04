import { Box, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useClasseContext } from "./ClasseContext";
import Grid from "@mui/material/Grid";
import { useOnlyIcon } from "../../../Layout/NavContext";

const ClasseModal = ({ handleClose, accessToken }) => {
  const inputRef = useRef();
    const {color, colorX, palette } = useOnlyIcon();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [classCode, setClassCode] = useState(null);
  const [classeName, setClasseName] = useState(null);
  const { setClasseSaved } = useClasseContext();

  const handleSave = () => {
    const dataToSend = new FormData();
    dataToSend.append("code", classCode);
    dataToSend.append("name", classeName);

    fetch(`${process.env.NEXT_PUBLIC_HOST}/academic/api/class`, {
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
          setClasseSaved();
          toast.success(`Successfully ${classeName} Class Saved`, {
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
          toast.error(`${classeName} already exists.`, {
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
                <Typography sx={{ ml: "15px", color: palette.text.secondary }}>
                  Class Code
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
                placeholder="Type Here"
                value={classCode}
                inputRef={inputRef}
                onChange={(e) => setClassCode(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px", color: palette.text.secondary }}>
                  Class Name
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
                placeholder="Type Here"
                value={classeName}
                onChange={(e) => setClasseName(e.target.value)}
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

export default ClasseModal;
