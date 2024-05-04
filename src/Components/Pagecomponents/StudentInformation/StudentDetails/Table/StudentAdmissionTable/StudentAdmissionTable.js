"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { Box, TableSortLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { TextField, InputAdornment } from "@mui/material";
import Icon from "../../../../../icon/page";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from "next/link";
const MySwal = withReactContent(Swal);
import Avatar from "@mui/material/Avatar";
import { useOnlyIcon } from "@/Components/Layout/NavContext";
import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import { UseTableStyledComponent } from "../../../../../utility/TableTheme/UseTableStyledComponent";

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
  { id: "identity", label: "Identity", align: "left" },
  { id: "stdInfo", label: "Student Information", align: "left" },
  { id: "grdInfo", label: "Guardian Information", align: "left" },
  { id: "action", label: "Action", align: "center" },
];

function createData(
  serial,
  // ids,
  photo,
  admno,
  roll,
  classname,
  sectionname,
  stdname,
  gdname,
  gdPhone,
  gdRelation,
  gender,
  bloodGroup,
  dob,
  mobileno,
  stdid,
  stAddress,
  stAttendanceDate,
  stAttendanceType,
  // photo,
  permissions,
  action
) {
  return {
    serial,
    // ids,
    photo,
    admno,
    roll,
    classname,
    sectionname,
    stdname,
    gdname,
    gdPhone,
    gdRelation,
    gender,
    bloodGroup,
    dob,
    mobileno,
    stdid,
    stAddress,
    stAttendanceDate,
    stAttendanceType,
    // photo,
    permissions,
    action,
  };
}

