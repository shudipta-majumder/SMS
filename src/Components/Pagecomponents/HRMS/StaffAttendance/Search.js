"use client";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Grid from "@mui/material/Grid";
import StaffAttendance from "./StaffAttendance";
import { Icon } from "@iconify/react";
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

  { id: "attendancedate", label: "Attendance Date", align: "center" },
  { id: "punchtime", label: "Punch Time", align: "center" },
  { id: "eventtype", label: "Event Type", align: "center" },
  { id: "sourcetype", label: "Source Type", align: "center" },
  { id: "remarks", label: "Remarks", align: "center" },
];
function createData(
  serial,
  id,
  name,
  attendancedate,
  punchtime,
  eventtype,
  sourcetype,
  remarks
) {
  return {
    serial,
    id,
    name,
    attendancedate,
    punchtime,
    eventtype,
    sourcetype,
    remarks,
  };
}

const SearchRole = ({ session }) => {
    const {color, colorX, palette } = useOnlyIcon();
  const accessToken = session?.user?.data?.token?.access;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeesData, setEmployeesData] = useState({});
  const [employeesTableData, setEmployeesTableData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [personName, setPersonName] = React.useState("");
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [searchClicked, setSearchClicked] = useState(false);
  const [resetClicked, setResetClicked] = useState(false);

  const handleSearchClick = () => {
    setSearchClicked(true);
  };
  const handleReset = () => {
    setResetClicked(true);
  };

  const handleChangeFromDate = (date) => {
    setSelectedFromDate(date);
  };

  const handleChangeToDate = (date) => {
    setSelectedToDate(date);
  };

  const handleEmployeeNameChange = (event, value) => {
    setPersonName(value);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/staff/api/role-base-staff/0`, {
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
          setEmployeesData(responseData);
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
  }, []);

  useEffect(() => {
    fetch(
      `${
        process.env.NEXT_PUBLIC_HOST
      }/staff/api/raw/attendance/list?page_number=${
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
          setEmployeesTableData(responseData);
          setCount(responseData.pagination.count);
          setIsLoading(false);
          setResetClicked(false);
        }
        if (responseData.code == 401) {
          setIsLoading(false);
        }
      })
      .catch((fetchError) => {
        setError(fetchError);
        setIsLoading(false);
      });
  }, [resetClicked, page, rowsPerPage]);

  useEffect(() => {
    if (searchClicked) {
      const personIDS = personName.id;
      const dataToSend = {
        staff_id: personIDS,
        from_date: dayjs(selectedFromDate).format("YYYY-MM-DD"),
        to_date: dayjs(selectedToDate).format("YYYY-MM-DD"),
      };

      fetch(
        `${process.env.NEXT_PUBLIC_HOST}/staff/api/raw/attendance?page_number=${
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
            setEmployeesTableData(responseData);
            setCount(responseData.pagination.count);
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

      setSearchClicked(false);
    }
  }, [searchClicked, page, rowsPerPage]);

  const rows = employeesTableData?.data?.map((item, index) => {
    const EmployeeID = item.staff?.staff_id;
    const FirstName = item.staff?.first_name;
    const LastName = item.staff?.last_name;
    const DisplayEmployee = `${FirstName} ${LastName}`;

    const AttnDate = item.attn_date;
    const TrnscTime = item.trnsc_time;
    const AttnType = item.attn_type;
    const SrcType = item.src_type;
    const Remarks = item.remarks;

    const currentIndex = page * rowsPerPage + index + 1;

    return createData(
      currentIndex.toString(),
      EmployeeID,
      DisplayEmployee,
      AttnDate,
      TrnscTime,
      AttnType,
      SrcType,
      Remarks
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
              <Typography sx={{ textAlign: "left" }}>
                Search with Employee IDs
              </Typography>
              <Box>
                <Stack spacing={3}>
                  <Autocomplete
                    sx={{
                       backgroundColor: palette.customColors.boxBg,
                    }}
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

                {/* <Stack spacing={3} sx={{ width: 500 }}>
                  <Autocomplete
                    multiple
                    id="tags-filled"
                    options={
                      employeesData.data &&
                      employeesData.data.map((option) => ({
                        id: option.id,
                        label: `${option.staff_id} - ${option.first_name} ${option.last_name}`,
                      }))
                    }
                    // defaultValue={[top100Films[13].title]}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="freeSolo"
                        placeholder="Favorites"
                      />
                    )}
                  />
                </Stack> */}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} lg={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Typography sx={{ textAlign: "left" }}>From Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={datePickerDesign}
                  // defaultValue={selectedDate}
                  onChange={handleChangeFromDate}
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

          <Grid item xs={12} sm={12} lg={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Typography sx={{ textAlign: "left" }}>To Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={datePickerDesign}
                  // defaultValue={selectedDate}
                  onChange={handleChangeToDate}
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
        employeesTableData={employeesTableData}
        columns={columns}
        error={error}
        count={count}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        rows={rows}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default SearchRole;
