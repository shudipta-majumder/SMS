import { Box, Typography } from "@mui/material";
import React, { useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useSessionContext } from "./SessionContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../Layout/NavContext";

const schema = yup.object({
  sessionname: yup
    .string()
    .required()
    .label('Session Name')
    .matches(
      /^(?!-)(?!.*-$)[A-Za-z0-9-]+$/,
      "capital and small letters, hyphens, numbers are allowed"
    ),
});

const SessionModal = ({ handleClose, accessToken }) => {
  const inputRef = useRef();
    const {color, colorX, palette } = useOnlyIcon();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { setSessionSaved } = useSessionContext();

  const onSubmit = async (data) => {
    const sessionName = data.sessionname;

    const dataToSend = {
      session: sessionName,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/academic/api/session`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const responseData = await response.json();

      if (responseData.code === 200) {
        handleClose();
        setSessionSaved();
        toast.success(`Successfully ${sessionName} session Saved`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (responseData.code === 400) {
        toast.error(`${sessionName} already exists`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (responseData.code === 401) {
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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          backgroundColor: palette.customColors.boxBg,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 150px",
          gap: "20px",
        }}
      >
        <Typography>Session Name</Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ textAlign: "center" }}
        >
          <Controller
            name="sessionname"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.sessionname}
                helperText={errors.sessionname?.message}
                inputRef={inputRef}
                className="max-w-[500px] mb-[10px]"
                fullWidth
                size="small"
                margin="dense"
                placeholder="Type Here"
              />
            )}
          />
          <Button
            variant="contained"
            size="small"
            type="submit"
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
        </Box>
      </Box>
    </Box>
  );
};

export default SessionModal;
