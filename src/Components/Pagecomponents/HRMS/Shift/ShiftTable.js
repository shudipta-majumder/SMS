"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { Box, TableSortLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { TextField, InputAdornment, Backdrop } from "@mui/material";
import Icon from "../../../icon/page";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useShiftContext } from "./ShiftContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ShiftModal from "./ShiftModal";
import Modal from "@mui/material/Modal";
import { useOnlyIcon } from "../../../Layout/NavContext";
import { UseTableStyledComponent } from "../../../utility/TableTheme/UseTableStyledComponent";

const MySwal = withReactContent(Swal);

const swalWithMuiButtons = MySwal.mixin({
  customClass: {
    confirmButton:
      "MuiButtonBase-root MuiButton-contained MuiButton-containedSuccess",
    cancelButton:
      "MuiButtonBase-root MuiButton-contained MuiButton-containedError",
  },
  buttonsStyling: true,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 4,
};

const blurBackdrop = {
  backdropFilter: "blur(1px)",
  backgroundColor: "transparent",
  zIndex: 500,
  "& .MuiModal-backdrop": {
    backgroundColor: "transparent",
  },
};

const columns = [
  { id: "serial", label: "SL", align: "center" },
  // { id: "ids", label: "ID", align: "center" },
  { id: "shiftname", label: "Shift Name", align: "center", sortable: true },
  { id: "starttime", label: "Start Time", align: "center", sortable: true },
  { id: "endtime", label: "End Time", align: "center", sortable: true },
  { id: "remarks", label: "Remarks", align: "center", sortable: true },
  {
    id: "updatedby",
    label: "Updated By",
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
  shiftname,
  starttime,
  endtime,
  remarks,
  updatedby,
  permissions,
  action
) {
  return {
    serial,
    ids,
    shiftname,
    starttime,
    endtime,
    remarks,
    updatedby,
    permissions,
    action,
  };
}

const ShiftTable = ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;
    const {color, colorX, palette } = useOnlyIcon();
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isShiftSaved, resetShiftSaved } = useShiftContext();
  const router = useRouter();
  const [ShiftData, setShiftData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [editingRow, setEditingRow] = useState(null);
  const [editedShiftName, setEditedShiftName] = useState("");
  const [beforeShiftName, setBeforeShiftName] = useState(null);
  const [count, setCount] = useState(0);
  const [deleteTrigered, setDeleteTrigered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noPermission, setNoPermission] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [editRowData, setEditRowData] = useState(null);

  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "Human Resource")
    : null;
  const ShiftSubMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find((subMenu) => subMenu.name === "Shift")
    : null;
  const ShiftPermissions = ShiftSubMenu?.permission || [];

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/shift?page_number=${
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
          setShiftData(responseData);
          setCount(responseData.pagination.count);
          setDeleteTrigered(false);
          setIsLoading(false);
          resetShiftSaved();
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
  }, [deleteTrigered, page, rowsPerPage, editingRow, isShiftSaved]);

  const rows = ShiftData?.data.map((item, index) => {
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
    const permissions = ShiftPermissions || [];
    const currentIndex = page * rowsPerPage + index + 1;

    return createData(
      currentIndex.toString(),
      item.id,
      item.name || "N/A",
      convertedStartTime,
      convertedEndTime,
      item.remarks,
      item.updated_by,
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

        if (orderBy === "Shiftname") {
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

  const handleDelete = (id, deletedShiftName) => {
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert <b>${deletedShiftName}!</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(
            `${process.env.NEXT_PUBLIC_HOST}/staff/api/shift/delete/${id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                // Authorization: `Bearer ${refreshToken}`,
              },
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((responseData) => {
              if (responseData.code == 200) {
                const filterdData = ShiftData.data.filter(
                  (Shift) => Shift.id !== id
                );
                setShiftData({ ...ShiftData, data: filterdData });
                setDeleteTrigered(true);
                swalWithMuiButtons.fire(
                  "Deleted!",
                  `Shift <b>${deletedShiftName}</b> has been deleted.`,
                  "success"
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
                // Handle errors here
              }
            })
            .catch((error) => {
              console.error("Error deleting data:", error);
            });
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          swalWithMuiButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  const handleEdit = (rowids, ShiftName) => {
    setEditingRow(rowids);
    setEditedShiftName(ShiftName);
    setBeforeShiftName(ShiftName);
  };

  const handleSave = (rowids) => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/staff/api/Shift/detail/${rowids}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editedShiftName }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.code == 200) {
          const updatedData = ShiftData.data.map((item) => {
            if (item.id === rowids) {
              return { ...item, Shiftname: editedShiftName };
            }
            return item;
          });
          setShiftData({ ...ShiftData, data: updatedData });
          setEditingRow(null);
          setEditedShiftName("");
          router.refresh();
          toast.success(
            `Successfully Shift ${beforeShiftName} to ${editedShiftName} Updated`,
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
        if (responseData.code == 400) {
          toast.error(`Shift ${editedShiftName} already exits`, {
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
    setEditedShiftName("");
  };

  const filteredRows = (sortedRows || []).filter((row) => {
    return row.shiftname.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : noPermission ? (
        <h1>you have no permission to view</h1>
      ) : ShiftData ? (
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
                          {column.id === "Shiftname" &&
                          editingRow === row.ids ? (
                            <TextField
                              width="200px"
                              size="small"
                              value={editedShiftName}
                              onChange={(e) =>
                                setEditedShiftName(e.target.value)
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
                                      onClick={() => {
                                        setEditRowData(row); // Pass the row data to the state
                                        handleOpen(); // Open the modal
                                      }}
                                    >
                                      <Icon
                                        className="text-[#8E84F3]"
                                        icon="ep:edit"
                                      />
                                    </IconButton>
                                  ) : (
                                    ""
                                  )}
                                  <Modal
                                    open={open}
                                    onClose={handleClose}
                                    className={blurBackdrop}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Box sx={style}>
                                      <ShiftModal
                                        handleClose={handleClose}
                                        editRowData={editRowData}
                                        accessToken={accessToken}
                                      />
                                    </Box>
                                  </Modal>

                                  <span className="text-pink-300">|</span>

                                  {row.permissions &&
                                  row.permissions.includes("delete") ? (
                                    <IconButton
                                      onClick={(e) =>
                                        handleDelete(row.ids, row.Shiftname)
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

export default ShiftTable;
