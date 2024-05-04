import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import dayjs from "dayjs";
import { Scrollbars } from "react-custom-scrollbars-2";
import { v4 as uuidv4 } from "uuid";
import { UseTableStyledComponent } from "../../../../../utility/TableTheme/UseTableStyledComponent";
import { useOnlyIcon } from "../../../../../Layout/NavContext";

const statusStyle = {
  present: {
    color: "green",
  },
  absent: {
    color: "red",
  },
  late: {
    color: "#e8ae52",
  },
  earlygone: {
    color: "blue",
  },
  weekend: {
    color: "blue",
  },
  holiday: {
    color: "green",
  },
  lateandearlygone: {
    color: "#e8ae52",
  },
  medicalleave: {
    color: "green",
  },
  casualleave: {
    color: "green",
  },
};

const columns = [
  { id: "feestype", label: "Fees Month", align: "center" },
  {
    id: "amount",
    label: "amount",
    align: "center",
  },
  { id: "duedate", label: "Due Date", align: "center" },
  { id: "paystatus", label: "Pay Status", align: "center" },
  { id: "paymentmethod", label: "Payment Method", align: "center" },
];

function createData(
  feestype,
  amount,
  duedate,
  paystatus,
  paymentmethod,
  fixedamount,
  percentage
) {
  return {
    feestype,
    amount,
    duedate,
    paystatus,
    paymentmethod,
    fixedamount,
    percentage,
  };
}

const FeesDetails = ({ fees }) => {
  console.log("fees map", fees);
  const { color, colorX, palette } = useOnlyIcon();
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();
  const rows = fees
    ? fees?.map((item, index) => {
        return createData(
          item?.fees_detail?.fees_type?.name || "",
          item?.fees_detail?.amount || "",
          dayjs(item?.fees_detail?.due_date).format("DD/MM/YYYY") || "",
          item?.pay_status || "",
          item?.pay_method?.name || "",
          item?.fees_detail?.fix_amt,
          item?.fees_detail?.percentage
        );
      })
    : "No fees added yet";

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
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <StyledTableRow>
              {columns?.map((column) => (
                <StyledTableCell
                  key={uuidv4()}
                  align={column?.align}
                  sx={{ minWidth: column?.minWidth }}
                >
                  {column?.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          {/* <TableBody size="small">
            {rows?.map((row) => (
              <StyledTableRow tabIndex={-1} key={uuidv4()}>
                {columns?.map((column) => (
                  <StyledTableCell key={uuidv4()} align={column?.align}>
                    {column.id === "paystatus" ? (
                      <span>{row[column?.id]}</span>
                    ) : (
                      row[column?.id]
                    )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody> */}
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name} sx={{ padding: "30px" }}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.feestype}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* `{row.amount} {row.percentage === null ? "" : row.fixedamount} */}
                  {row.percentage === null
                    ? `${row.amount} + ${row.fixedamount}`
                    : row.fixedamount === null
                    ? `${row.amount} + ${row.percentage} %`
                    : row.amount}
                </StyledTableCell>
                <StyledTableCell align="center">{row.duedate}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.paystatus === true ? (
                    <Typography variant="body1" sx={{ padding: "10px" }}>
                      Paid
                    </Typography>
                  ) : (
                    <Box sx={{ padding: "10px" }}>
                      <Button
                        sx={{
                          backgroundColor: "#ff0000",
                          color: "#fff",
                          height: "25px",
                          "&:hover": {
                            backgroundColor: "#b71c1c",
                            color: "#fff",
                          },
                        }}
                      >
                        Pay Now
                      </Button>
                    </Box>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.paymentmethod}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbars>
    </Box>
  );
};

export default FeesDetails;
