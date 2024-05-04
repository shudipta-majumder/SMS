"use client";
import { Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Link from "next/link";
import { useOnlyIcon } from "../../../Layout/NavContext";
import { UseTableStyledComponent } from "../../../utility/TableTheme/UseTableStyledComponent";

const StaffAttendance = ({
  isLoading,
  error,
  count,
  employeesTableData,
  page,
  handleChangeRowsPerPage,
  handleChangePage,
  rowsPerPage,
  rows,
  columns,
}) => {
    const {color, colorX, palette } = useOnlyIcon();
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ backgroundColor: palette.customColors.boxBg, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            padding: "0px 30px",
            mb: "10px",
          }}
        >
          <Link href="/human-resource/staff-attendance/create">
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size="small"
              type="submit"
              sx={{
                background: "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
                ":hover": {
                  bgcolor: "#796EF1",
                },
                padding: "5px 30px",
                fontWeight: "700",
              }}
            >
              NEW
            </Button>
          </Link>
        </Box>
        <Divider />

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : employeesTableData ? (
          <Box
            sx={{
              backgroundColor: palette.customColors.boxBg,
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
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
                  {rows &&
                    rows.map((row) => (
                      <StyledTableRow tabIndex={-1} key={row.ids}>
                        {columns.map((column) => (
                          <StyledTableCell
                            style={{ padding: "8px" }}
                            key={column.id}
                            align={column.align}
                          >
                            {row[column.id]}
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
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default StaffAttendance;
