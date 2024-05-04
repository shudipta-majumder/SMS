"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { Box, TableSortLabel } from "@mui/material";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { TextField, InputAdornment, Backdrop } from "@mui/material";
import Icon from "../../../icon/page";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSectionContext } from "./SectionContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SectionModal from "./SectionModal";
const MySwal = withReactContent(Swal);
import { useOnlyIcon } from "../../../Layout/NavContext";
import { UseTableStyledComponent } from "../../../utility/TableTheme/UseTableStyledComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "transparent",
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
  { id: "ids", label: "ID", align: "center" },
  { id: "classname", label: "Class Name", align: "center", sortable: true },
  {
    id: "session",
    label: "Session",
    align: "center",
    sortable: true,
  },
  {
    id: "section",
    label: "Section",
    align: "center",
    sortable: true,
  },
  {
    id: "version",
    label: "Version",
    align: "center",
    sortable: true,
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
  classname,
  classnameId,
  session,
  sessionId,
  section,
  sectionId,
  version,
  versionId,
  permissions,
  action
) {
  return {
    serial,
    ids,
    classname,
    classnameId,
    session,
    sessionId,
    section,
    sectionId,
    version,
    versionId,
    permissions,
    action,
  };
}

const SectionTable = ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;
    const {color, colorX, palette } = useOnlyIcon();
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();
  const { isSectionSaved, resetSectionSaved } = useSectionContext();
  const router = useRouter();
  const [sectionData, setSectionData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [editingRow, setEditingRow] = useState(null);
  const [editedSectionName, setEditedSectionName] = useState("");
  const [beforeSectionName, setBeforeSectionName] = useState(null);
  const [count, setCount] = useState(0);
  const [deleteTrigered, setDeleteTrigered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noPermission, setNoPermission] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editRowData, setEditRowData] = useState(null);

  // Extracting permissions for the "Version" submenu
  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "Academic")
    : null;
  const classsectionSubMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find((subMenu) => subMenu.name === "Class Section")
    : null;
  const classsectionPermissions = classsectionSubMenu?.permission || [];

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-section?page_number=${
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
          setSectionData(responseData);
          setCount(responseData.pagination.count);
          setDeleteTrigered(false);
          setIsLoading(false);
          resetSectionSaved();
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
  }, [deleteTrigered, page, rowsPerPage, editingRow, isSectionSaved]);

  const rows = sectionData?.data.map((item, index) => {
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
    const permissions = classsectionPermissions || [];
    const currentIndex = page * rowsPerPage + index + 1;

    return createData(
      currentIndex.toString(),
      item.id,
      item.class_name?.name,
      item.class_name?.id,
      item.session?.session,
      item.session?.id,
      item.section?.section,
      item.section?.id,
      item.version?.version,
      item.version?.id,
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

        if (orderBy === "Sectionname") {
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

  const handleDelete = (id, deletedClassName) => {
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert <b>${deletedClassName}!</b>`,
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
            `Section <b>${deletedClassName}</b> has been deleted.`,
            "success"
          );

          fetch(
            `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-section/delete/${id}`,
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
                const filterdData = sectionData.data.filter(
                  (Section) => Section.id !== id
                );
                setSectionData({ ...sectionData, data: filterdData });
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

  const handleEdit = (rowids, sectionName) => {
    setEditingRow(rowids);
    setEditedSectionName(sectionName);
    setBeforeSectionName(sectionName);
  };

  const handleSave = (rowids) => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/section/detail/${rowids}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ section: editedSectionName }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.code == 200) {
          const updatedData = sectionData.data.map((item) => {
            if (item.id === rowids) {
              return { ...item, sectionname: editedSectionName };
            }
            return item;
          });
          setSectionData({ ...sectionData, data: updatedData });
          setEditingRow(null);
          setEditedSectionName("");
          router.refresh();
          toast.success(
            `Successfully Section ${beforeSectionName} to ${editedSectionName} Updated`,
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
          toast.error(`Version ${editedSectionName} already exits`, {
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
    setEditedSectionName("");
  };

  const filteredRows = (sortedRows || []).filter((row) => {
    return (
      row.classname.toLowerCase().includes(searchText.toLowerCase()) ||
      row.session.toLowerCase().includes(searchText.toLowerCase()) ||
      row.section.toLowerCase().includes(searchText.toLowerCase())
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
      ) : sectionData ? (
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
                          {column.id === "sectionname" &&
                          editingRow === row.ids ? (
                            <TextField
                              width="200px"
                              size="small"
                              value={editedSectionName}
                              onChange={(e) =>
                                setEditedSectionName(e.target.value)
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
                                        setEditRowData(row);
                                        handleOpen();
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
                                    sx={{ backgroundColor: "transparent" }}
                                  >
                                    <Box sx={style}>
                                      <SectionModal
                                        handleClose={handleClose}
                                        editRowData={editRowData}
                                        accessToken={accessToken}
                                      />
                                    </Box>
                                  </Modal>
                                  <Backdrop
                                    className={blurBackdrop}
                                    open={open}
                                    onClick={handleClose}
                                  />
                                  <span className="text-pink-300">|</span>
                                  {row.permissions &&
                                  row.permissions.includes("delete") ? (
                                    <IconButton
                                      onClick={(e) =>
                                        handleDelete(row.ids, row.classname)
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

export default SectionTable;
