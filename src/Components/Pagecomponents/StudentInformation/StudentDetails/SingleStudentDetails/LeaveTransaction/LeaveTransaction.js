import { Box, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Scrollbars } from "react-custom-scrollbars-2";
import { v4 as uuidv4 } from "uuid";
import { useOnlyIcon } from "../../../../../Layout/NavContext";
import { UseTableStyledComponent } from "../../../../../utility/TableTheme/UseTableStyledComponent";

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
    id: "code",
    label: "Code",
    align: "center",
  },
  { id: "start_date", label: "Start Date", align: "center" },
  { id: "end_date", label: "End Date", align: "center" },
  { id: "day_count", label: "Day Count", align: "center" },
  { id: "application_date", label: "Out Time", align: "center" },
  {
    id: "app_status",
    label: "Status",
    align: "center",
  },
];

function createData(
  serial,
  code,
  start_date,
  end_date,
  day_count,
  application_date,
  app_status
) {
  return {
    serial,
    code,
    start_date,
    end_date,
    day_count,
    application_date,
    app_status,
  };
}

const LeaveTransaction = ({ leave }) => {
    const {color, colorX, palette } = useOnlyIcon();
  const { StyledTableCell, StyledTableRow } = UseTableStyledComponent();
  dayjs.extend(localizedFormat);
  const rows = leave?.map((item, index) => {
    // const InTime = dayjs(item?.in_time).format("HH:mm:ss");
    // const OutTime = dayjs(item?.out_time).format("HH:mm:ss");
    // const attnType = item?.attn_type?.name || "N/A";
    return createData(
      (index + 1).toString(),
      item?.code || "N/A",
      dayjs(item?.start_date).format("DD/MM/YYYY") || "N/A",
      dayjs(item?.end_date).format("DD/MM/YYYY") || "N/A",
      item?.day_count || "N/A",
      dayjs(item?.application_date).format("lll") || "N/A",
      item?.app_status.title || "N/A"
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
              <StyledTableRow
                tabIndex={-1}
                key={uuidv4()}
              >
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

export default LeaveTransaction;
