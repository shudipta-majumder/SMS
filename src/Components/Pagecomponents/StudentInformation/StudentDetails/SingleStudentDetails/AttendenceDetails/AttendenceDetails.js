import { Box, Typography } from "@mui/material";
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
  { id: "serial", label: "SL", align: "center" },
  {
    id: "shift",
    label: "Shift",
    align: "center",
  },
  { id: "punchdate", label: "Punch Date", align: "center" },
  { id: "punchday", label: "Punch Day", align: "center" },
  // { id: "intime", label: "In Time", align: "center" },
  // { id: "outtime", label: "Out Time", align: "center" },
  // { id: "duration", label: "Duration", align: "center" },
  {
    id: "status",
    label: "Status",
    align: "center",
  },
];

function createData(
  serial,
  shift,
  punchdate,
  punchday,
  // intime,
  // outtime,
  // duration,
  status
) {
  return {
    serial,
    shift,
    punchdate,
    punchday,
    // intime,
    // outtime,
    // duration,
    status,
  };
}

const AttendenceDetails = ({ attendence }) => {
  const { color, colorX, palette } = useOnlyIcon();
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();
  const rows = attendence?.map((item, index) => {
    // const InTime = dayjs(item?.in_time).format("HH:mm:ss");
    // const OutTime = dayjs(item?.out_time).format("HH:mm:ss");
    const attnType = item?.attn_type?.name || "N/A";
    return createData(
      (index + 1).toString(),
      item?.shift?.name || "N/A",
      item?.attn_date || "N/A",
      item?.get_day_name || "N/A",
      // InTime || "N/A",
      // OutTime || "N/A",
      // item?.duration || "N/A",
      attnType
    );
  });

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
          <TableBody size="small">
            {rows?.map((row) => (
              <StyledTableRow tabIndex={-1} key={uuidv4()}>
                {columns?.map((column) => (
                  <StyledTableCell key={uuidv4()} align={column?.align}>
                    {column.id === "status" ? (
                      <span
                        style={
                          statusStyle[
                            row[column?.id].toLowerCase().replace(/\s/g, "")
                          ]
                        }
                      >
                        {row[column?.id]}
                      </span>
                    ) : (
                      row[column?.id]
                    )}
                    {/* {column.id === "status" &&
                      console.log("Status value:", row[column.id])} */}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbars>
    </Box>
  );
};

export default AttendenceDetails;
