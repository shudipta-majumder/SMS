import { Box, Typography } from '@mui/material'
import React from 'react'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import NextImage from "next/image";

const FirstStep = () => {
  return (
      <Box
      sx={{
         backgroundColor: palette.customColors.boxBg,
        borderRadius: "5px",
        padding: "20px 20px 246px 20px",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* <Stack sx={{ width: "200px" }}>
        <Avatar alt="Remy Sharp" src="/images/profile-pic.png" />
      </Stack> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NextImage
            src="/images/profile-pic.png"
            alt="login bg"
            width={138}
            height={138}
          />
          <Typography variant="h6">Shudipta Mazumdar</Typography>
          <Typography sx={{ color: "#ABA0F6" }}>Super Admin</Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#EDEBFF",
            borderRadius: "5px",
            padding: "10px 10px",
          }}
        >
          <Typography>Your Profile 25% complete</Typography>
          <Box sx={{ position: "relative", mb: "8px" }}>
            <Box
              as="div"
              sx={{
                content: '" "',
                position: "absolute",
                top: "calc(100%)",
                backgroundColor: "rgb(173, 168, 167)",
                width: "100%",
                height: "5px",
                borderRadius: "10px",
              }}
            />
            <Box
              as="div"
              sx={{
                content: '" "',
                position: "absolute",
                top: "calc(100%)",
                backgroundColor: "#7C70F1",
                width: "10%",
                height: "5px",
                borderRadius: "10px",
                animationDuration: "13s",
                animationTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                animationDelay: "2s",
                animationFillMode: "forwards",
                animationName: "payments",
              }}
            />
          </Box>
        </Box>

        <Box>
          <Typography sx={{ color: "#9D9D9D" }}>Email Address</Typography>
          <Typography>Shudiptamazumdar@gmail.com</Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "#9D9D9D" }}>Phone No</Typography>
          <Typography>+8801795773160</Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "#9D9D9D" }}>Location</Typography>
          <Typography>
            7689 Chondra, Gazipur Chowrasta Gazipur 1703, Bangladesh
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default FirstStep
