"use client";
import { Box, MenuItem, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import StaffAttendance from "./StaffAttendance";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { useOnlyIcon } from "../../../Layout/NavContext";

const datePickerDesign = {
  "& .MuiIconButton-root": {
    color: "#7A6EF1",
  },
};

const columns = [
  { id: "serial", label: "SL", align: "center" },
  {
    id: "id",
    label: "ID",
    align: "center",
  },
  {
    id: "name",
    label: "Name",
    align: "center",
  },

  { id: "intime", label: "IN Time", align: "center" },
  { id: "outtime", label: "OUT Time", align: "center" },
  { id: "remarks", label: "Remarks", align: "center" },
];
function createData(
  serial,
  ids,
  id,
  name,
  createdate,
  eventtype,
  punchtime,
  punchdate,
  sourcetype
) {
  return {
    serial,
    ids,
    id,
    name,
    createdate,
    eventtype,
    punchtime,
    punchdate,
    sourcetype,
  };
}

const SearchRole = ({ roleData, accessToken }) => {
  const { palette, color, colorX, colorY } = useOnlyIcon();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeesData, setEmployeesData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [collectionofID, setCollectionofID] = useState([]);
  const [remarksSchema, setRemarksSchema] = useState(null);
  const [employeeID, setEmployeeID] = useState("");
  const [personIDall, setPersonIDall] = React.useState("");
  const [selectedRole, setSelectedRole] = useState(0);
  const [personName, setPersonName] = React.useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [searchClicked, setSearchClicked] = useState(false);
  const [resetClicked, setResetClicked] = useState(false);

  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  const handleReset = () => {
    setSelectedRole(0);
    setResetClicked(true);
  };

  const handleChangeDate = (date) => {
    setSelectedDate(date);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleEmployeeNameChange = (event, value) => {
    setPersonName(value);
  };

  useEffect(() => {
    fetch(
      `${
        process.env.NEXT_PUBLIC_HOST
      }/staff/api/role-base-staff/${selectedRole}?page_number=${
        page + 1
      }&page_size=${rowsPerPage}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then((responseData) => {
        if (responseData.code == 200) {
          setEmployeesData(responseData);
          setCount(responseData.pagination.count);
          const ids = responseData.data.map((item) => item.id);
          setCollectionofID(ids);
          const empid = responseData.data.map((item) => item.staff_id);
          setEmployeeID(empid);
          setIsLoading(false);
        }
        if (responseData.code == 401) {
          setIsLoading(false);
        }
      })
      .catch((fetchError) => {
        setError(fetchError);
        setIsLoading(false);
      });
  }, [selectedRole, resetClicked, page, rowsPerPage]);

  useEffect(() => {
    if (searchClicked) {
      if (personName && personName.length > 0) {
        const personIDS = personName.map((item) => item.id);
        const dataToSend = {
          staff_id: personIDS,
        };
        fetch(
          `${
            process.env.NEXT_PUBLIC_HOST
          }/staff/api/search/staff/list?page_number=${
            page + 1
          }&page_size=${rowsPerPage}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((responseData) => {
            if (responseData.code == 200) {
              console.log("autoresponse", responseData);
              setEmployeesData(responseData);
              setCount(responseData.pagination.count);
              const ids = responseData.data.map((item) => item.id);
              setCollectionofID(ids);
              const empid = responseData.data.map((item) => item.staff_id);
              setEmployeeID(empid);
              setIsLoading(false);
            }
            if (responseData.code == 401) {
              setIsLoading(false);
            }
          })
          .catch((fetchError) => {
            setError(fetchError);
            setIsLoading(false);
          });
      }
      setSearchClicked(false);
    }
  }, [searchClicked, personName, page, rowsPerPage]);

  const rows = employeesData?.data?.map((item, index) => {
    const EmployeeID = item.staff_id;
    const FirstName = item.first_name;
    const LastName = item.last_name;
    const allID = item.id;

    const DisplayEmployee = `${FirstName} ${LastName}`;
    const currentIndex = page * rowsPerPage + index + 1;

    return createData(
      currentIndex.toString(),
      allID,
      EmployeeID,
      DisplayEmployee
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                <Typography sx={{ ml: "15px" }}>Role</Typography>
              </Box>
              <TextField
                select
                label="Select role"
                size="small"
                placeholder="Type Here"
                onChange={handleRoleChange}
                sx={{
                  textAlign: "left",
                  backgroundColor: palette.customColors.boxBg,
                }}
              >
                {roleData.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} lg={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Typography sx={{ textAlign: "left" }}>
                Search with Employee IDs
              </Typography>
              <Box>
                <Stack spacing={3}>
                  <Autocomplete
                    sx={{
                      backgroundColor: palette.customColors.boxBg,
                    }}
                    multiple
                    id="tags-filled"
                    options={
                      employeesData.data &&
                      employeesData.data.map((option) => ({
                        id: option.id,
                        label: `${option.staff_id} - ${option.first_name} ${option.last_name}`,
                      }))
                    }
                    onChange={handleEmployeeNameChange}
                    // getOptionLabel={(option) => option.label}
                    // getOptionSelected={(option, value) =>
                    //   option.id === value.id
                    // }
                    // defaultValue={[top100Films[13].title]}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option.label}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Employee"
                        size="small"
                      />
                    )}
                  />
                </Stack>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} lg={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Typography sx={{ textAlign: "left" }}>Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={datePickerDesign}
                  defaultValue={selectedDate}
                  onChange={handleChangeDate}
                  sx={{
                    textAlign: "left",
                    backgroundColor: palette.customColors.boxBg,
                  }}
                  fullWidth
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              mb: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: "20px",
              }}
            >
              <Button
                startIcon={<Icon icon="material-symbols:search" />}
                variant="contained"
                size="small"
                type="submit"
                sx={{
                  backgroundColor: "green",
                  ":hover": {
                    bgcolor: "green",
                  },
                  padding: "5px 30px",
                  fontWeight: "700",
                }}
                onClick={handleSearchClick}
              >
                Search
              </Button>

              <Button
                startIcon={<Icon icon="solar:eraser-bold-duotone" />}
                variant="contained"
                size="small"
                type="submit"
                sx={{
                  backgroundColor: "#af4b4b",
                  padding: "5px 30px",
                  fontWeight: "700",
                }}
                onClick={handleReset}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <StaffAttendance
        accessToken={accessToken}
        employeesData={employeesData}
        columns={columns}
        error={error}
        count={count}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        rows={rows}
        collectionofID={collectionofID}
        employeeID={employeeID}
        isLoading={isLoading}
        selectedDate={selectedDate}
      />
    </Box>
  );
};

export default SearchRole;
