import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useClassTeacherContext } from "./ClassTeacherContext";
import { useOnlyIcon } from "../../../Layout/NavContext";

const classTeacherAssignSchema = yup.object({
  version: yup.string().required("Version is required"),
  session: yup.string().required("Session is required"),
  class_name: yup.string().required("Class is required"),
  section: yup.string().required("Section is required"),
  group: yup.string().required("Group is required"),
  teacher: yup.string().required("Teacher is required"),
});

const ClassTeacherModal = ({
  handleClose,
  accessToken,
  editingRowData,
  versionData,
  sessionData,
  classData,
  sectionData,
  groupData,
  teacherData,
}) => {
  const { setClassTeacherSaved } = useClassTeacherContext();
    const {color, colorX, palette } = useOnlyIcon();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      version: editingRowData ? editingRowData?.versionId : "",
      session: editingRowData ? editingRowData?.sessionId : "",
      class_name: editingRowData ? editingRowData?.classNameId : "",
      section: editingRowData ? editingRowData?.sectionId : "",
      group: editingRowData ? editingRowData?.groupId : "",
      teacher: editingRowData ? editingRowData?.teacherId : "",
    },
    resolver: yupResolver(classTeacherAssignSchema),
  });

  const onSubmit = async (data) => {
    const postApi = `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-teacher`;
    const putApi = `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-teacher/detail/${editingRowData?.id}`;

    try {
      const response = await fetch(editingRowData ? putApi : postApi, {
        method: editingRowData ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.code === 200) {
        setClassTeacherSaved();
        handleClose();
        toast.success(result?.message, {
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

      if (result.code === 400) {
        toast.error("Class Teacher data already exist", {
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

      if (result.code === 401) {
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
    } catch (error) {
      console.log("err", error.message);
    }
  };

  return (
    <Box
    sx={{
      backgroundColor: palette.customColors.boxBg,
      borderRadius: "10px",
      padding: "20px 10px",
      mt: "10px",
    }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          {/* Version */}
          <Grid item xs={12} sm={12} md={6}>
            <Box className="flex gap-1">
              <Typography sx={{color: palette.text.secondary }}>Version</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Box>
              <Controller
                name="version"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    select
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    label="Select Version Name"
                    size="small"
                    fullWidth
                  >
                    {versionData?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.version}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* Session */}
          <Grid item xs={12} sm={12} md={6}>
            <Box className="flex gap-1">
              <Typography sx={{color: palette.text.secondary }}>Session</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Box>
              <Controller
                name="session"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    select
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    label="Select Session Name"
                    size="small"
                    fullWidth
                  >
                    {sessionData?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.session}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* Class */}
          <Grid item xs={12} sm={12} md={6}>
            <Box className="flex gap-1">
              <Typography sx={{color: palette.text.secondary }}>Class</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Box>
              <Controller
                name="class_name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    select
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    label="Select Class Name"
                    size="small"
                    fullWidth
                  >
                    {classData?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* Section */}
          <Grid item xs={12} sm={12} md={6}>
            <Box className="flex gap-1">
              <Typography sx={{color: palette.text.secondary }}>Section</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Box>
              <Controller
                name="section"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    select
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    label="Select Section Name"
                    size="small"
                    fullWidth
                  >
                    {sectionData?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.section}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* Group */}
          <Grid item xs={12} sm={12} md={6}>
            <Box className="flex gap-1">
              <Typography sx={{color: palette.text.secondary }}>Group</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Box>
              <Controller
                name="group"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    select
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    label="Select Group Name"
                    size="small"
                    fullWidth
                  >
                    {groupData?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* Teacher */}
          <Grid item xs={12} sm={12} md={6}>
            <Box className="flex gap-1">
              <Typography sx={{color: palette.text.secondary }}>Teacher</Typography>
              <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                *
              </Typography>
            </Box>
            <Box>
              <Controller
                name="teacher"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    select
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    label="Select Teacher Name"
                    size="small"
                    fullWidth
                  >
                    {teacherData?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.first_name}
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
                background: "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
                ":hover": {
                  bgcolor: "#796EF1",
                },
                padding: "5px 30px",
                marginRight: "10px",
                fontWeight: "700",
              }}
            >
              {editingRowData ? "Update" : "Save"}
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
  );
};

export default ClassTeacherModal;
