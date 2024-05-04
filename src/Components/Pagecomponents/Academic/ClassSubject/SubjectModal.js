import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useSubjectContext } from "../ClassSubject/SubjectContext";
import { useOnlyIcon } from "../../../Layout/NavContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";

const IconAndText = {
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
    // "&:hover": {
    //   backgroundColor: "#9C93F4",
    // },
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

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

// const subjectSchema = yup.object().shape({
//   class_name: yup.string().required("This field may not be blank."),
//   subjectcode: yup.string().required("This field may not be blank."),
//   subject: yup.string().required("This field may not be blank."),
//   section: yup.string().required("This field may not be blank."),
//   session: yup.string().required("This field may not be blank."),
//   version: yup.string().required("This field may not be blank."),
//   image: yup
//     .mixed()
//     .required("You need to upload an image.")
//     .test("fileSize", "The file is not larger than 5MB", (value) => {
//       console.log("value", value);
//       return value && value[0]?.size <= 5000000;
//     }),
// });
const subjectSchema = yup.object().shape({
  class_name: yup.string().required("This field may not be blank."),
  subjectcode: yup.string().required("This field may not be blank."),
  subject: yup.string().required("This field may not be blank."),
  section: yup.string().required("This field may not be blank."),
  session: yup.string().required("This field may not be blank."),
  version: yup.string().required("This field may not be blank."),
  // image: yup
  //   .mixed()
  //   .required("Image not uploaded")
  //   .test("fileSize", "The file is not larger than 5MB", (value) => {
  //     console.log("value", value);
  //     return value && value[0] && value[0]?.size <= 5000000;
  //   }),
  // book_file: yup
  //   .mixed()
  //   .required("Pdf not uploaded")
  //   .test("fileSize", "The file is not larger than 10MB", (value) => {
  //     console.log("value", value);
  //     return value && value[0]?.size <= 5000000;
  //   }),
});

const SubjectModal = ({ handleClose, editRowData, accessToken }) => {
  const [subjectTypeSending, setSubjectTypeSending] = useState(null);
  const [subjectTypeName, setSubjectTypeName] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setFetchError] = useState(null);
  const [subjectTypes, setSubjectTypes] = useState([]);
  const [sectionRowData, setSectionRowData] = useState(editRowData);
  const [classApi, setClassApi] = useState([]);
  const [subjectApi, setSubjectApi] = useState([]);
  const [sectionApi, setSectionApi] = useState([]);
  const [versionApi, setVersionApi] = useState([]);
  const [sessionApi, setSessionApi] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [borderColor, setBorderColor] = useState(false);
  // const [isDragActive, setIsDragActive] = useState(false);
  const maxSize = 5000000;
  const maxSizePdf = 10000000;
  const [imagePreview, setImagePreview] = useState(null);
  const [pickImage, setPickImage] = useState(null);
  const [pdfPick, setPdfPick] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [uploadImageName, setUploadImageName] = useState("");
  const [uploadImageSize, setUploadImageSize] = useState("");
  const [imageFileSize, setImageFileSize] = useState("");
  const [imageTypeCheck, setImageTypeCheck] = useState("");
  const [pdfFileSize, setPdfFileSize] = useState("");
  const [pdfTypeCheck, setPdfTypeCheck] = useState("");
  const [empty, setEmpty] = useState(false);
  const { setSubjectSaved } = useSubjectContext();
    const {color, colorX, palette } = useOnlyIcon();

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      class_name: sectionRowData ? sectionRowData.classnameId : "",
      session: sectionRowData ? sectionRowData.sessionId : "",
      subjectcode: sectionRowData ? sectionRowData.subjectcode : "",
      subject: sectionRowData ? sectionRowData.subjectId : "",
      section: sectionRowData ? sectionRowData.sectionId : "",
      version: sectionRowData ? sectionRowData.versionId : "",
      // image: sectionRowData ? sectionRowData.thumbail : "",
      // book_file: sectionRowData ? sectionRowData.book_file : "",
    },
    resolver: yupResolver(subjectSchema),
    // validateCriteriaMode: "all",
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/setup/api/subject-type/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.code == 200) {
          setSubjectTypes(responseData.data);
          setIsLoading(false);
        }
      })
      .catch((fetchError) => {
        setFetchError(fetchError);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setSubjectTypeSending(event.target.value);
    const selectedSubjectType = subjectTypes.find(
      (subjectType) => subjectType.id === event.target.value
    );
    setSubjectTypeName(selectedSubjectType ? selectedSubjectType.name : null);
  };

  // Fetching class api
  const classNameApi = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return setClassApi(data.data);
  };

  // Fetching subject api
  const subjectNameApi = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/subject`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const subjectData = await response.json();
    return setSubjectApi(subjectData.data);
  };

  // Fetching section api
  const sectionNameApi = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/section`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return setSectionApi(data.data);
  };

  // Fetching session api
  const sessionNameApi = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/session`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const sessionData = await response.json();
    return setSessionApi(sessionData.data);
  };

  // Fetching version api
  const versionNameApi = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/version`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return setVersionApi(data.data);
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file);
  //   console.log("Selected file:", file);

  //   if (file && file.size <= maxSize && file.type.startsWith("image/")) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setSelectedFile(event.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //     setSelectedFileName(file.name);
  //     setBorderColor(false);
  //   } else {
  //     toast.warn("Invalid file type or size, Please select an valid image!", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     setSelectedFileName("");
  //     setBorderColor(true);
  //   }
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const file = e.dataTransfer.files[0];
  //   setPickImage(file);
  //   if (file) {
  //     // Create a data URL for the selected image
  //     const previewURL = URL.createObjectURL(file);
  //     setImagePreview(previewURL);
  //   }
  //   console.log("Dropped file:", file);
  //   console.log("pick image:", pickImage);

  //   // if (file && file.size <= maxSize && file.type.startsWith("image/")) {
  //   //   const reader = new FileReader();
  //   //   reader.onload = (event) => {
  //   //     setPickImage(event.target.result);
  //   //   };
  //   //   reader.readAsDataURL(file);
  //   //   setSelectedFileName(file.name);
  //   //   setBorderColor(false);
  //   // } else {
  //   //   toast.warn("Invalid file type or size, Please select an valid image!", {
  //   //     position: "top-center",
  //   //     autoClose: 5000,
  //   //     hideProgressBar: false,
  //   //     closeOnClick: true,
  //   //     pauseOnHover: true,
  //   //     draggable: true,
  //   //     progress: undefined,
  //   //     theme: "light",
  //   //   });
  //   //   setSelectedFileName("");
  //   //   setBorderColor(true);
  //   // }
  // };

  const handleDrop = (acceptedFiles) => {
    // if (acceptedFiles && acceptedFiles.length > 0) {
    const file = acceptedFiles[0];
    setPickImage(file);
    console.log("acceptedFiles", acceptedFiles[0]);

    // Your additional logic for handling the file
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }

    if (file.size > maxSize) {
      setImageFileSize("File size is very large");
    } else {
      setImageFileSize("");
    }

    if (file.type && !file.type.startsWith("image/")) {
      setImageTypeCheck("File Type is not an Image");
    } else {
      setImageTypeCheck("");
    }

    // if (file.type !== "image/") {
    //   setImageTypeCheck("File Type is not an Image");
    // }
    // }
  };

  const handleDropPdfUpload = (acceptedFiles) => {
    // if (acceptedFiles && acceptedFiles.length > 0) {
    const file = acceptedFiles[0];
    setPdfPick(file);
    console.log("acceptedFiles", acceptedFiles[0]);

    // Your additional logic for handling the file
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
      setPdfTypeCheck("File Type is not PDF");
    } else {
      setPdfTypeCheck("");
    }
    // }
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setPickImage(image);
    setUploadImageName(image.name);
    if (image) {
      // Create a data URL for the selected image
      const previewURL = URL.createObjectURL(image);
      setImagePreview(previewURL);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  const {
    getRootProps: getRootPropsSecond,
    getInputProps: getInputPropsSecond,
  } = useDropzone({
    onDrop: handleDropPdfUpload,
  });

  useEffect(() => {
    classNameApi();
    subjectNameApi();
    sessionNameApi();
    sectionNameApi();
    versionNameApi();
  }, []);

  const onSubmit = async (data) => {
    const dataToSend = new FormData();
    console.log("dataToSend", data);

    dataToSend.append("class_name", data?.class_name);
    dataToSend.append("code", data?.subjectcode);
    dataToSend.append("subject", data?.subject);
    dataToSend.append("session", data?.session);
    dataToSend.append("section", data?.section);
    dataToSend.append("version", data?.version);

    if (
      (pickImage && pickImage.size > maxSize) ||
      (pickImage && pickImage.type === "application/pdf")
    ) {
      // setEmpty(false);
      return;
    } else if (pickImage && pickImage.size < maxSize) {
      dataToSend.append("image", pickImage);
      // setEmpty(true);
    }

    if (
      (pdfPick && pdfPick.size > maxSizePdf) ||
      (pickImage && pickImage.type.startsWith("application/pdf"))
    ) {
      return;
    } else if (pdfPick && pdfPick.size < maxSizePdf) {
      dataToSend.append("book_file", pdfPick);
    }
    // dataToSend["image"] = pickImage;

    console.log("image details:", data);

    // console.log("data to send:", data);

    let response;
    try {
      if (sectionRowData) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-subject/detail/${sectionRowData.ids}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              // "Content-Type": "application/json",
            },
            body: dataToSend,
          }
        );
      } else {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-subject`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              // "Content-Type": "multipart/form-data",
              // "Content-Type": `multipart/form-data; boundary=${dataToSend._boundary}`,
            },
            body: dataToSend,
          }
        );
        console.log("object", response);
      }

      const responseData = await response.json();
      // console.log("Response Data:", responseData);

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
        setSubjectSaved();
        toast.success(
          `Successfully ${responseData.data.class_name.name} Board Saved`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    // setIsDragActive(true);
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
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Class Name
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="class_name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      label="Select Class Name"
                      select
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    >
                      {classApi.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Subject Code
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="subjectcode"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      label="Select Subject Code"
                      helperText={error?.message}
                      autoComplete="new-password"
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    ></TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Subject
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="subject"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      select
                      label="Select Subject Name"
                      sx={{ textAlign: "left" }}
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    >
                      {subjectApi.map((subject) => (
                        <MenuItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Section
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="section"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      select
                      label="Select Section Name"
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    >
                      {sectionApi.map((section) => (
                        <MenuItem key={section.id} value={section.id}>
                          {section.section}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Session
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="session"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      select
                      label="Select Session Name"
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    >
                      {sessionApi.map((session) => (
                        <MenuItem key={session.id} value={session.id}>
                          {session.session}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography
                    sx={{ ml: "15px", color: palette.text.secondary }}
                  >
                    Version
                  </Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="version"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      select
                      label="Select Version Name"
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    >
                      {versionApi.map((version) => (
                        <MenuItem key={version.id} value={version.id}>
                          {version.version}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Grid>
            {/* <Grid
              item
              xs={12}
              sx={{
                border: "1px dashed #8F8F8F",
                margin: "30px",
                padding: "30px",
                borderRadius: "10px",
              }}
            >
              <Box
                {...register("image")}
                // enctype="multipart/form-data"
                type="file"
                // name="image"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <CloudUploadIcon className={IconAndText.icon} />
                <Box className={IconAndText.text}>
                  Drag and Drop Cover Files Here
                  <Divider>
                    {" "}
                    <Typography sx={{ color: "gray", fontSize: "15px" }}>
                      OR
                    </Typography>{" "}
                  </Divider>
                </Box>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    marginTop: "10px",
                    background:
                      "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
                    ":hover": {
                      bgcolor: "#796EF1",
                    },
                  }}
                >
                  Upload file
                  <VisuallyHiddenInput
                    {...register("image")}
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Button>
                <Box>
                  {sectionRowData && sectionRowData.thumbail ? (
                    <>
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            marginTop: "10px",
                          }}
                        />
                      ) : (
                        <img
                          src={sectionRowData.thumbail}
                          alt="Preview"
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            marginTop: "10px",
                          }}
                        />
                      )}
                    </>
                  ) : (
                    imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          marginTop: "10px",
                        }}
                      />
                    )
                  )}
                </Box>
                <Box>
                  <Box component="span">{uploadImageName}</Box>
                  {errors.image && (
                    <Typography color="error">
                      {errors.image.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid> */}

            {/* image file upload */}
            <Grid item xs={12} sm={6}>
              <div
                {...getRootProps()}
                style={{
                  border:
                    imageFileSize || imageTypeCheck
                      ? "1px dashed red"
                      : "1px dashed #8F8F8F",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  {...getInputProps()}
                />
                {imageFileSize ? (
                  <p style={{ color: "red" }}>{imageFileSize}</p>
                ) : "" || imageTypeCheck ? (
                  <p style={{ color: "red" }}>{imageTypeCheck}</p>
                ) : (
                  ""
                )}
                {/* {(imageFileSize && (
                  <p style={{ color: "red" }}>{imageFileSize}</p>
                )) ||
                  (imageTypeCheck && (
                    <p style={{ color: "red" }}>{imageTypeCheck}</p>
                  ))} */}
                {/* {imageTypeCheck && (
                  <p style={{ color: "red" }}>{imageTypeCheck}</p>
                )} */}
                {/* {errors.image && <p>{errors.image.message}</p>} */}
                {/* {errors.image && <span>{errors.image?.message}</span>} */}
                {/* {errors.image && <p>{errors.image.message}</p>} */}
                <Icon className={IconAndText.icon} icon="ep:upload-filled" />
                {/* <CloudUploadIcon className={IconAndText.icon} /> */}
                <Box className={IconAndText.text}>
                  Drag and Drop Image File Here
                  <Divider>
                    <Typography sx={{ color: "gray", fontSize: "15px" }}>
                      OR
                    </Typography>
                  </Divider>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<Icon icon="ep:upload-filled" />}
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
                  {sectionRowData && sectionRowData.thumbail ? (
                    <>
                      {imagePreview ? (
                        <>
                          {console.log("xxxxxxxx", imagePreview)}
                          {pickImage.type.startsWith("image/") && (
                            <img
                              src={imagePreview}
                              alt="Preview"
                              style={{
                                height: "50px",
                                width: "50px",
                                maxWidth: "100px",
                                maxHeight: "100px",
                                marginTop: "10px",
                              }}
                            />
                          )}
                        </>
                      ) : (
                        <img
                          src={sectionRowData.thumbail}
                          alt="Preview"
                          style={{
                            height: "50px",
                            width: "50px",
                            maxWidth: "100px",
                            maxHeight: "100px",
                            marginTop: "10px",
                          }}
                        />
                      )}
                    </>
                  ) : (
                    imagePreview && (
                      <>
                        {pickImage.type.startsWith("image/") && (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                              height: "50px",
                              width: "50px",
                              maxWidth: "100px",
                              maxHeight: "100px",
                              marginTop: "10px",
                            }}
                          />
                        )}
                      </>
                    )
                  )}
                </Box>
                <Box>
                  <Box component="span">{uploadImageName}</Box>
                  {errors.image && (
                    <Typography color="error">
                      {errors.image.message}
                    </Typography>
                  )}
                </Box>
              </div>
            </Grid>
            {/* pdf file upload Grid */}
            <Grid item sm={6} xs={12}>
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
                  {...register("book_file")}
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
                  className={IconAndText.icon}
                  icon="teenyicons:pdf-solid"
                />
                <Box className={IconAndText.text}>
                  Drag and Drop PDF File Here
                  <Divider>
                    <Typography sx={{ color: "gray", fontSize: "15px" }}>
                      OR
                    </Typography>
                  </Divider>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={
                      <Icon
                        // className={IconAndText.icon}
                        icon="teenyicons:pdf-solid"
                      />
                    }
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
                  {sectionRowData && sectionRowData.book_file ? (
                    <>
                      {pdfPreview ? (
                        <>
                          {pdfPick.type === "application/pdf" && (
                            <Icon
                              style={{
                                height: "50px",
                                width: "50px",
                                maxWidth: "200px",
                                maxHeight: "200px",
                                marginTop: "10px",
                              }}
                              icon="teenyicons:pdf-solid"
                            />
                          )}
                        </>
                      ) : (
                        <Icon
                          style={{
                            height: "50px",
                            width: "50px",
                            maxWidth: "200px",
                            maxHeight: "200px",
                            marginTop: "10px",
                          }}
                          icon="teenyicons:pdf-solid"
                        />
                      )}
                    </>
                  ) : (
                    pdfPick && (
                      <>
                        {console.log("xxxxxxxx", imagePreview)}
                        {pdfPick.type === "application/pdf" && (
                          <Icon
                            style={{
                              height: "50px",
                              width: "50px",
                              maxWidth: "200px",
                              maxHeight: "200px",
                              marginTop: "10px",
                            }}
                            icon="teenyicons:pdf-solid"
                          />
                        )}
                      </>
                    )
                  )}
                </Box>
                <Box>
                  <Box component="span">{uploadImageName}</Box>
                  {errors.book_file && (
                    <Typography color="error">
                      {errors.book_file.message}
                    </Typography>
                  )}
                </Box>
              </div>
            </Grid>

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

export default SubjectModal;
