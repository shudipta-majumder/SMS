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
import { useDepartmentContext } from "./DepartmentContext";
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
  {
    id: "Departmentname",
    label: "Department Name",
    align: "center",
    sortable: true,
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
  Departmentname,
  updatedby,
  permissions,
  action
) {
  return {
    serial,
    ids,
    Departmentname,
    updatedby,
    permissions,
    action,
  };
}

const DepartmentTable = ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;
    const {color, colorX, palette } = useOnlyIcon();
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();
  const { isDepartmentSaved, resetDepartmentSaved } = useDepartmentContext();
  const router = useRouter();
  const [DepartmentData, setDepartmentData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [editingRow, setEditingRow] = useState(null);
  const [editedDepartmentName, setEditedDepartmentName] = useState("");
  const [beforeDepartmentName, setBeforeDepartmentName] = useState(null);
  const [count, setCount] = useState(0);
  const [deleteTrigered, setDeleteTrigered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noPermission, setNoPermission] = useState(false);
  const [searchText, setSearchText] = useState("");

  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "Human Resource")
    : null;
  const DepartmentSubMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find((subMenu) => subMenu.name === "Department")
    : null;
  const DepartmentPermissions = DepartmentSubMenu?.permission || [];

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    console.log("page number", page + 1);
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/department?page_number=${
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
          setDepartmentData(responseData);
          setCount(responseData.pagination.count);
          setDeleteTrigered(false);
          setIsLoading(false);
          resetDepartmentSaved();
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
  }, [deleteTrigered, page, rowsPerPage, editingRow, isDepartmentSaved]);

  const rows = DepartmentData?.data.map((item, index) => {
    const permissions = DepartmentPermissions || [];
    const currentIndex = page * rowsPerPage + index + 1;

    return createData(
      currentIndex.toString(),
      item.id,
      item.name || "N/A",
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

        if (orderBy === "departmentname") {
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

  const handleDelete = (id, deletedDepartmentName) => {
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert <b>${deletedDepartmentName}!</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(
            `${process.env.NEXT_PUBLIC_HOST}/staff/api/department/delete/${id}`,
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
                const filterdData = DepartmentData.data.filter(
                  (Department) => Department.id !== id
                );
                setDepartmentData({ ...DepartmentData, data: filterdData });
                setDeleteTrigered(true);
                swalWithMuiButtons.fire(
                  "Deleted!",
                  `Department <b>${deletedDepartmentName}</b> has been deleted.`,
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

  const handleEdit = (rowids, DepartmentName) => {
    setEditingRow(rowids);
    setEditedDepartmentName(DepartmentName);
    setBeforeDepartmentName(DepartmentName);
  };

  const handleSave = (rowids) => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/department/detail/${rowids}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editedDepartmentName }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.code == 200) {
          const updatedData = DepartmentData.data.map((item) => {
            if (item.id === rowids) {
              return { ...item, Departmentname: editedDepartmentName };
            }
            return item;
          });
          setDepartmentData({ ...DepartmentData, data: updatedData });
          setEditingRow(null);
          setEditedDepartmentName("");
          router.refresh();
          toast.success(
            `Successfully Department ${beforeDepartmentName} to ${editedDepartmentName} Updated`,
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
          toast.error(`Department ${editedDepartmentName} already exits`, {
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
    setEditedDepartmentName("");
  };

  const filteredRows = (sortedRows || []).filter((row) => {
    return row.Departmentname.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : noPermission ? (
        <h1>you have no permission to view</h1>
      ) : DepartmentData ? (
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
                          {column.id === "Departmentname" &&
                          editingRow === row.ids ? (
                            <TextField
                              width="200px"
                              size="small"
                              value={editedDepartmentName}
                              onChange={(e) =>
                                setEditedDepartmentName(e.target.value)
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
                                      onClick={() =>
                                        handleEdit(row.ids, row.Departmentname)
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
                                          row.Departmentname
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

export default DepartmentTable;
