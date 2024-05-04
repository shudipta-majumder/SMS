"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { UseTableStyledComponent } from "../../../../utility/TableTheme/UseTableStyledComponent";

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
  Pagination,
  TableSortLabel,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from "next/link";
const MySwal = withReactContent(Swal);
import { LuPlus } from "react-icons/lu";
import { useOnlyIcon } from "@/Components/Layout/NavContext";
import { Icon as PdfIcon } from "@iconify/react";
import StudentLeaveApplicationCreate from "./StudentLeaveApplicationCreate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 4,
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

const BasicDesign = {
  blurBackdrop: {
    backdropFilter: "blur(1px)",
    backgroundColor: "transparent",
    zIndex: 500,
    "& .MuiModal-backdrop": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    fontSize: 40,
    marginBottom: 3,
    color: "#786CF1",
  },
};

const columns = [
  { id: "serial", label: "SL", align: "center" },
  // { id: "ids", label: "ID", align: "center" },
  { id: "code", label: "Code", align: "center" },
  { id: "startDate", label: "Start Date", align: "center" },
  { id: "endDate", label: "End Date", align: "center", sortable: true },
  { id: "dayCount", label: "Day Count", align: "center", sortable: true },
  {
    id: "reasonForLeave",
    label: "Reason for Leave",
    align: "center",
    sortable: true,
  },
  {
    id: "responsible",
    label: "Responsible Teacher",
    align: "center",
    sortable: true,
  },
  { id: "document", label: "Document", align: "center", sortable: true },
  { id: "action", label: "Actions", align: "center", sortable: true },
];

function createData(
  serial,
  // ids,
  code,
  startDate,
  endDate,
  dayCount,
  reasonForLeave,
  responsible,
  document,
  id,
  action
) {
  return {
    serial,
    // ids,
    code,
    startDate,
    endDate,
    dayCount,
    reasonForLeave,
    responsible,
    document,
    id,
    action,
  };
}

const dayjs = require("dayjs");

const StudentLeaveApplicationTable = ({ session, classTeacherWiseStudent }) => {
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();
  const router = useRouter();
  const [StudentData, setStudentData] = useState(null);
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
  // const { navData } = useOnlyIcon();
  const [menuData, setMenuData] = useState([]);
  const [singleTypeId, setSingleTypeId] = useState();
  const { navData, color, colorX, palette } = useOnlyIcon();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addFeeTypes, setAddFeeTypes] = useState();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const [pdfFile, setPdfFile] = useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [pdfView, setPdfView] = useState(null);

  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "HRMS")
    : null;
  const StudentAdmissionMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find(
        (subMenu) => subMenu.name === "Student Admission"
      )
    : null;
  const StudentPermissions = StudentAdmissionMenu?.permission || [];

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlePdfOpen = (pdf) => {
    console.log("pdf", pdf.document);
    setPdfView(pdf.document);
  };

  const accessToken = session?.user?.data?.token?.access;

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/student/api/leave/list?page_number=${
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
          setStudentData(responseData);
          setCount(responseData.pagination.count);
          setDeleteTrigered(false);
          setIsLoading(false);
          // resetStaffSaved();
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
  }, [deleteTrigered, page, rowsPerPage, editingRow, addFeeTypes]);

  //   useEffect(() => {}, []);

  const rows = StudentData?.data.map((item, index) => {
    const permissions = StudentPermissions || [];

    const currentIndex = page * rowsPerPage + index + 1;

    return createData(
      currentIndex.toString(),
      // item.staff_id,
      item.code || "",
      dayjs(item.start_date).format("DD/MM/YYYY") || "",
      dayjs(item.end_date).format("DD/MM/YYYY") || "",
      item.day_count || "",
      item.reason_for_leave || "",
      `${item.responsible.first_name} ${item.responsible.last_name}` || "",
      item.document || "",
      item.id,
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

  const handleDelete = (id, deletedFeesTypeName) => {
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert <b>${deletedFeesTypeName}!</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const accessToken = Cookies.get("accessToken");
          fetch(
            `${process.env.NEXT_PUBLIC_HOST}/fees/api/fees-discount/delete/${id}`,
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
                const filterdData = StudentData.data.filter(
                  (Staff) => Staff.id !== id
                );
                setStudentData({ ...StudentData, data: filterdData });
                setDeleteTrigered(true);
                swalWithMuiButtons.fire(
                  "Deleted!",
                  `Fees Type <b>${deletedFeesTypeName}</b> has been deleted.`,
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

  // console.log("student data", StudentData);
  // console.log("all data", rows);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : noPermission ? (
        <h1>you have no permission to view</h1>
      ) : StudentData ? (
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
              <Box
                sx={{
                  ml: "20px",
                  mb: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
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
                <Button
                  startIcon={<LuPlus />}
                  variant="contained"
                  size="small"
                  type="submit"
                  sx={{
                    background: `${`linear-gradient(45deg, ${color} 30%, ${colorX} 90%)`}`,
                    ":hover": {
                      bgcolor: "#796EF1",
                    },
                    padding: "5px 30px",
                    fontWeight: "700",
                  }}
                  onClick={handleAddModalOpen}
                >
                  Apply Leave
                </Button>
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
                  {rows.map((row) => (
                    <StyledTableRow
                      tabIndex={-1}
                      key={row.id}
                    >
                      {/* {console.log("row", row.id)} */}
                      {/* {columns.map((column) => ( */}
                      <StyledTableCell style={{ textAlign: "center" }}>
                        {row.serial}
                      </StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        {row.code}
                      </StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        {row.startDate}
                      </StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        {row.endDate}
                      </StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        {row.dayCount}
                      </StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        {row.reasonForLeave}
                      </StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        {row.responsible}
                      </StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        {row.document && (
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
                              className={BasicDesign.icon}
                              icon="pepicons-pencil:file"
                              onClick={() => {
                                fetch(row.document)
                                  .then((response) => {
                                    return response.blob();
                                  })
                                  .then((pdfBlob) => {
                                    var blobUrl = URL.createObjectURL(pdfBlob);
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
                                  boxShadow: "rgba(0, 0, 0, 0.10) 3px 5px 6px",
                                },
                              }}
                              open={modalOpen}
                              onClose={handleModalClose}
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
                        )}

                        {/* {row.document} */}
                      </StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        {row.action}
                        <>
                          <IconButton
                            onClick={() => {
                              // setSingleTypeId(row.id);
                              handleOpen();
                              setEditingRow(row);
                            }}
                          >
                            <Icon className="text-[#8E84F3]" icon="ep:edit" />
                          </IconButton>

                          <span className="text-pink-300">|</span>
                          <IconButton>
                            <Icon
                              className="text-rose-700"
                              icon="uiw:delete"
                              onClick={() => handleDelete(row.id, row.name)}
                            />
                          </IconButton>
                        </>
                      </StyledTableCell>
                      {/* ))} */}
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

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {/* <StudentLeaveApplyEdit
                  setAddFeeTypes={setAddFeeTypes}
                  singleTypeId={singleTypeId}
                  addFeeTypes={addFeeTypes}
                  handleClose={handleClose}
                  editingRow={editingRow}
                  session={session}
                /> */}
              </Box>
            </Modal>

            <Modal
              open={addModalOpen}
              onClose={handleAddModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <StudentLeaveApplicationCreate
                  handleAddModalClose={handleAddModalClose}
                  setAddFeeTypes={setAddFeeTypes}
                  session={session}
                  classTeacherWiseStudent={classTeacherWiseStudent}
                />
              </Box>
            </Modal>
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default StudentLeaveApplicationTable;
