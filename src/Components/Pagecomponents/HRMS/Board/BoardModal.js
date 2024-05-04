import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useBoardContext } from "./BoardContext";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../Layout/NavContext";

const boardSchema = yup.object({
  name: yup
    .string()
    .required("This field may not be blank.")
    .matches(/^[^0-9]*$/, "Must not contain any numbers."),
  board_code: yup
    .string()
    .required("This field may not be blank.")
    .max(3, "Ensure this field has not more than 3 characters.")
    .matches(/^[^0-9]*$/, "Must not contain any numbers."),
});

const BoardModal = ({ handleClose, editRowData, accessToken }) => {
    const {color, colorX, palette } = useOnlyIcon();
  const [BoardTypeSending, setBoardTypeSending] = useState(null);
  const [editingID, setEditedID] = useState(editRowData && editRowData.ids);
  const [editingBoardCode, setEditedBoardCode] = useState(
    editRowData && editRowData.boardcode
  );
  const [editingBoardName, setEditedBoardName] = useState(
    editRowData && editRowData.boardname
  );

  const { setBoardSaved } = useBoardContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: editingID ? editingID.name : "",
      board_code: editingID ? editingID.board_code : "",
    },
    resolver: yupResolver(boardSchema),
  });

  const onSubmit = async (data) => {
    // console.log("data", data);
    const dataToSend = {
      name: data.name,
      board_code: data.board_code,
    };
    console.log("dataToSend", dataToSend);

    let response;
    try {
      if (editRowData) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/setup/api/board/detail/${editingID}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );
      } else {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/setup/api/board`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );
        // console.log("object", response);
      }

      const responseData = await response.json();

      if (responseData.code == 400) {
        toast.error(`${responseData.message}`, {
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
      if (responseData.code == 200) {
        handleClose();
        setBoardSaved();
        toast.success(`Successfully ${responseData.data.name} Board Saved`, {
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
          backgroundColor: palette.customColors.boxBg,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ textAlign: "center" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Board Name
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={editingBoardName}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Board Code
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>

                <Controller
                  name="board_code"
                  control={control}
                  defaultValue={editingBoardCode}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={!!error}
                      defaultValue={field.board_code}
                      helperText={error?.message}
                      size="small"
                      placeholder="Type Here"
                    />
                  )}
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
                sx={{
                  background:
                    "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
                  ":hover": {
                    bgcolor: "#796EF1",
                  },
                  padding: "5px 30px",
                  marginRight: "10px",
                  fontWeight: "700",
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleClose}
                color="error"
                sx={{
                  padding: "5px 30px",
                  fontWeight: "700",
                }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default BoardModal;
