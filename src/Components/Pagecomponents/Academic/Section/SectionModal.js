import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useSectionContext } from "./SectionContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../Layout/NavContext";

const schema = yup.object({
  sectionname: yup
    .string()
    .required()
    .matches(/^[A-Z]$/, "Only 1 capital letter allowed"),
});

const SectionModal = ({ handleClose, accessToken }) => {
  const inputRef = useRef();
    const {color, colorX, palette } = useOnlyIcon();
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { setSectionSaved } = useSectionContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const sectionName = data.sectionname;

    const dataToSend = {
      section: sectionName,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/academic/api/section`,
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
        setSectionSaved();
        toast.success(`Successfully ${sectionName} Section Saved`, {
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
        toast.error(`${sectionName} already exists`, {
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
          gap: "10px",
        }}
      >
        <Typography sx={{color: palette.text.secondary }}>Section Name</Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ textAlign: "center" }}
        >
          <Controller
            name="sectionname"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.sectionname}
                helperText={errors.sectionname?.message}
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

export default SectionModal;
