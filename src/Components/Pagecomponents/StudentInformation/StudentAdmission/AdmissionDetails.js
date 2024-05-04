"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import { v4 as uuidv4 } from "uuid";

const BasicDesign = {
  customTextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "0",
      padding: "16px",
    },
  },
}

const FirstStep = ({
  Controller,
  versionData,
  useFormContext,
  classSectionData,
}) => {
  const [age, setAge] = React.useState("");
 
  const [versionId, setVersion] = useState();
  const [sessionId, setSession] = useState();
  const [classnameId, setClassname] = useState();
  const [classSession, setClassSession] = useState();
  const [className, setClassName] = useState();
  const [data, setData] = useState(classSectionData);

  // -------- filtering version ----------

  let singleClassSection = classSectionData?.data?.filter(
    (cls) => cls?.version?.id === versionId
  );

  // ----------- Showing session ------------

  let filterSessionData = singleClassSection?.map((sess) => sess?.session);

  // ----------- filtering dublicate session values ------------

  const uniqueSessionIds = new Set();

  const removeDublicateSessions = filterSessionData?.filter((item) => {
    if (uniqueSessionIds.has(item.session)) {
      return false;
    }
    uniqueSessionIds.add(item.session);
    return true;
  });

  // ----------- filtering class ------------

  let singleSession = classSectionData?.data?.filter(
    (cls) => cls?.session?.id === sessionId
  );

  // ----------- Showing class ------------

  let filterClassNameData = singleSession?.map(
    (flClass) => flClass?.class_name
  );

  // ----------- removing dublicate class values ------------

  const uniqueClassNameIds = new Set();

  const removeDublicateClassNames = filterClassNameData?.filter((item) => {
    const combination = `${item.id}-${item.name}`;
    if (uniqueClassNameIds.has(combination)) {
      return false;
    }
    uniqueClassNameIds.add(combination);
    return true;
  });

  // ----------- filtering section ------------

  let singleClass = classSectionData?.data?.filter(
    (sec) =>
      sec?.class_name?.id === classnameId && sec?.session?.id === sessionId
  );

  // ----------- Showing section ------------

  let filterSectionData = singleClass?.map((flSection) => flSection?.section);

  const { control } = useFormContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Grid container spacing={2}>
          {/* version */}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px" }}>Version</Typography>
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
                    sx={{ textAlign: "left" }}
                    helperText={error?.message}
                    fullWidth
                    size="small"
                    placeholder="Type Here"
                    onChange={(e) => {
                      field.onChange(e);
                      setVersion(e.target.value);
                      setClassSession(
                        versionData?.filter((ver) => ver?.id === versionId)
                      );
                    }}
                  >
                    {versionData?.map((version) => (
                      <MenuItem key={uuidv4()} value={version?.id}>
                        {version?.version}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* session */}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px" }}>Session</Typography>
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
                    sx={{ textAlign: "left" }}
                    helperText={error?.message}
                    fullWidth
                    size="small"
                    placeholder="Type Here"
                    onChange={(e) => {
                      field.onChange(e);
                      setSession(e.target.value);
                      setClassSession(
                        removeDublicateSessions?.filter(
                          (ses) => ses?.id === sessionId
                        )
                      );
                    }}
                  >
                    {removeDublicateSessions?.map((session) => (
                      <MenuItem key={uuidv4()} value={session.id}>
                        {session?.session}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* classname */}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px" }}>Class Name</Typography>
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
                    sx={{ textAlign: "left" }}
                    helperText={error?.message}
                    fullWidth
                    size="small"
                    placeholder="Type Here"
                    onChange={(e) => {
                      field.onChange(e);
                      setClassname(e.target.value);
                      setClassSession(
                        removeDublicateClassNames?.filter(
                          (c) => c?.id === classnameId
                        )
                      );
                    }}
                  >
                    {removeDublicateClassNames?.map((classname) => (
                      <MenuItem key={uuidv4()} value={classname?.id}>
                        {classname?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          {/* section */}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px" }}>Section</Typography>
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
                    sx={{ textAlign: "left" }}
                    helperText={error?.message}
                    fullWidth
                    size="small"
                    placeholder="Type Here"
                  >
                    {filterSectionData?.map((section) => (
                      <MenuItem key={uuidv4()} value={section?.id}>
                        {section?.section}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FirstStep;
