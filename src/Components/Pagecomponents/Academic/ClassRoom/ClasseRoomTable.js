"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { Box, Pagination, TableSortLabel, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {
  TextField,
  InputAdornment,
  Backdrop,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Icon from "../../../icon/page";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useClasseRoomContext } from "./ClasseRoomContext";
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
    id: "classeroomno",
    label: "Class Room No",
    align: "center",
    sortable: true,
  },
  {
    id: "buildingname",
    label: "Building Name",
    align: "center",
  },
  {
    id: "floortype",
    label: "Floor Type",
    align: "center",
  },
  {
    id: "openingdate",
    label: "Opening Date",
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
  classeroomno,
  buildingname,
  floortype,
  openingdate,
  permissions,
  action
) {
  return {
    serial,
    ids,
    classeroomno,
    buildingname,
    floortype,
    openingdate,
    permissions,
    action,
  };
}

const ClasseRoomTable = ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;
    const {color, colorX, palette } = useOnlyIcon();
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();
  const { isClasseRoomSaved, resetClasseRoomSaved } = useClasseRoomContext();
  const router = useRouter();
  const [classeRoomData, setClasseRoomData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [editingRow, setEditingRow] = useState(null);

  const [editedClasseRoomNo, setEditedClasseRoomNo] = useState("");
  const [beforeClasseRoomNo, setBeforeClasseRoomNo] = useState(null);
  const [editedBuildingName, setEditedBuildingName] = useState("");
  const [beforeBuildingName, setBeforeBuildingName] = useState(null);
  const [editedFloorType, setEditedFloorType] = useState("");
  const [beforeFloorType, setBeforeFloorType] = useState(null);

  const [floorTypes, setFloorTypes] = useState([]);
  const [floorTypeSending, setFloorTypeSending] = useState(null);
  const [floorTypeName, setFloorTypeName] = useState(null);

  const [count, setCount] = useState(0);
  const [deleteTrigered, setDeleteTrigered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noPermission, setNoPermission] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Extracting permissions for the "classroom" submenu
  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "Academic")
    : null;
  const classroomSubMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find((subMenu) => subMenu.name === "Class Room")
    : null;
  const classroomPermissions = classroomSubMenu?.permission || [];

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-room?page_number=${
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
          setClasseRoomData(responseData);
          setCount(responseData.pagination.count);
          setDeleteTrigered(false);
          setIsLoading(false);
          resetClasseRoomSaved();
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
  }, [deleteTrigered, page, rowsPerPage, editingRow, isClasseRoomSaved]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/setup/api/floor/list`, {
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
          setFloorTypes(responseData.data);
          setIsLoading(false);
        }
      })
      .catch((fetchError) => {
        setError(fetchError);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setFloorTypeSending(event.target.value);
  };

  const rows = classeRoomData?.data.map((item, index) => {
    const permissions = classroomPermissions || [];
    const currentIndex = page * rowsPerPage + index + 1;

    return createData(
      currentIndex.toString(),
      item.id,
      item.room_no,
      item.building,
      item.floor_type?.name || "N/A",
      item.start_date,
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

        if (orderBy === "ClasseRoomname") {
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

  const handleDelete = (id, deletedClasseRoomName) => {
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert <b>${deletedClasseRoomName}!</b>`,
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
            `Class <b>${deletedClasseRoomName}</b> has been deleted.`,
            "success"
          );
          fetch(
            `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-room/delete/${id}`,
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
                const filterdData = classeRoomData.data.filter(
                  (room) => room.id !== id
                );
                setClasseRoomData({ ...classeRoomData, data: filterdData });
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

  const handleEdit = (rowids, classeRoomNo, buildingName, floortype) => {
    setEditingRow(rowids);
    setEditedClasseRoomNo(classeRoomNo);
    setBeforeClasseRoomNo(classeRoomNo);
    setEditedBuildingName(buildingName);
    setBeforeBuildingName(buildingName);
    setEditedFloorType(floortype);
    setBeforeFloorType(floortype);
  };

  const handleSave = (rowids) => {
    const updatedData = {
      room_no: editedClasseRoomNo,
      building: editedBuildingName,
      floor_type: floorTypeSending,
    };

    const CustomToast = () => (
      <Box>
        <Typography>Successfully Updated</Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Room NO:
          </Typography>{" "}
          {beforeClasseRoomNo} to {editedClasseRoomNo}
        </Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Building:
          </Typography>{" "}
          {beforeBuildingName} to {editedBuildingName}
        </Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Floor Type:
          </Typography>{" "}
          {beforeFloorType} to {editedFloorType}
        </Typography>
      </Box>
    );

    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-room/detail/${rowids}`,
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
          const updatedRows = classeRoomData.data.map((item) => {
            if (item.id === rowids) {
              return {
                ...item,
                room_no: editedClasseRoomNo,
                building: editedBuildingName,
                floor_type: floorTypeSending,
              };
            }
            return item;
          });
          setClasseRoomData({ ...classeRoomData, data: updatedRows });
          setEditingRow(null);
          setEditedClasseRoomNo("");
          setEditedBuildingName("");
          setEditedFloorType("");
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
          toast.error(`ClasseRoom ${editedClasseRoomNo} already exits`, {
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
    setEditedClasseRoomNo("");
    setEditedBuildingName("");
    setEditedFloorType("");
  };

  const filteredRows = (sortedRows || []).filter((row) => {
    return row.classeroomno.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : noPermission ? (
        <h1>you have no permission to view</h1>
      ) : classeRoomData ? (
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
                          {column.id === "classeroomno" &&
                          editingRow === row.ids ? (
                            <>
                              <TextField
                                width="100px"
                                size="small"
                                value={editedClasseRoomNo}
                                onChange={(e) =>
                                  setEditedClasseRoomNo(e.target.value)
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
                          ) : column.id === "buildingname" &&
                            editingRow === row.ids ? (
                            <>
                              <TextField
                                width="100px"
                                size="small"
                                value={editedBuildingName}
                                onChange={(e) =>
                                  setEditedBuildingName(e.target.value)
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
                          ) : column.id === "floortype" &&
                            editingRow === row.ids ? (
                            <>
                              <FormControl fullWidth>
                                <InputLabel
                                  size="small"
                                  id="demo-simple-select-label"
                                >
                                  {editedFloorType}
                                </InputLabel>
                                <Select
                                  size="small"
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label={editedFloorType}
                                  onChange={handleChange}
                                  sx={{
                                    ".MuiSelect-icon": { color: "#786CF1" },
                                    height: "38px",
                                  }}
                                >
                                  {isLoading ? (
                                    <p>Loading...</p>
                                  ) : error ? (
                                    <p>Error: {error.message}</p>
                                  ) : (
                                    floorTypes.map((floorType) => (
                                      <MenuItem
                                        key={floorType.id}
                                        value={floorType.id}
                                      >
                                        {floorType.name}
                                      </MenuItem>
                                    ))
                                  )}
                                </Select>
                              </FormControl>
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
                                          row.classeroomno,
                                          row.buildingname,
                                          row.floortype
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
                                        handleDelete(row.ids, row.classeroomno)
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

export default ClasseRoomTable;
