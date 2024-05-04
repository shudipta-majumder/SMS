"use client";
import { Box, MenuItem, Typography } from "@mui/material";
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
import { useOnlyIcon } from "../../../../Layout/NavContext";

const datePickerDesign = {
  "& .MuiIconButton-root": {
    color: "#7A6EF1",
  },
};

const columns = [
  { id: "serial", label: "SL", align: "center" },
  {
    id: "empid",
    label: "Emp ID",
    align: "center",
  },
  {
    id: "employee",
    label: "Employee",
    align: "center",
  },
  {
    id: "responsibleemployee",
    label: "Responsible Employee",
    align: "center",
  },
  {
    id: "leavetype",
    label: "Leave Type",
    align: "center",
  },

  { id: "applydate", label: "Apply Date", align: "center" },
  { id: "fromdate", label: "From Date", align: "center" },
  { id: "todate", label: "To Date", align: "center" },
  { id: "leavedays", label: "Leave Days", align: "center" },
  { id: "approvalstatus", label: "Approval Status", align: "center" },
  { id: "action", label: "Action", align: "center" },
];
function createData(
  serial,
  ids,
  empid,
  employee,
  responsibleemployee,
  leavetype,
  applydate,
  fromdate,
  todate,
  leavedays,
  approvalstatus,
  permissions,
  action
) {
  return {
    serial,
    ids,
    empid,
    employee,
    responsibleemployee,
    leavetype,
    applydate,
    fromdate,
    todate,
    leavedays,
    approvalstatus,
    permissions,
    action,
  };
}

const SearchRole = ({ LeaveStatusData, accessToken, menuData }) => {
  const { color, colorX, palette } = useOnlyIcon();
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

  const HumanResourceMenu = menuData
    ? menuData.find((menu) => menu.name === "Human Resource")
    : null;
  const ApplyLeaveSubMenu = HumanResourceMenu?.sub_menu
    ? HumanResourceMenu.sub_menu.find(
        (subMenu) => subMenu.name === "Apply Leave"
      )
    : null;
  const ApplyLeavePermission = ApplyLeaveSubMenu?.permission || [];

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
      }/staff/api/personal/leave-trns?page_number=${
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
  }, [resetClicked, rowsPerPage, page]);

  // useEffect(() => {
  //   if (searchClicked) {
  //     const personIDS = personName.id;
  //     const dataToSend = {
  //       staff_id: personIDS,
  //       from_date: dayjs(selectedFromDate).format("YYYY-MM-DD"),
  //       to_date: dayjs(selectedToDate).format("YYYY-MM-DD"),
  //     };

  //     fetch(
  //       `${process.env.NEXT_PUBLIC_HOST}/staff/api/raw/attendance?page_number=${
  //         page + 1
  //       }&page_size=${rowsPerPage}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(dataToSend),
  //       }
  //     )
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         return response.json();
  //       })
  //       .then((responseData) => {
  //         if (responseData.code == 200) {
  //           setEmployeesTableData(responseData);
  //           setCount(responseData.pagination.count);
  //           setIsLoading(false);
  //         }
  //         if (responseData.code == 401) {
  //           setIsLoading(false);
  //         }
  //       })
  //       .catch((fetchError) => {
  //         setError(fetchError);
  //         setIsLoading(false);
  //       });

  //     setSearchClicked(false);
  //   }
  // }, [searchClicked, page, rowsPerPage]);

  const rows = employeesTableData?.data?.map((item, index) => {
    // const { first_name, last_name, staff_id } = item?.apply_by;

    const EmployeeID = item?.apply_by?.staff_id;
    const FirstName = item?.apply_by?.first_name;
    const LastName = item?.apply_by?.last_name;
    const DisplayEmployee = `${FirstName} ${LastName}`;

    const ResFirstName = item.responsible?.first_name;
    const ResLastName = item.responsible?.last_name;
    const ResponsibleEmployee = `${ResFirstName} ${ResLastName}`;
    const DayCount = `${item.day_count} Day(s)`;
    const ApplyDate = dayjs(item.application_date).format("DD-MMM-YYYY");
    const startDate = dayjs(item.start_date).format("DD-MMM-YYYY");
    const endDate = dayjs(item.end_date).format("DD-MMM-YYYY");
    const permissions = ApplyLeavePermission || [];
    const currentIndex = page * rowsPerPage + index + 1;

    return createData(
      currentIndex.toString(),
      item.id,
      EmployeeID,
      DisplayEmployee || "",
      ResponsibleEmployee || "",
      item.leave_type?.name,
      ApplyDate,
      startDate,
      endDate,
      DayCount,
      item.app_status?.title,
      permissions
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
      <Box sx={{ p: "16px" }}>
        <Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3} className="flex flex-row  items-end">
              {LeaveStatusData?.map((leave) => (
                <>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2.4}>
                    <Box
                      sx={{
                        backgroundColor: "#f5f0f0",
                        boxShadow: "10px 10px 10px #d9d9d9, 0 0 0 #fff",
                        position: "relative",
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <Grid
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Grid xs={12}>
                          <Box className="flex flex-row justify-between items-center ">
                            <Typography>{leave.leave_type.name}</Typography>

                            <Typography>
                              {leave.taken_days} / {leave.leave_days}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid xs={12}>
                          <Box sx={{ position: "relative", mb: "20px" }}>
                            <Box
                              as="div"
                              sx={{
                                content: '" "',
                                position: "absolute",
                                top: "calc(100%)",
                                backgroundColor: "rgb(173, 168, 167)",
                                width: "100%",
                                height: "15px",
                              }}
                            />

                            <Box
                              as="div"
                              sx={{
                                content: '" "',
                                position: "absolute",
                                top: "calc(100%)",
                                background: `${color}`,
                                width: `${
                                  (leave.taken_days / leave.leave_days) * 100
                                }%`,
                                height: "15px",
                              }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>

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
                  backgroundColor: "#55ce63",
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
                  backgroundColor: "#f62d51",
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
