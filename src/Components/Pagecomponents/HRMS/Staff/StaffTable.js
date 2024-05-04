"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { Box, TableSortLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { TextField, InputAdornment, Backdrop } from "@mui/material";
import { useOnlyIcon } from "../../../Layout/NavContext";
import Icon from "../../../icon/page";
import { toast } from "react-toastify";
import { useStaffContext } from "./StaffContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from "next/link";
import Image from "next/image";
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
  {
    id: "thumbail",
    label: "Thumbail",
    align: "center",
  },
  // { id: "ids", label: "ID", align: "center" },
  { id: "staffid", label: "ID", align: "center", sortable: true },
  { id: "name", label: "Name", align: "center", sortable: true },
  { id: "mobileno", label: "Mobile No", align: "center", sortable: true },
  { id: "email", label: "Email", align: "center", sortable: true },
  { id: "department", label: "Department", align: "center", sortable: true },

  {
    id: "action",
    label: "Action",
    align: "center",
  },
];
function createData(
  serial,
  thumbail,
  ids,
  staffid,
  name,
  mobileno,
  email,
  department,
  permissions,
  action
) {
  return {
    serial,
    thumbail,
    ids,
    staffid,
    name,
    mobileno,
    email,
    department,
    permissions,
    action,
  };
}

const StaffTable = ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;
  const { isStaffSaved, resetStaffSaved } = useStaffContext();
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();
  const [StaffData, setStaffData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [editingRow, setEditingRow] = useState(null);
  const [editedStaffName, setEditedStaffName] = useState("");
  const [beforeStaffName, setBeforeStaffName] = useState(null);
  const [count, setCount] = useState(0);
  const [deleteTrigered, setDeleteTrigered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noPermission, setNoPermission] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { palette, color, colorX, colorY } = useOnlyIcon();

  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "Human Resource")
    : null;
  const StaffSubMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find(
        (subMenu) => subMenu.name === "Staff Directory"
      )
    : null;
  const StaffPermissions = StaffSubMenu?.permission || [];

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/list?page_number=${
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
          setStaffData(responseData);
          setCount(responseData.pagination.count);
          setDeleteTrigered(false);
          setIsLoading(false);
          resetStaffSaved();
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
  }, [deleteTrigered, page, rowsPerPage, editingRow, isStaffSaved]);

  const rows = StaffData?.data.map((item, index) => {
    const permissions = StaffPermissions || [];
    const FirstName = item.first_name;
    const LastName = item.last_name;
    const Name = `${FirstName} ${LastName}`;
    const currentIndex = page * rowsPerPage + index + 1;

    return createData(
      currentIndex.toString(),
      item.photo,
      item.id,
      item.staff_id,
      Name,
      item.mobile_no || "N/A",
      item.email || "N/A",
      item.department?.name || "N/A",
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

        if (orderBy === "Staffname") {
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

  const handleDelete = (id, deletedStaffName) => {
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert <b>${deletedStaffName}!</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(
            `${process.env.NEXT_PUBLIC_HOST}/staff/api/Staff/delete/${id}`,
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
                const filterdData = StaffData.data.filter(
                  (Staff) => Staff.id !== id
                );
                setStaffData({ ...StaffData, data: filterdData });
                setDeleteTrigered(true);
                swalWithMuiButtons.fire(
                  "Deleted!",
                  `Staff <b>${deletedStaffName}</b> has been deleted.`,
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

  const filteredRows = (sortedRows || []).filter((row) => {
    return row.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : noPermission ? (
        <h1>you have no permission to view</h1>
      ) : StaffData ? (
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
                          {column.id === "Staffname" &&
                          editingRow === row.ids ? (
                            <TextField
                              width="200px"
                              size="small"
                              value={editedStaffName}
                              onChange={(e) =>
                                setEditedStaffName(e.target.value)
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
                          ) : column.id === "thumbail" ? (
                            <Box>
                              {row.thumbail ? (
                                <Image
                                  src={row.thumbail}
                                  width={50}
                                  height={50}
                                  alt="Thumbnail"
                                />
                              ) : (
                                ""
                              )}
                            </Box>
                          ) : (
                            row[column.id]
                          )}

                          {column.id === "action" && (
                            <>
                              {
                                <IconButton>
                                  <Link
                                    href={`/human-resource/staff-directory/view?q=${row.ids}`}
                                  >
                                    <Icon
                                      className="text-[#8E84F3]"
                                      icon="carbon:order-details"
                                    />
                                  </Link>
                                </IconButton>
                              }
                              <span className="text-pink-300">|</span>
                              {row.permissions &&
                              row.permissions.includes("update") ? (
                                <IconButton>
                                  <Link
                                    href={`/human-resource/staff-directory/update?q=${row.ids}`}
                                  >
                                    <Icon
                                      className="text-[#8E84F3]"
                                      icon="ep:edit"
                                    />
                                  </Link>
                                </IconButton>
                              ) : (
                                ""
                              )}

                              <span className="text-pink-300">|</span>

                              {row.permissions &&
                              row.permissions.includes("delete") ? (
                                <IconButton
                                  onClick={(e) =>
                                    handleDelete(row.ids, row.Staffname)
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

export default StaffTable;
