"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Select,
  TableSortLabel,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { TextField, InputAdornment, Backdrop } from "@mui/material";
import Icon from "../../../icon/page";
import { useRouter } from "next/navigation";
import { useSubjectContext } from "./SubjectContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useOnlyIcon } from "../../../Layout/NavContext";
import Image from "next/image";
const MySwal = withReactContent(Swal);
import { UseTableStyledComponent } from "../../../utility/TableTheme/UseTableStyledComponent";
import SubjectModal from "./SubjectModal";
import { Icon as PdfIcon } from "@iconify/react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 0,
};
const blurBackdrop = {
  backdropFilter: "blur(1px)",
  backgroundColor: "transparent",
  zIndex: 500,
  "& .MuiModal-backdrop": {
    backgroundColor: "transparent",
  },
};

const IconDesign = {
  fontSize: 40,
  marginBottom: 3,
  color: "#786CF1",
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
  { id: "subjectcode", label: "Subject Code", align: "center", sortable: true },
  { id: "subject", label: "Subject", align: "center", sortable: true },
  {
    id: "section",
    label: "Section",
    align: "center",
    sortable: true,
  },
  {
    id: "session",
    label: "Session",
    align: "center",
    sortable: true,
  },
  {
    id: "version",
    label: "Version",
    align: "center",
  },
  {
    id: "thumbail",
    label: "Thumbail",
    align: "center",
  },
  {
    id: "book_file",
    label: "Book File",
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
  classname,
  classnameId,
  subjectcode,
  subject,
  subjectId,
  section,
  sectionId,
  session,
  sessionId,
  version,
  versionId,
  thumbail,
  book_file,
  permissions,
  action
) {
  return {
    serial,
    ids,
    classname,
    classnameId,
    subjectcode,
    subject,
    subjectId,
    section,
    sectionId,
    session,
    sessionId,
    version,
    versionId,
    thumbail,
    book_file,
    permissions,
    action,
  };
}

const SubjectTable = ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;

  const { isSubjectSaved, resetSubjectSaved } = useSubjectContext();
  const router = useRouter();
  const [classSubjectData, setClassSubjectData] = useState(null);
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
  const [subjectData, setSubjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noPermission, setNoPermission] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { navData, palette, color, colorX, colorY } = useOnlyIcon();
  const [editRowData, setEditRowData] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [modalImgOpen, setModalImgOpen] = React.useState(false);
  const handleModalImgOpen = () => setModalImgOpen(true);
  const handleModalImgClose = () => setModalImgOpen(false);
  const [pdfView, setPdfView] = useState(null);
  const [pdfFile, setPdfFile] = useState("");

  const handlePdfOpen = (pdf) => {
    console.log("pdf", pdf.book_file);
    setPdfView(pdf.book_file);
  };

  const handleThumbnailClick = (thumbail) => {
    // Toggle the state when clicking on the thumbnail
    setEnlargedImage(thumbail);
  };

  // Extracting permissions for the "Version" submenu
  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "Academic")
    : null;
  const versionSubMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find((subMenu) => subMenu.name === "Class Subject")
    : null;
  const versionPermissions = versionSubMenu?.permission || [];

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-subject?page_number=${
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
          setClassSubjectData(responseData);
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
  };
  const rows = classSubjectData?.data.map((item, index) => {
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
    const permissions = versionPermissions || [];
    const currentIndex = page * rowsPerPage + index + 1;

    return createData(
      currentIndex.toString(),
      item.id,
      item.class_name?.name,
      item.class_name?.id,
      item?.code,
      item.subject?.name,
      item.subject?.id,
      item.section?.section,
      item.section?.id,
      item.session?.session,
      item.session?.id,
      item.version?.version,
      item.version?.id,
      item.image,
      item.book_file || "",
      // formattedDateTimeString,
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

  const handleDelete = (id, deletedSessionName) => {
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert <b>${deletedSessionName}!</b>`,
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
            `Subject <b>${deletedSessionName}</b> has been deleted.`,
            "success"
          );

          fetch(
            `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-subject/delete/${id}`,
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
                const filterdData = classSubjectData.data.filter(
                  (subject) => subject.id !== id
                );
                setClassSubjectData({ ...classSubjectData, data: filterdData });
                setDeleteTrigered(true);
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

  const handleEdit = (rowids, subjectName, subjectCode, subjectType) => {
    setEditingRow(rowids);
    setEditedSubjectName(subjectName);
    setBeforeSubjectName(subjectName);
    setEditedSubjectCode(subjectCode);
    setBeforeSubjectCode(subjectCode);
    setEditedSubjectType(subjectType);
    setBeforeSubjectType(subjectType);
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedSubjectName("");
  };

  const filteredRows = (sortedRows || []).filter((row) => {
    return (
      row.classname.toLowerCase().includes(searchText.toLowerCase()) ||
      row.section.toLowerCase().includes(searchText.toLowerCase()) ||
      row.session.toLowerCase().includes(searchText.toLowerCase()) ||
      row.version.toLowerCase().includes(searchText.toLowerCase())
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
      ) : classSubjectData ? (
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
                      {console.log("row", row)}
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
                          ) : column.id === "thumbail" ? (
                            <Box>
                              <Box
                                onClick={() => {
                                  handleThumbnailClick(row.thumbail),
                                    handleModalImgOpen(open);
                                }}
                                style={{
                                  cursor: "pointer",
                                  transition: "transform 0.8s ease-in-out",
                                }}
                              >
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
                              {enlargedImage && (
                                <Modal
                                  open={modalImgOpen}
                                  onClose={handleModalImgClose}
                                  className={blurBackdrop}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    style={{
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      width: "auto", // Set your desired width
                                      height: "auto", // Set your desired height
                                      backgroundColor: "#fff", // Set your desired background color
                                      // boxShadow: 24,
                                      p: 4,
                                    }}
                                  >
                                    <img
                                      src={enlargedImage}
                                      alt="Enlarged Thumbnail"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </Box>
                                </Modal>
                              )}
                            </Box>
                          ) : column.id === "book_file" ? (
                            row.book_file && (
                              <Box>
                                <PdfIcon
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    maxWidth: "200px",
                                    maxHeight: "200px",
                                    marginTop: "10px",
                                    cursor: "pointer",
                                  }}
                                  className={IconDesign}
                                  icon="bi:filetype-pdf"
                                  onClick={() => {
                                    fetch(row.book_file)
                                      .then((response) => {
                                        return response.blob();
                                      })
                                      .then((pdfBlob) => {
                                        var blobUrl =
                                          URL.createObjectURL(pdfBlob);
                                        setPdfFile(blobUrl);
                                        handlePdfOpen(row);
                                        handleModalOpen(open);
                                      })
                                      .catch(() => {});
                                  }}
                                />
                                <Modal
                                  sx={{
                                    "& .MuiBox-root": {
                                      // boxShadow:
                                      //   " rgba(14, 30, 37, 0.) 0px 2px 4px 0px, rgba(14, 30, 37, 0.5) 0px 2px 16px 0px",
                                      boxShadow:
                                        "rgba(0, 0, 0, 0.10) 3px 5px 6px",
                                    },
                                  }}
                                  open={modalOpen}
                                  onClose={handleModalClose}
                                  className={blurBackdrop}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style}>
                                    <Box
                                      style={{
                                        // border:
                                        //   "1px solid rgba(0, 0, 0, 0.3)",
                                        height: "750px",
                                      }}
                                    >
                                      {pdfFile && (
                                        <iframe
                                          src={`${pdfFile}`}
                                          width="520px"
                                          height="740px"
                                        ></iframe>
                                      )}
                                    </Box>
                                    <Grid
                                      item
                                      // sm={6}
                                      xs={12}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        mt: "10px",
                                      }}
                                    >
                                      <Button
                                        variant="contained"
                                        size="small"
                                        onClick={handleModalClose}
                                        color="error"
                                        sx={{
                                          mt: "10px",
                                          padding: "5px 30px",
                                          fontWeight: "700",
                                        }}
                                      >
                                        Close
                                      </Button>
                                    </Grid>
                                  </Box>
                                </Modal>
                              </Box>
                            )
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
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Box sx={style}>
                                      <SubjectModal
                                        handleClose={handleClose}
                                        editRowData={editRowData}
                                        accessToken={accessToken}
                                        // sectionData={sectionData}
                                      />
                                    </Box>
                                  </Modal>

                                  <span className="text-pink-300">|</span>
                                  {row.permissions &&
                                  row.permissions.includes("delete") ? (
                                    <IconButton
                                      sx={{ color: "#ff2929" }}
                                      onClick={(e) =>
                                        handleDelete(row.ids, row.subject)
                                      }
                                    >
                                      <Icon
                                        // className="text-rose-700"
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
