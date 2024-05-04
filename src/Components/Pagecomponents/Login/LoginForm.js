"use client";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import NextImage from "next/image";
import React, { useState, useRef } from "react";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { BenchEducationLogo } from "@/Components/utility/useIconifyIcon";

const schema = yup.object({
  username: yup.string().required().label("User ID"),
  password: yup
    .string()
    .required()
    .min(8, "Password min 8 character")
    .label("Password"),
});

const defaultValues = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const router = useRouter();
  const usernameRef = useRef(null);
  const inputRef = useRef();
  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      inputRef.current.focus();
    }
  };

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    });

    console.log("object", result);
    if (result.status == 200 && result?.ok) {
      toast.success("Welcome! You have Successfully logged in.");
      router.push("/dashboard");
      router.refresh();
    } else {
      toast.error("Invalid credentials");
    }
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        md: 1220,
      },
    },
  });

  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <NextImage
        src="/images/login/login-bg.png"
        alt="login bg"
        fill
        sizes="100vw"
      />

      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          position: "absolute",
        }}
      >
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 1 }}
          className="flex flex-row justify-center items-center"
        >
          {matches ? null : (
            <Grid
              lg={6}
              xl={6}
              md={6}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                zIndex: 1,
              }}
            >
              <img
                src="/images/login/logoin1st.png"
                style={{ width: "100%", height: "100%" }}
              />
            </Grid>
          )}

          <Grid
            xs={12}
            lg={6}
            md={6}
            spacing={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box className="text-center min-h-[500px] max-w-[400px] bg-white	 sm:w-[800px] xs:h-[300px] xs:w-[200px] ml-[7px] rounded-2xl	sm:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] px-[10px] sm:px-[50px] py-[50px] flex flex-col  gap-6	">
              <Box>
                <BenchEducationLogo />
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#7367F0",
                    fontSize: "40px",
                    fontWeight: "600",
                  }}
                >
                  Greetings!
                </Typography>
                <Typography
                  sx={{ color: "black", fontSize: "19px", fontWeight: "200" }}
                >
                  Get Ready To Shape The Future Of Education
                </Typography>
              </Box>

              <Box className="flex flex-col gap-10">
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Box className="flex flex-col gap-2">
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          usernameRef={usernameRef}
                          onKeyDown={handleKeyDown}
                          {...field}
                          error={!!errors.username?.message}
                          helperText={errors.username?.message}
                          className="max-w-[500px] "
                          fullWidth
                          size="small"
                          // margin="dense"
                          placeholder="User Name/ID"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton edge="start">
                                  <AccountCircleOutlinedIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />

                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextField
                            inputRef={inputRef}
                            {...field}
                            placeholder="Password"
                            type={values.showPassword ? "text" : "password"}
                            fullWidth
                            size="small"
                            // margin="dense"
                            error={!!errors.password?.message}
                            helperText={errors.password?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <IconButton edge="start">
                                    <VpnKeyOutlinedIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    edge="end"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={(e) => e.preventDefault()}
                                  >
                                    {values.showPassword ? (
                                      <VisibilityOffRoundedIcon />
                                    ) : (
                                      <VisibilityRoundedIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        );
                      }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    type="submit"
                    sx={{
                      background: "linear-gradient(#786CF1, #978DF3)",
                      ":hover": {
                        bgcolor: "#796EF1",
                      },
                      padding: "13px 0px",
                      fontWeight: "700",
                      mt: "10px",
                    }}
                  >
                    Login
                  </Button>
                </Box>
                <Typography sx={{ color: "black" }}>
                  Forgot password?
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginForm;
