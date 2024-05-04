import { Box, MenuItem, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useSectionContext } from "./SectionContext";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOnlyIcon } from "../../../Layout/NavContext";

const sectionSchema = yup.object({
  class_name: yup.string().required("This field may not be blank."),
  session: yup.string().required("This field may not be blank."),
  section: yup.string().required("This field may not be blank."),
  version: yup.string().required("This field may not be blank."),
});

const SectionModal = ({ editRowData, handleClose, accessToken }) => {
  const [classApi, setClassApi] = useState([]);
  const [sessionApi, setSessionApi] = useState([]);
  const [sectionApi, setSectionApi] = useState([]);
  const [versionApi, setVersionApi] = useState([]);
  const [sectionRowData, setSectionRowData] = useState(editRowData);
    const {color, colorX, palette } = useOnlyIcon();
  const { setSectionSaved } = useSectionContext();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      class_name: sectionRowData ? sectionRowData.classnameId : "",
      session: sectionRowData ? sectionRowData.sessionId : "",
      section: sectionRowData ? sectionRowData.sectionId : "",
      version: sectionRowData ? sectionRowData.versionId : "",
    },
    resolver: yupResolver(sectionSchema),
  });

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

  useEffect(() => {
    classNameApi();
    sessionNameApi();
    sectionNameApi();
    versionNameApi();
  }, []);

  const onSubmit = async (data) => {
    const dataToSend = {
      class_name: data.class_name,
      session: data.session,
      section: data.section,
      version: data.version,
    };
    console.log("dataToSend", dataToSend);

    let response;
    try {
      if (sectionRowData) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-section/detail/${sectionRowData.ids}`,
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
          `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-section`,
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
        setSectionSaved();
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

  console.log("section row data:", sectionRowData);
  // console.log("classSectionApi", sectionData);

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
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px", color: palette.text.secondary }}>Class Name</Typography>
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
                      select
                      label="Select Class Name"
                      helperText={error?.message}
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    >
                      {classApi?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
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
                  <Typography sx={{ ml: "15px", color: palette.text.secondary  }}>Session</Typography>
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
                      {sessionApi?.map((session) => (
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
                  <Typography sx={{ ml: "15px", color: palette.text.secondary  }}>Section</Typography>
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
                      {sectionApi?.map((section) => (
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
                  <Typography sx={{ ml: "15px", color: palette.text.secondary  }}>Version</Typography>
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
                      {versionApi?.map((version) => (
                        <MenuItem key={version.id} value={version.id}>
                          {version.version}
                        </MenuItem>
                      ))}
                    </TextField>
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

export default SectionModal;
