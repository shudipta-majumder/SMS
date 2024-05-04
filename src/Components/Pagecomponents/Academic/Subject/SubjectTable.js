"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TableSortLabel,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { TextField, InputAdornment, Backdrop } from "@mui/material";
import Icon from "../../../icon/page";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSubjectContext } from "./SubjectContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import { useOnlyIcon } from "../../../Layout/NavContext";
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
  { id: "subjectname", label: "Subject Name", align: "center", sortable: true },
  { id: "subjectcode", label: "Subject Code", align: "center", sortable: true },
  { id: "subjecttype", label: "Subject Type", align: "center", sortable: true },
  {
    id: "createddate",
    label: "Created Date",
    align: "center",
    sortable: true,
  },
  {
    id: "createdby",
    label: "Created By",
    align: "center",
  },
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
  subjectname,
  subjectcode,
  subjecttype,
  createddate,
  createdby,
  updatedby,
  permissions,
  action
) {
  return {
    serial,
    ids,
    subjectname,
    subjectcode,
    subjecttype,
    createddate,
    createdby,
    updatedby,
    permissions,
    action,
  };
}

const SubjectTable = ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;
  const { isSubjectSaved, resetSubjectSaved } = useSubjectContext();
  const router = useRouter();
    const {color, colorX, palette } = useOnlyIcon();
  const [subjectData, setSubjectData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [editingRow, setEditingRow] = useState(null);
  const [editedSubjectName, setEditedSubjectName] = useState("");
  const [beforeSubjectName, setBeforeSubjectName] = useState(null);
  const [editedSubjectCode, setEditedSubjectCode] = useState("");
  const [beforeSubjectCode, setBeforeSubjectCode] = useState(null);
  const [editedSubjectType, setEditedSubjectType] = useState("");
  const [beforeSubjectType, setBeforeSubjectType] = useState(null);
  const [subjectTypes, setSubjectTypes] = useState([]);
  const [subjectTypesSending, setSubjectTypesending] = useState(null);
  const [count, setCount] = useState(0);
  const [deleteTrigered, setDeleteTrigered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noPermission, setNoPermission] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();

  // Extracting permissions for the "subject" submenu
  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "Academic")
    : null;
  const subjectSubMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find((subMenu) => subMenu.name === "Subject")
    : null;
  const subjectPermissions = subjectSubMenu?.permission || [];

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/subject?page_number=${
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
          setSubjectData(responseData);
          setCount(responseData.pagination.count);
          setDeleteTrigered(false);
          setIsLoading(false);
          resetSubjectSaved();
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
  }, [deleteTrigered, page, rowsPerPage, editingRow, isSubjectSaved]);

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
        setError(fetchError);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setSubjectTypesending(event.target.value);
    // const selectedFloorType = floorTypes.find(
    //   (floorType) => floorType.id === event.target.value
    // );
    // setFloorTypeName(selectedFloorType ? selectedFloorType.name : null);
  };
  const rows = subjectData?.data.map((item, index) => {
    const date = new Date(item.created_at);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedDateTimeString = `${year}-${month}-${day}, ${formattedHours}:${minutes}:${seconds} ${ampm}`;
    const permissions = subjectPermissions || [];

    const currentIndex = page * rowsPerPage + index + 1;

    return createData(
      currentIndex.toString(),
      item.id,
      item.name,
      item.code,
      item.type?.name,
      formattedDateTimeString,
      item.created_username,
      item.updated_username,
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

        if (orderBy === "Subjectname") {
          const yearA = parseInt(a[orderBy].match(/\d+/));
          const yearB = parseInt(b[orderBy].match(/\d+/));

          if (yearA !== yearB) {
            // If years are different, sort by year
            return isAsc ? yearA - yearB : yearB - yearA;
          } else {
            // If years are the same, sort by row index to maintain stability
            return rows.indexOf(a) - rows.indexOf(b);
          }
        } else if (orderBy === "createddate") {
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

  const handleDelete = (id, deletedSubjectName) => {
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert <b>${deletedSubjectName}!</b>`,
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
            `Subject <b>${deletedSubjectName}</b> has been deleted.`,
            "success"
          );

          fetch(
            `${process.env.NEXT_PUBLIC_HOST}/academic/api/subject/delete/${id}`,
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
                const filterdData = subjectData.data.filter(
                  (subject) => subject.id !== id
                );
                setSubjectData({ ...subjectData, data: filterdData });
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

  const handleEdit = (rowids, subjectName, subjectCode, subjectType) => {
    setEditingRow(rowids);
    setEditedSubjectName(subjectName);
    setBeforeSubjectName(subjectName);
    setEditedSubjectCode(subjectCode);
    setBeforeSubjectCode(subjectCode);
    setEditedSubjectType(subjectType);
    setBeforeSubjectType(subjectType);
  };

  const handleSave = (rowids) => {
    console.log(
      "object",
      editedSubjectCode,
      editedSubjectName,
      subjectTypesSending
    );
    const updatedData = {
      code: editedSubjectCode,
      name: editedSubjectName,
      type: subjectTypesSending,
    };

    const CustomToast = () => (
      <Box>
        <Typography>Successfully Updated</Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Subject Name:
          </Typography>
          {beforeSubjectName} to {editedSubjectName}
        </Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Subject Code:
          </Typography>{" "}
          {beforeSubjectCode} to {editedSubjectCode}
        </Typography>

        <Box m={1} />

        <Typography component="div">
          <Typography component="strong" fontWeight="bold">
            Subject Type:
          </Typography>{" "}
          {beforeSubjectType} to {editedSubjectType}
        </Typography>
      </Box>
    );

    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/subject/detail/${rowids}`,
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
          const updatedData = subjectData.data.map((item) => {
            if (item.id === rowids) {
              return { ...item, subjectname: editedSubjectName };
            }
            return item;
          });
          setSubjectData({ ...subjectData, data: updatedData });
          setEditingRow(null);
          setEditedSubjectName("");
          router.refresh();
          toast.success(<CustomToast />, {
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
        if (responseData.code == 400) {
          toast.error(responseData.message, {
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
        if (responseData.code == 400) {
          toast.error(responseData.message, {
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
    setEditedSubjectName("");
  };

  const filteredRows = (sortedRows || []).filter((row) => {
    return (
      row.subjectname.toLowerCase().includes(searchText.toLowerCase()) ||
      row.createddate.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : noPermission ? (
        <h1>you have no permission to view</h1>
      ) : subjectData ? (
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
                          {column.id === "subjectname" &&
                          editingRow === row.ids ? (
                            <TextField
                              width="200px"
                              size="small"
                              value={editedSubjectName}
                              onChange={(e) =>
                                setEditedSubjectName(e.target.value)
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
                          ) : column.id === "subjectcode" &&
                            editingRow === row.ids ? (
                            <>
                              <TextField
                                width="100px"
                                size="small"
                                value={editedSubjectCode}
                                onChange={(e) =>
                                  setEditedSubjectCode(e.target.value)
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
                          ) : column.id === "subjecttype" &&
                            editingRow === row.ids ? (
                            <>
                              <FormControl fullWidth>
                                <InputLabel
                                  size="small"
                                  id="demo-simple-select-label"
                                >
                                  {editedSubjectType}
                                </InputLabel>
                                <Select
                                  size="small"
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label={editedSubjectType}
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
                                    subjectTypes.map((subjectType) => (
                                      <MenuItem
                                        key={subjectType.id}
                                        value={subjectType.id}
                                      >
                                        {subjectType.name}
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
                                          row.subjectname,
                                          row.subjectcode,
                                          row.subjecttype
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
                                        handleDelete(row.ids, row.subjectname)
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

export default SubjectTable;
