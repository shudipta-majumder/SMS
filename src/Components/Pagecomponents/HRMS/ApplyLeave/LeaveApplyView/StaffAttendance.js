"use client";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import Icon from "../../../../icon/page";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Link from "next/link";
import { useOnlyIcon } from "@/Components/Layout/NavContext";
import Tooltip from "@mui/material/Tooltip";
import { UseTableStyledComponent } from "../../../../utility/TableTheme/UseTableStyledComponent";

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
  const { color, colorX, palette } = useOnlyIcon();
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();

  const statusStyle = {
    Submitted: {
      color: "white",
    },
    Approved: {
      color: "white",
    },
    Rejected: {
      color: "white",
    },
  };

  const statusStylebg = {
    Submitted: {
      backgroundColor: "#009cf8",
    },
    Approved: {
      backgroundColor: "#4fc05c",
    },
    Rejected: {
      backgroundColor: "#f62d51",
    },
  };

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
          <Link href="/human-resource/apply-leave/create">
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
              Apply Leave
            </Button>
          </Link>
        </Box>
        {/* <Divider /> */}

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
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.id === "action" ? (
                              <>
                                {
                                  <>
                                    {
                                      <Tooltip title="View">
                                        <IconButton>
                                          <Link
                                            href={`/human-resource/apply-leave/view?q=${row.ids}`}
                                          >
                                            <Icon
                                              className="text-[#8E84F3]"
                                              icon="carbon:order-details"
                                            />
                                          </Link>
                                        </IconButton>
                                      </Tooltip>
                                    }
                                    <span className="text-pink-300">|</span>
                                    {row.permissions &&
                                    row.permissions.includes("update") ? (
                                      <Tooltip title="Update">
                                        <IconButton>
                                          <Link
                                            href={`/human-resource/apply-leave/update?q=${row.ids}`}
                                          >
                                            <Icon
                                              className="text-[#8E84F3]"
                                              icon="ep:edit"
                                            />
                                          </Link>
                                        </IconButton>
                                      </Tooltip>
                                    ) : (
                                      ""
                                    )}

                                    <span className="text-pink-300">|</span>

                                    {row.permissions &&
                                    row.permissions.includes("delete") ? (
                                      <Tooltip title="Delete">
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
                                      </Tooltip>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                }
                              </>
                            ) : column.id === "approvalstatus" ? (
                              <Box
                                sx={{ borderRadius: "5px", padding: "1px" }}
                                style={statusStylebg[row[column.id]]}
                              >
                                <Box style={statusStyle[row[column.id]]}>
                                  {row[column.id]}
                                </Box>
                              </Box>
                            ) : (
                              row[column.id]
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
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default StaffAttendance;
