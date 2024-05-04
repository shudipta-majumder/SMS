"use client";
// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { Box } from "@mui/material";
import { UseTableStyledComponent } from "../../../../utility/TableTheme/UseTableStyledComponent";
import SearchStudent from "../SearchStudent/SearchStudent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { v4 as uuidv4 } from "uuid";

const columns = [
  { id: "hash", label: "#", align: "center" },
  {
    id: "student_no",
    label: "Admission No",
    align: "left",
  },
  { id: "rollno", label: "Roll No", align: "left" },
  { id: "name", label: "Name", align: "left" },
  { id: "attendance", label: "Attendance", align: "left" },
];

function createData(hash, student_no, rollno, name, attendance, id) {
  return {
    hash,
    student_no,
    rollno,
    name,
    attendance,
    id,
  };
}

const AttendanceTable = ({
  classSectionData,
  accessToken,
  versionData,
  groupFetchingData,
  attendanceTypeFetchingData,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [studentAttendanceSearch, setStudentAttendanceSearch] = useState();
  const [attendanceTypeId, setAttendanceTypeId] = useState(2);
  const [studentIdForAttendance, setStudentIdForAttendance] = useState();
  const { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle } =
    UseTableStyledComponent();
  const rows = studentAttendanceSearch?.data?.map((item, index) => {
    return createData(
      (index + 1).toString(),
      item?.student?.student_no || "N/A",
      `${item?.roll}` || "N/A",
      `${item?.student?.first_name} ${item?.student?.last_name}` || "N/A",
      `${item?.attn_type?.id}` || "N/A",
      item?.id
    );
    // setAttendanceType(item?.attn_type?.id);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAttendanceTypeChange = async (studentAttendanceId, studentId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/student/api/attendance/update/${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            attn_type: studentAttendanceId,
          }),
        }
      );

      // setAttendanceTypeId(studentAttendanceId);
      // setStudentIdForAttendance(studentId);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error updating attendance type:", error);
    }
  };

  return (
    <Box>
      <SearchStudent
        classSectionData={classSectionData}
        versionData={versionData}
        accessToken={accessToken}
        groupFetchingData={groupFetchingData}
        setStudentAttendanceSearch={setStudentAttendanceSearch}
      />

      {studentAttendanceSearch?.data?.length >= 0 ? (
        studentAttendanceSearch ? (
          studentAttendanceSearch?.data?.length >= 0 ? (
            <Box>
              <Table
                stickyHeader
                aria-label="sticky table"
                size="small"
                sx={{
                  marginTop: "2rem",
                }}
              >
                <TableHead>
                  <StyledTableRow>
                    {columns.map((column) => (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.label}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                </TableHead>
                <TableBody size="small">
                  {/* {console.log("row console", rows)} */}
                  {rows.map((row) => {
                    console.log("row attendance", row.attendance);
                    return (
                      <StyledTableRow tabIndex={-1} key={row.ids}>
                        <StyledTableCell style={{ textAlign: "center" }}>
                          {row?.hash}
                        </StyledTableCell>
                        <StyledTableCell style={{ textAlign: "left" }}>
                          {row?.student_no}
                        </StyledTableCell>
                        <StyledTableCell style={{ textAlign: "left" }}>
                          {row?.rollno}
                        </StyledTableCell>
                        <StyledTableCell style={{ textAlign: "left" }}>
                          {row?.name}
                        </StyledTableCell>
                        <StyledTableCell style={{ textAlign: "left" }}>
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              defaultValue={row?.attendance}
                              onChange={(e) =>
                                handleAttendanceTypeChange(
                                  e.target.value,
                                  row?.id
                                )
                              }
                            >
                              {attendanceTypeFetchingData?.data?.map(
                                (attendanceTypeData) => {
                                  return (
                                    <FormControlLabel
                                      key={uuidv4()}
                                      value={attendanceTypeData?.id}
                                      control={<Radio />}
                                      label={attendanceTypeData?.name}
                                    />
                                  );
                                }
                              )}
                            </RadioGroup>
                          </FormControl>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <TablePagination
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          ) : (
            ""
          )
        ) : (
          "Data not Fetch"
        )
      ) : (
        ""
      )}
    </Box>
  );
};

export default AttendanceTable;
