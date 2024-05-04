import { Box, Button, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import { useOnlyIcon } from "../../Components/Layout/NavContext";
import FormControlLabel from "@mui/material/FormControlLabel";

const Drawer = () => {
  const {
    setOnlyIcon,
    setHovering,
    color,
    handleRedColor,
    handleBlueColor,
    handleColorSet,
    handleMood,
    palette,
    storedMode,
    handleColorThree,
    handleColorFour,
    handleColorFive,
  } = useOnlyIcon();

  const set = () => {
    setOnlyIcon(true);
    setHovering(true);
  };
  const out = () => {
    setOnlyIcon(false);
    setHovering(false);
  };

  const colorBoxStyle = {
    width: 45,
    height: 45,
    cursor: "pointer",
    margin: "20px 14px 14px",
    borderRadius: 1,
    transition:
      "margin .25s ease-in-out, width .25s ease-in-out, height .25s ease-in-out, box-shadow .25s ease-in-out",
    "&:hover": {
      boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.4)",
    },
  };

  return (
    <>
      <Box
        sx={{
          borderBottom: "1px solid #45495e",
          position: "fixed",
          width: "100%",
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            color: palette.text.secondary,
            fontWeight: "600",
            fontSize: "27px",
          }}
        >
          THEME CUSTOMIZER
        </Typography>
        <Typography sx={{ color: palette.text.modarate }}>
          Customize & Preview in Real Time
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 20px 20px 20px",
          gap: "10px",
          marginTop: "80px",
        }}
      >
        <Button onClick={set}>hh</Button>
        <Button onClick={out}>gg</Button>

        <Box>
          <Typography
            sx={{
              color: palette.text.secondary,
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            Primary Color
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Box
              onClick={handleRedColor}
              sx={{
                ...colorBoxStyle,
                backgroundColor: "#7367F0",
                ...(color === "#7367F0"
                  ? {
                      width: 53,
                      height: 53,
                      m: (theme) => theme.spacing(1.5, 0.75, 0),
                    }
                  : {}),
              }}
            />
            <Box
              onClick={handleBlueColor}
              sx={{
                ...colorBoxStyle,
                backgroundColor: "#a8aaae",
                ...(color === "#a8aaae"
                  ? {
                      width: 53,
                      height: 53,
                      m: (theme) => theme.spacing(1.5, 0.75, 0),
                    }
                  : {}),
              }}
            />
            <Box
              onClick={handleColorThree}
              sx={{
                ...colorBoxStyle,
                backgroundColor: "#28c76f",
                ...(color === "#28c76f"
                  ? {
                      width: 53,
                      height: 53,
                      m: (theme) => theme.spacing(1.5, 0.75, 0),
                    }
                  : {}),
              }}
            />
            <Box
              onClick={handleColorFour}
              sx={{
                ...colorBoxStyle,
                backgroundColor: "#ea5455",
                ...(color === "#ea5455"
                  ? {
                      width: 53,
                      height: 53,
                      m: (theme) => theme.spacing(1.5, 0.75, 0),
                    }
                  : {}),
              }}
            />
            <Box
              onClick={handleColorFive}
              sx={{
                ...colorBoxStyle,
                backgroundColor: "#ff9f43",
                ...(color === "#ff9f43"
                  ? {
                      width: 53,
                      height: 53,
                      m: (theme) => theme.spacing(1.5, 0.75, 0),
                    }
                  : {}),
              }}
            />
          </Box>
        </Box>

        <input type="color" onChange={handleColorSet}></input>
        <Typography>{color}</Typography>
        {/* <Button
          sx={{ height: "30px", width: "10px", backgroundColor: "black" }}
          onClick={handleDeviceTheme}
        ></Button> */}

        <Box>
          <Typography
            sx={{
              color: palette.text.secondary,
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            Mode
          </Typography>
          <RadioGroup
            row
            value={storedMode}
            onChange={(e) => handleMood(e.target.value)}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: ".875rem",
                color: palette.text.secondary,
              },
            }}
          >
            <FormControlLabel
              value="light"
              label="Light"
              control={
                <Radio
                  sx={{
                    color: palette.text.secondary,
                    "& .MuiSvgIcon-root.MuiSvgIcon-fontSize-Medium.css-1hbvpl3-MuiSvgIcon-root":
                      {
                        color: "red",
                      },
                    "& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-1hhw7if-MuiSvgIcon-root":
                      {
                        color: "red",
                      },
                  }}
                />
              }
            />
            <FormControlLabel
              value="dark"
              label="Dark"
              control={<Radio sx={{ color: palette.text.secondary }} />}
            />
            <FormControlLabel
              value="semiDark"
              label="Semi Dark"
              control={<Radio sx={{ color: palette.text.secondary }} />}
            />
          </RadioGroup>
        </Box>

        <Typography
          component="p"
          variant="caption"
          sx={{ mb: 5, color: "text.disabled", textTransform: "uppercase" }}
        >
          Theming
        </Typography>
      </Box>
    </>
  );
};

export default Drawer;
