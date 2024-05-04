import { Box, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useOnlyIcon } from "../../../../../Layout/NavContext";
import TableCell from "@mui/material/TableCell";
import { UseTableStyledComponent } from "../../../../../utility/TableTheme/UseTableStyledComponent";

const columns = [
  {
    id: "examination",
    label: "examination",
    align: "center",
  },
  // { id: "ids", label: "ID", align: "center" },
  { id: "institute", label: "institute", align: "center", sortable: true },
  { id: "board", label: "Board", align: "center", sortable: true },
  { id: "startdate", label: "Start Date", align: "center", sortable: true },
  { id: "enddate", label: "End Date", align: "center", sortable: true },
  { id: "passingyear", label: "Passing Year", align: "center", sortable: true },

  {
    id: "result",
    label: "Result",
    align: "center",
  },
];
function createData(
  examination,
  institute,
  board,
  startdate,
  enddate,
  passingyear,
  result
) {
  return {
    examination,
    institute,
    board,
    startdate,
    enddate,
    passingyear,
    result,
  };
}

const First = ({ PersonalDetails }) => {
  const { staff_education, bank_info, social_media } = PersonalDetails;
  const { palette, color, colorX, colorY } = useOnlyIcon();
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();

  const rows = staff_education
    ?.map((item, index) => {
      const Result = `${item.result} Out of ${item.result_out_of}` || [];

      return createData(
        item.title,
        item.institution_name,
        item.edu_board?.name,
        item.start_date,
        item.end_date,
        item.passing_year,
        Result
      );
    })
    .reverse();

  return (
    <Box
      sx={{
        backgroundColor: palette.customColors.boxBg,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <Scrollbars
        style={{ height: "77vh" }}
        autoHide
        autoHideTimeout={100}
        autoHideDuration={100}
      >
        {/* personal details */}
        <Box sx={{ border: "1px solid #bcbcc34a", p: 1 }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Phone
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.mobile_no}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Emergency Contact Number
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.emergency_number}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Email
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Gender
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.gender?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Date Of Birth
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.dob}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Marital Status
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.marital_status?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Address */}
        <Box sx={{ border: "1px solid #bcbcc34a" }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#EDEBFF" }}>
                <TableRow>
                  <TableCell sx={{ p: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Address Details</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Current Address
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.present_address}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Permanent Address
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.permanent_address}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Education */}

        <TableHead sx={{ backgroundColor: "#EDEBFF", display: "flex" }}>
          <TableRow>
            <TableCell sx={{ p: 1 }}>
              <Typography>Education Details</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <Box sx={{ p: "10px 0px" }}>
          {staff_education.length > 0 ? (
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <StyledTableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      sx={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              <TableBody size="small">
                {rows.map((row) => (
                  <StyledTableRow
                    sx={{
                      "&:hover": {
                        backgroundColor: "#eed3ff",
                      },
                    }}
                    tabIndex={-1}
                    key={row.ids}
                  >
                    {columns.map((column) => (
                      <StyledTableCell key={column.id} align={column.align}>
                        {row[column.id]}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography sx={{ textAlign: "center" }}>Empty</Typography>
          )}
        </Box>

        {/* Bank INfo */}
        <Box sx={{ border: "1px solid #bcbcc34a" }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#EDEBFF" }}>
                <TableRow>
                  <TableCell sx={{ p: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Bank Account Details</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bank_info.length > 0 ? (
                  bank_info.map((bank, i) => (
                    <>
                      {/* <Typography>Bank {i + 1}</Typography> */}
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Bank Name
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {bank.bank_name.name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Account Title
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {bank?.account_title}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Account Number
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {bank?.account_number}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Branch Name
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {bank?.branch_name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                ) : (
                  <Typography sx={{ textAlign: "center" }}>Empty</Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Social INfo */}
        <Box sx={{ border: "1px solid #bcbcc34a" }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#EDEBFF" }}>
                <TableRow>
                  <TableCell sx={{ p: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Social Media Link</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {social_media.length > 0 ? (
                  social_media.map((social, i) => (
                    <>
                      <Typography sx={{ textAlign: "center" }}>
                        {social?.name}
                      </Typography>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Username
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {social?.username}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                URL
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Link href={social?.url}>{social?.url}</Link>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                ) : (
                  <Typography sx={{ textAlign: "center" }}>Empty</Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Scrollbars>
    </Box>
  );
};

export default First;