const StudentAdmissionTable = ({ session }) => {
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();
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
  const { palette, color, colorX, colorY } = useOnlyIcon();
  const [menuData, setMenuData] = useState([]);
  const [singleStudentId, setSingleStudentId] = useState();

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

  const accessToken = session?.user?.data?.token?.access;
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/student/api/student?page_number=${
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
  }, [deleteTrigered, page, rowsPerPage, editingRow]);

  const rows = StudentData?.data.map((item, index) => {
    const permissions = StudentPermissions || [];
    const currentIndex = page * rowsPerPage + index + 1;

    let capitalizeFirstWordFirstName = item.first_name;
    let capitalizeFirstWordFLastName = item.last_name;

    let guardianFirstName = item?.guardians[0]?.first_name;
    let guardianLastName = item?.guardians[0]?.last_name;

    function capitalizeEveryFirstWord(inputString) {
      return inputString.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    const stdFullName = `${capitalizeFirstWordFirstName} ${capitalizeFirstWordFLastName}`;
    const grdFullName = `${guardianFirstName} ${guardianLastName}`;

    const studentFullName = capitalizeEveryFirstWord(stdFullName);
    const guardianFullName = capitalizeEveryFirstWord(grdFullName);

    return createData(
      currentIndex.toString(),
      item.photo,
      item.student_no,
      item?.enroll[0]?.roll,
      item?.enroll[0]?.class_name?.name,
      item?.enroll[0]?.section?.section,
      // item.staff_id,
      studentFullName || "N/A",
      guardianFullName,
      item?.guardians[0]?.mobile_no,
      item?.guardians[0]?.relation?.name,
      item.gender.name,
      item.blood_group.name,
      dayjs(item.dob).format("DD/MM/YYYY"),
      item.mobile_no || "N/A",
      item.id,
      item.present_address,
      item?.std_atten_daily[0]?.attn_date,
      item?.std_atten_daily[0]?.attn_type?.name,
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

  const handleDelete = (id) => {
    console.log("function delete id", id);
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert <b>!</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const accessToken = session?.user?.data?.token?.access;
          fetch(
            `${process.env.NEXT_PUBLIC_HOST}/student/api/student/detail/${id}`,
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
                  `Student <b></b> has been deleted.`,
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

  let currentDate = new Date().toJSON().slice(0, 10);
  console.log("currentDate", currentDate);

  // const filteredRows = (sortedRows || []).filter((row) => {
  //   return row.firstname.toLowerCase().includes(searchText.toLowerCase());
  // });

  console.log("student data", StudentData);
  console.log("all data", rows);

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
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                ml: "30px",
                padding: "8px 0px",
                color: palette.text.secondary,
              }}
            >
              Student Details
            </Typography>
          </Box>
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
                  color="secondary"
                  sx={{
                    backgroundColor: palette.search.bg,
                    "& input::placeholder": {
                      fontSize: "13px",
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
                        <IconButton edge="end" sx={{ color: "#7367f0" }}>
                          <Icon icon="ion:search-outline" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Table
                stickyHeader
                aria-label="sticky table"
                size="small"
                sx={{ borderSpacing: "0px 8px" }}
              >
                <TableHead>
                  <StyledTableRow>
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          minWidth: column.minWidth,
                          fontWeight: "600",
                        }}
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
                  {rows.map((row, index) => (
                    <StyledTableRow
                      sx={{
                        "&:hover": {
                          backgroundColor: palette.table.rowhover,
                        },
                        "&:hover .MuiTableCell-root": {
                          borderRightColor: "#fff",
                        },
                        boxShadow:
                          "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
                      }}
                      tabIndex={-1}
                      key={row.ids}
                    >
                      {console.log("row at date", row.stAttendanceDate)}
                      {console.log("row at type", row.stAttendanceType)}
                      {/* {columns.map((column) => ( */}
                      <StyledTableCell
                        style={{
                          textAlign: "center",
                        }}
                        sx={{
                          border: "1px solid #ddd",
                          "&:hover": {
                            borderRadius: "1px solid #fff",
                          },
                        }}
                      >
                        {row.serial}
                      </StyledTableCell>
                      {/* identity */}
                      <StyledTableCell
                        style={{ textAlign: "center" }}
                        sx={{
                          border: "1px solid #ddd",
                        }}
                      >
                        <Box sx={{ display: "flex", padding: "3px" }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              alt="profile image"
                              src={row.photo}
                              sx={{
                                width: 60,
                                height: 70,
                                borderRadius: "0",
                              }}
                            />
                            <Typography
                              sx={{
                                textAlign: "left",
                                marginTop: "5px",
                                fontWeight: "bold",
                                fontSize: "0.875rem",
                              }}
                              variant="subtitle1"
                            >
                              Roll No: {row.roll}
                            </Typography>
                          </Box>
                          {/* attendance status */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              // justifyContent: "space-between",
                              gap: "0.313rem",
                              marginLeft: "20px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                width: "1.375rem",
                                height: "1.375rem",
                                fontSize: "0.813rem",
                                fontWeight: "600",
                                textAlign: "center",
                                borderRadius: "50%",
                                color: `${
                                  row.stAttendanceDate === currentDate &&
                                  row.stAttendanceType === "Present"
                                    ? "#FCFCFD"
                                    : "#101828"
                                }`,
                                background: `${
                                  row.stAttendanceDate === currentDate &&
                                  row.stAttendanceType === "Present"
                                    ? "#25b7b1"
                                    : "#bbb"
                                }`,
                              }}
                            >
                              P
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                width: "1.375rem",
                                height: "1.375rem",
                                fontSize: "0.813rem",
                                fontWeight: "600",
                                textAlign: "center",
                                borderRadius: "50%",
                                color: `${
                                  row.stAttendanceDate === currentDate &&
                                  row.stAttendanceType === "Late"
                                    ? "#FCFCFD"
                                    : "#101828"
                                }`,
                                background: `${
                                  row.stAttendanceDate === currentDate &&
                                  row.stAttendanceType === "Late"
                                    ? "#fbbc04"
                                    : "#bbb"
                                }`,
                              }}
                            >
                              L
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                width: "1.375rem",
                                height: "1.375rem",
                                fontSize: "0.813rem",
                                fontWeight: "600",
                                textAlign: "center",
                                borderRadius: "50%",
                                color: `${
                                  row.stAttendanceDate === currentDate &&
                                  row.stAttendanceType === "Absent"
                                    ? "#FCFCFD"
                                    : "#101828"
                                }`,
                                background: `${
                                  row.stAttendanceDate === currentDate &&
                                  row.stAttendanceType === "Absent"
                                    ? "#e63946"
                                    : "#bbb"
                                }`,
                              }}
                            >
                              A
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                width: "1.375rem",
                                height: "1.375rem",
                                fontSize: "0.813rem",
                                fontWeight: "600",
                                textAlign: "center",
                                borderRadius: "50%",
                                color: `${
                                  row.stAttendanceDate === currentDate &&
                                  row.stAttendanceType === "Weekend"
                                    ? "#FCFCFD"
                                    : "#101828"
                                }`,
                                background: `${
                                  row.stAttendanceDate === currentDate &&
                                  row.stAttendanceType === "Weekend"
                                    ? "#175CD3"
                                    : "#bbb"
                                }`,
                              }}
                            >
                              W
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            flex: "row",
                            flexDirection: "column",
                            borderRight: "1px solid black",
                          }}
                        />
                      </StyledTableCell>
                      {/* student info */}
                      <StyledTableCell
                        sx={{
                          border: "1px solid #ddd",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "3px",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
                          >
                            {row.stdname}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontSize: "0.813rem" }}
                          >
                            Class: {row.classname}({row.sectionname})
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontSize: "0.813rem" }}
                          >
                            Admission No: {row.admno}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontSize: "0.813rem" }}
                          >
                            Date of Birth: {row.dob}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontSize: "0.813rem" }}
                          >
                            Blood Group: {row.bloodGroup}
                          </Typography>
                        </Box>
                      </StyledTableCell>
                      {/* guardian info */}
                      <StyledTableCell
                        style={{ textAlign: "left" }}
                        sx={{ border: "1px solid #ddd" }}
                      >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontSize: "0.875rem" }}
                          >
                            Guardian Name: {row.gdname}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontSize: "0.813rem" }}
                          >
                            Phone: {row.gdPhone}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontSize: "0.813rem" }}
                          >
                            Relation: {row.gdRelation}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontSize: "0.813rem" }}
                          >
                            Current Address: {row.stAddress}
                          </Typography>
                        </Box>
                      </StyledTableCell>
                      {/* actions */}
                      <StyledTableCell
                        style={{ textAlign: "center" }}
                        sx={{ border: "1px solid #ddd" }}
                      >
                        {row.action}
                        <>
                          <Tooltip title="View">
                            <Link
                              href={`/student-info/student-details/view?id=${row.stdid}`}
                            >
                              <IconButton>
                                <Icon
                                  className="text-[#8E84F3]"
                                  icon="carbon:order-details"
                                />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <span className="text-pink-300">|</span>
                          <Tooltip title="Update">
                            <Link
                              href={`/student-info/student-details/update?id=${row.stdid}`}
                            >
                              <IconButton
                                onClick={() => setSingleStudentId(row.stdid)}
                              >
                                <Icon
                                  className="text-[#8E84F3]"
                                  icon="ep:edit"
                                />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <span className="text-pink-300">|</span>
                          <Tooltip title="Delete">
                            <IconButton>
                              <Icon
                                className="text-rose-700"
                                icon="uiw:delete"
                              />
                            </IconButton>
                          </Tooltip>
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
          </Box>
        </>
      ) : null}
    </>
  );
};

export default StudentAdmissionTable;
