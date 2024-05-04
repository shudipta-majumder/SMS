"use client";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import { Icon } from "@iconify/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDropzone } from "react-dropzone";

const BasicDesign = {
  input: {
    display: "none",
  },
  labelContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F8F7FA",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 10px",
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
  labelContainerActive: {
    border: "2px dashed green",
    backgroundColor: "#f0f0f0",
  },
  labelContainerErroe: {
    border: "2px dashed #FF0000",
    backgroundColor: "#560319",
  },
  icon: {
    fontSize: 40,
    marginBottom: 3,
    color: "#786CF1",
  },
  text: {
    fontSize: "10px",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

const dayjs = require("dayjs");

const studentLeaveCreateSchema = yup.object().shape({
  start_date: yup
    .date()
    .nullable()
    .required("Start Date is required")
    .typeError("Start Date must be a valid date"),
  end_date: yup
    .date()
    .nullable()
    .required("End Date is required")
    .min(
      yup.ref("start_date"),
      "The end date should not be less than the starting date."
    )
    .typeError("End Date must be a valid date"),
  reason_for_leave: yup.string().required("This field may not be blank."),
});

const StudentLeaveApplyEdit = ({
  handleClose,
  setAddFeeTypes,
  addFeeTypes,
  editingRow,
  session,
}) => {
  const [sectionRowData, setSectionRowData] = useState(setAddFeeTypes);
  const [pdfPick, setPdfPick] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [uploadImageName, setUploadImageName] = useState("");
  const [pdfFileSize, setPdfFileSize] = useState("");
  const [pdfTypeCheck, setPdfTypeCheck] = useState("");
  const [pickImage, setPickImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFileSize, setImageFileSize] = useState("");
  const [imageTypeCheck, setImageTypeCheck] = useState("");

  console.log("edit modal", editingRow);

  const maxSize = 5000000;
  const maxSizePdf = 10000000;

  const startd = dayjs(editingRow?.startDate);
  const endd = dayjs(editingRow?.endDate);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      start_date: startd,
      end_date: endd,
      reason_for_leave: editingRow?.reasonForLeave,
      document: editingRow?.document,
    },
    resolver: yupResolver(studentLeaveCreateSchema),
    // validateCriteriaMode: "all",
  });

  const handleDropPdfUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPdfPick(file);
    setPickImage(file);
    console.log("acceptedFiles", acceptedFiles[0]);

    // pdf check
    if (file) {
      const pdfPreview = URL.createObjectURL(file);
      setPdfPreview(pdfPreview);
    }

    if (file.size > maxSizePdf) {
      setPdfFileSize("File size is very large");
    } else {
      setPdfFileSize("");
    }

    if (file.type && file.type !== "application/pdf") {
      setPdfTypeCheck("File Type is not Supported");
    } else {
      setPdfTypeCheck("");
    }
  };

  const {
    getRootProps: getRootPropsSecond,
    getInputProps: getInputPropsSecond,
  } = useDropzone({
    onDrop: handleDropPdfUpload,
  });

  const onSubmit = async (data) => {
    const studentLeaveCreateData = new FormData();
    const formattedStartDate = dayjs(data?.start_date).format("YYYY-MM-DD");
    const formattedEndtDate = dayjs(data?.end_date).format("YYYY-MM-DD");

    studentLeaveCreateData.append("start_date", formattedStartDate);
    studentLeaveCreateData.append("end_date", formattedEndtDate);
    studentLeaveCreateData.append("reason_for_leave", data?.reason_for_leave);

    // pdf
    if (pdfPick && pdfPick.size > maxSizePdf) {
      return;
    } else if (pdfPick && pdfPick.size < maxSizePdf) {
      studentLeaveCreateData.append("document", pdfPick);
    }

    const accessToken = session?.user?.data?.token?.access;

    let response;
    let responseData;
    try {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/student/api/leave/detail/${editingRow.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: studentLeaveCreateData,
        }
      );
      console.log("response", response);

      responseData = await response.json();
      setAddFeeTypes(responseData);
      console.log("leave data:", responseData);

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
        // setSubjectSaved();
        toast.success(`Successfully Leave Updated`, {
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
        boxShadow:
          " 1px 1px 3px rgba(0, 0, 0, 0.1), -1px -1px 3px rgba(0, 0, 0, 0.1)",
        p: 5,
      }}
    >
      <Box
        sx={{
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
            {/* Start date */}
            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px" }}>Start Date</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="start_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        sx={{ backgroundColor: "#F8F7FA" }}
                        fullWidth
                        slotProps={{
                          textField: {
                            size: "small",
                            error: !!errors.start_date,
                            helperText: errors.start_date?.message,
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            {/* End date */}
            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px" }}>End Date</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="end_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        sx={{ backgroundColor: "#F8F7FA" }}
                        fullWidth
                        slotProps={{
                          textField: {
                            size: "small",
                            error: !!errors.end_date,
                            helperText: errors.end_date?.message,
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            {/* Reason for leave */}
            <Grid item md={12}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px" }}>Reason For Leave</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="reason_for_leave"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      label="Write Reason"
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    ></TextField>
                  )}
                />
              </Box>
            </Grid>
            {/*file upload*/}
            <Grid item sm={12} xs={12}>
              <div
                {...getRootPropsSecond()}
                style={{
                  border:
                    pdfFileSize || pdfTypeCheck
                      ? "1px dashed red"
                      : "1px dashed #8F8F8F",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  {...register("document")}
                  {...getInputPropsSecond()}
                />
                {pdfFileSize ? (
                  <p style={{ color: "red" }}>{pdfFileSize}</p>
                ) : "" || pdfTypeCheck ? (
                  <p style={{ color: "red" }}>{pdfTypeCheck}</p>
                ) : (
                  ""
                )}
                <Icon
                  className={BasicDesign.icon}
                  icon="pepicons-pencil:file"
                />
                <Box className={BasicDesign.text}>
                  Drag and Drop File Here
                  <Divider>
                    <Typography sx={{ color: "gray", fontSize: "15px" }}>
                      OR
                    </Typography>
                  </Divider>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<Icon icon="pepicons-pencil:file" />}
                    sx={{
                      marginTop: "10px",
                      background:
                        "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
                      ":hover": {
                        bgcolor: "#796EF1",
                      },
                    }}
                  >
                    Browse file{" "}
                  </Button>
                </Box>
                <Box>
                  {document ? (
                    <Icon
                      style={{
                        height: "50px",
                        width: "50px",
                        maxWidth: "200px",
                        maxHeight: "200px",
                        marginTop: "10px",
                      }}
                      icon="pepicons-pencil:file"
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Box>
                  <Box component="span">{uploadImageName}</Box>
                  {errors.document && (
                    <Typography color="error">
                      {errors.document.message}
                    </Typography>
                  )}
                </Box>
              </div>
            </Grid>
            {/* buttons */}
            <Grid
              item
              // sm={6}
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

export default StudentLeaveApplyEdit;
