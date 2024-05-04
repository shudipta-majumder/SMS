"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { Box, TableSortLabel, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { TextField, InputAdornment, Backdrop } from "@mui/material";
import Icon from "../../../icon/page";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useClassePeriodsContext } from "./ClassePeriodsContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useOnlyIcon } from "../../../Layout/NavContext";
const MySwal = withReactContent(Swal);
import { UseTableStyledComponent } from "../../../utility/TableTheme/UseTableStyledComponent";

const swalWithMuiButtons = MySwal.mixin({
  customClass: {
    confirmButton:
      "MuiButtonBase-root MuiButton-contained MuiButton-containedSuccess",
    cancelButton:
      "MuiButtonBase-root MuiButton-contained MuiButton-containedError",
  },
  buttonsStyling: true,
});

const columns = [
  { id: "serial", label: "SL", align: "center" },
  // { id: "ids", label: "ID", align: "center" },
  {
    id: "classeperiodsname",
    label: "Class Periods Name",
    align: "center",
    sortable: true,
  },
  {
    id: "starttime",
    label: "Start Time",
    align: "center",
  },
  {
    id: "endtime",
    label: "End Time",
    align: "center",
  },
  {
    id: "duration",
    label: "Duration",
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];
function createData(
  serial,
  ids,
  classeperiodsname,
  starttime,
  endtime,
  duration,
  permissions,
  action
) {
  return {
    serial,
    ids,
    classeperiodsname,
    starttime,
    endtime,
    duration,
    permissions,
    action,
  };
}

const ClassePeriodsTable = ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;
    const {color, colorX, palette } = useOnlyIcon();
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();
  const { isClassePeriodsSaved, resetClassePeriodsSaved } =
    useClassePeriodsContext();
  const router = useRouter();
  const [classePeriodsData, setClassePeriodsData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [editingRow, setEditingRow] = useState(null);
  const [editedClassePeriodsName, setEditedClassePeriodsName] = useState("");
  const [beforeClassePeriodsName, setBeforeClassePeriodsName] = useState(null);
  const [editedStartTime, setEditedStartTime] = useState("");
  const [beforeStartTime, setBeforeStartTime] = useState(null);
  const [editedEndTime, setEditedEndTime] = useState("");
  const [beforeEndTime, setBeforeEndTime] = useState(null);
  const [count, setCount] = useState(0);
  const [deleteTrigered, setDeleteTrigered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noPermission, setNoPermission] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Extracting permissions for the "classperiods" submenu
  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "Academic")
    : null;
  const classperiodsSubMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find((subMenu) => subMenu.name === "Class Period")
    : null;
  const classperiodsPermissions = classperiodsSubMenu?.permission || [];

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-period?page_number=${
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
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.code == 200) {
          setClassePeriodsData(responseData);
          setCount(responseData.pagination.count);
          setDeleteTrigered(false);
          setIsLoading(false);
          resetClassePeriodsSaved();
        }
        if (responseData.code == 401) {
          setIsLoading(false);
          setNoPermission(true);
        }
      })
      .catch((fetchError) => {
        setError(fetchError);
        setIsLoading(false);
      });
  }, [deleteTrigered, page, rowsPerPage, editingRow, isClassePeriodsSaved]);

  const rows = classePeriodsData?.data.map((item, index) => {
    function convertTo12HourFormat(time24) {
      const [hours, minutes, seconds] = time24.split(":");
      let period = "am";
      let hour = parseInt(hours, 10);

      if (hour >= 12) {
        period = "pm";
        if (hour > 12) {
          hour -= 12;
        }
      }

      const time12 = `${hour}:${minutes}:${seconds} ${period}`;
      return time12;
    }

    const convertedStartTime = convertTo12HourFormat(item.start_time);
    const convertedEndTime = convertTo12HourFormat(item.end_time);

    const parseTime = (timeString) => {
      const [time, period] = timeString.split(" ");
      const [hour, minute, second] = time.split(":").map(Number);

      if (period === "pm" && hour !== 12) {
        // Convert PM hours to 24-hour format
        return {
          hour: hour + 12,
          minute,
          second,
        };
      } else if (period === "am" && hour === 12) {
        // Convert 12 AM to 00 hours
        return {
          hour: 0,
          minute,
          second,
        };
      } else {
        return {
          hour,
          minute,
          second,
        };
      }
    };

    const startTime = parseTime(convertedStartTime);
    const endTime = parseTime(convertedEndTime);

    // Calculate duration in seconds
    let durationInSeconds =
      endTime.hour * 3600 +
      endTime.minute * 60 +
      endTime.second -
      (startTime.hour * 3600 + startTime.minute * 60 + startTime.second);

    if (durationInSeconds < 0) {
      durationInSeconds += 24 * 3600;
    }

    // Convert duration to "HH:mm:ss" format
    const durationHours = Math.floor(durationInSeconds / 3600);
    const durationMinutes = Math.floor((durationInSeconds % 3600) / 60);
    const durationSeconds = durationInSeconds % 60;

    const durationFormatted = `${durationHours}:${durationMinutes}:${durationSeconds}`;
    const permissions = classperiodsPermissions || [];
    const currentIndex = page * rowsPerPage + index + 1;

    return createData(
      currentIndex.toString(),
      item.id,
      item.name,
      convertedStartTime,
      convertedEndTime,
      durationFormatted,
      permissions
    );
  });

  const handleSort = (columnId) => {
    if (columnId === orderBy) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(columnId);
      setOrder("asc");
    }
  };

  const sortedRows = orderBy
    ? rows.slice().sort((a, b) => {
        const isAsc = order === "asc";

        if (orderBy === "ClassePeriodsname") {
          const yearA = parseInt(a[orderBy].match(/\d+/));
          const yearB = parseInt(b[orderBy].match(/\d+/));

          if (yearA !== yearB) {
            // If years are different, sort by year
            return isAsc ? yearA - yearB : yearB - yearA;
          } else {
            // If years are the same, sort by row index to maintain stability
            return rows.indexOf(a) - rows.indexOf(b);
          }
        } else if (orderBy === "startdate") {
          const dateA = new Date(a[orderBy]);
          const dateB = new Date(b[orderBy]);

          return isAsc ? dateA - dateB : dateB - dateA;
        }
        return isAsc
          ? a[orderBy].localeCompare(b[orderBy])
          : b[orderBy].localeCompare(a[orderBy]);
      })
    : rows;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id, deletedClassePeriodsName) => {
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert <b>${deletedClassePeriodsName}!</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithMuiButtons.fire(
            "Deleted!",
            `Class <b>${deletedClassePeriodsName}</b> has been deleted.`,
            "success"
          );

          fetch(
            `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-period/delete/${id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                // Authorization: `Bearer ${refreshToken}`,
              },
            }
          )
            .then((response) => {
              if (response.ok) {
                const filterdData = classePeriodsData.data.filter(
                  (periods) => periods.id !== id
                );
                setClassePeriodsData({
                  ...classePeriodsData,
                  data: filterdData,
                });
                setDeleteTrigered(true);
              } else {
                // Handle errors here
              }
            })
            .catch((error) => {
              console.error("Error deleting data:", error);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === MySwal.DismissReason.cancel
        ) {
          swalWithMuiButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  const handleEdit = (rowids, classePeriodsName, startTime, endTime) => {
    setEditingRow(rowids);
    setEditedClassePeriodsName(classePeriodsName);
    setBeforeClassePeriodsName(classePeriodsName);
    setEditedStartTime(startTime);
    setBeforeStartTime(startTime);
    setEditedEndTime(endTime);
    setBeforeEndTime(endTime);
  };

  const handleSave = (rowids) => {
    function convertTo24HourFormat(time) {
      const [hours, minutes, secondsAndPeriod] = time.split(":");
      const [seconds, period] = secondsAndPeriod.split(" ");

      let formattedHours = parseInt(hours, 10);

      if (period.toLowerCase() === "pm" && formattedHours !== 12) {
        formattedHours += 12;
      } else if (period.toLowerCase() === "am" && formattedHours === 12) {
        formattedHours = 0;
      }

      const formattedTime = `${formattedHours
        .toString()
        .padStart(2, "0")}:${minutes}:${seconds}`;

      return formattedTime;
    }

    const formingStartTime = convertTo24HourFormat(editedStartTime);
    const formingEndTime = convertTo24HourFormat(editedEndTime);

    const updatedData = {
      name: editedClassePeriodsName,
      start_time: formingStartTime,
      end_time: formingEndTime,
    };

    const CustomToast = () => (
      <Box>
        <Typography>Successfully Updated</Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Periods Name:
          </Typography>{" "}
          {beforeClassePeriodsName} to {editedClassePeriodsName}
        </Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Start Time:
          </Typography>{" "}
          {beforeStartTime} to {editedStartTime}
        </Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            EndTime:
          </Typography>{" "}
          {beforeEndTime} to {editedEndTime}
        </Typography>
      </Box>
    );

    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-period/detail/${rowids}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.code == 200) {
          const updatedRows = classePeriodsData.data.map((item) => {
            if (item.id === rowids) {
              return {
                ...item,
                name: editedClassePeriodsName,
                start_time: formingStartTime,
                end_time: formingEndTime,
              };
            }
            return item;
          });
          setClassePeriodsData({ ...classePeriodsData, data: updatedRows });
          setEditingRow(null);
          setEditedClassePeriodsName("");
          setEditedStartTime("");
          setEditedEndTime("");
          router.refresh();
          toast.success(<CustomToast />, {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // style: { whiteSpace: "pre-line" },   //apply  without  component line break
          });
        }
        if (responseData.code == 400) {
          toast.error(
            `ClassePeriods ${editedClassePeriodsName} already exits`,
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
        if (responseData.code == 401) {
          toast.error(`Permission Denied`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          // Handle errors
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedClassePeriodsName("");
    setEditedStartTime("");
    setEditedEndTime("");
  };

  const filteredRows = (sortedRows || []).filter((row) => {
    return row.classeperiodsname
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : noPermission ? (
        <h1>you have no permission to view</h1>
      ) : classePeriodsData ? (
        <>
          <Box>
            <Box
              sx={{
                backgroundColor: palette.customColors.boxBg,
                borderRadius: "10px",
                padding: "20px 10px",
                mt: "10px",
              }}
            >
              <Box sx={{ ml: "20px", mb: "10px" }}>
                <TextField
                  sx={{
                    backgroundColor: palette.search.bg,
                    "& input::placeholder": {
                      fontSize: "13px",
                      color: palette.search.text,
                    },
                  }}
                  className="max-w-[400px]"
                  fullWidth
                  size="small"
                  margin="dense"
                  placeholder="Search Here"
                  onChange={handleSearch}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          sx={{ color: palette.search.text }}
                        >
                          <Icon icon="ion:search-outline" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <StyledTableRow>
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        align={column.align}
                        sx={{ minWidth: column.minWidth }}
                      >
                        {column.sortable ? (
                          <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : "asc"}
                            onClick={() => handleSort(column.id)}
                          >
                            {column.label}
                          </TableSortLabel>
                        ) : (
                          column.label
                        )}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                </TableHead>
                <TableBody size="small">
                  {filteredRows.map((row) => (
                    <StyledTableRow tabIndex={-1} key={row.ids}>
                      {columns.map((column) => (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.id === "classeperiodsname" &&
                          editingRow === row.ids ? (
                            <>
                              <TextField
                                width="100px"
                                size="small"
                                value={editedClassePeriodsName}
                                onChange={(e) =>
                                  setEditedClassePeriodsName(e.target.value)
                                }
                                sx={{
                                  border: "none",
                                  "& input": {
                                    textAlign: "center",
                                    "&:focus": {
                                      outline: "none",
                                    },
                                    height: "18px",
                                  },
                                }}
                              />
                            </>
                          ) : column.id === "starttime" &&
                            editingRow === row.ids ? (
                            <>
                              <TextField
                                width="100px"
                                size="small"
                                value={editedStartTime}
                                onChange={(e) =>
                                  setEditedStartTime(e.target.value)
                                }
                                sx={{
                                  border: "none",
                                  "& input": {
                                    textAlign: "center",
                                    "&:focus": {
                                      outline: "none",
                                    },
                                    height: "18px",
                                  },
                                }}
                              />
                            </>
                          ) : column.id === "endtime" &&
                            editingRow === row.ids ? (
                            <>
                              <TextField
                                width="100px"
                                size="small"
                                value={editedEndTime}
                                onChange={(e) =>
                                  setEditedEndTime(e.target.value)
                                }
                                sx={{
                                  border: "none",
                                  "& input": {
                                    textAlign: "center",
                                    "&:focus": {
                                      outline: "none",
                                    },
                                    height: "18px",
                                  },
                                }}
                              />
                            </>
                          ) : (
                            row[column.id]
                          )}

                          {column.id === "action" ? (
                            <>
                              {editingRow === row.ids ? (
                                <>
                                  <IconButton
                                    onClick={() => handleSave(row.ids)}
                                  >
                                    <Icon
                                      className="text-[#8E84F3]"
                                      icon="ion:checkmark-outline"
                                    />
                                  </IconButton>
                                  <span className="text-pink-300">|</span>
                                  <IconButton
                                    onClick={() => handleCancelEdit(row.ids)}
                                  >
                                    <Icon
                                      className="text-rose-700"
                                      icon="ion:close-outline"
                                    />
                                  </IconButton>
                                </>
                              ) : (
                                <>
                                  {row.permissions &&
                                  row.permissions.includes("update") ? (
                                    <IconButton
                                      onClick={() =>
                                        handleEdit(
                                          row.ids,
                                          row.classeperiodsname,
                                          row.starttime,
                                          row.endtime
                                        )
                                      }
                                    >
                                      <Icon
                                        className="text-[#8E84F3]"
                                        icon="ep:edit"
                                      />
                                    </IconButton>
                                  ) : (
                                    ""
                                  )}

                                  <span className="text-pink-300">|</span>
                                  {row.permissions &&
                                  row.permissions.includes("delete") ? (
                                    <IconButton
                                      onClick={(e) =>
                                        handleDelete(
                                          row.ids,
                                          row.classeperiodsname
                                        )
                                      }
                                    >
                                      <Icon
                                        className="text-rose-700"
                                        icon="uiw:delete"
                                      />
                                    </IconButton>
                                  ) : (
                                    ""
                                  )}
                                </>
                              )}
                            </>
                          ) : null}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>

              <TablePagination
                sx={pagenationStyle}
                SelectProps={menuItemStyle}
                rowsPerPageOptions={[10, 20, 30, 50, 500]}
                component="div"
                count={count}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Box>
        </>
      ) : null}
    </>
  );
};

export default ClassePeriodsTable;
