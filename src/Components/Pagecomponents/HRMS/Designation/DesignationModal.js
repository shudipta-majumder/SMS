import { Box, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useDesignationContext } from "./DesignationContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../Layout/NavContext";

const schema = yup.object({
  designationname: yup
    .string()
    .required()
    .matches(/^[A-Za-z]+$/, "Only letters are allowed"),
});

const DesignationModal = ({ handleClose, accessToken }) => {
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

  const { setDesignationSaved } = useDesignationContext();

  const onSubmit = async (data) => {
    const DesignationName = data.designationname;

    const dataToSend = {
      name: DesignationName,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/staff/api/designation`,
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
        setDesignationSaved();
        toast.success(`Successfully ${DesignationName} Designation Saved`, {
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
        toast.error(`${DesignationName} already exists`, {
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
    <Box
      sx={{
        backgroundColor: palette.customColors.boxBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 150px",
        gap: "20px",
      }}
    >
      <Typography sx={{ color: palette.text.secondary }}>
        Designation Name
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ textAlign: "center" }}
      >
        <Controller
          name="designationname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.designationname}
              helperText={errors.designationname?.message}
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
  );
};

export default DesignationModal;
