import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useOnlyIcon } from "../../../../../Layout/NavContext";

const GuardianDetails = ({ detail }) => {
    const {color, colorX, palette } = useOnlyIcon();
  return (
    <Box sx={{  backgroundColor: palette.customColors.boxBg, p: 2 }}>
      <Box sx={{ p: 1 }}>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table aria-label="simple table">
            <TableBody>
              {detail?.map((guardiaDetail) => {
                return (
                  <TableRow
                    key={guardiaDetail.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* guardian info */}
                    <TableCell component="th" style={{ width: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          border: "1px solid #e0e0e0",
                          padding: ".59rem",
                        }}
                      >
                        {/* details */}
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          {guardiaDetail?.relation?.id === 1 ? (
                            <Typography
                              sx={{
                                backgroundColor: "#f2f2f2",
                                fontWeight: "bold",
                                width: "100%",
                                padding: "0.5rem",
                                display: "inline-block",
                              }}
                            >
                              Father Information
                            </Typography>
                          ) : guardiaDetail?.relation?.id === 2 ? (
                            <Typography
                              sx={{
                                backgroundColor: "#f2f2f2",
                                fontWeight: "bold",
                                width: "100%",
                                padding: "0.5rem",
                                display: "inline-block",
                              }}
                            >
                              Mother Information
                            </Typography>
                          ) : guardiaDetail?.relation?.id === 3 ? (
                            <Typography
                              sx={{
                                backgroundColor: "#f2f2f2",
                                fontWeight: "bold",
                                width: "100%",
                                padding: "0.5rem",
                                display: "inline-block",
                              }}
                            >
                              Brother Information
                            </Typography>
                          ) : guardiaDetail?.relation?.id === 4 ? (
                            <Typography
                              sx={{
                                backgroundColor: "#f2f2f2",
                                fontWeight: "bold",
                                width: "100%",
                                padding: "0.5rem",
                                display: "inline-block",
                              }}
                            >
                              Sister Information
                            </Typography>
                          ) : null}

                          <Typography variant="subtitle1">
                            {guardiaDetail?.first_name}{" "}
                            {guardiaDetail?.last_name}
                          </Typography>
                          <Typography variant="subtitle1">
                            {guardiaDetail?.gender?.name}
                          </Typography>
                          <Typography variant="subtitle1">
                            {guardiaDetail?.mobile_no}
                          </Typography>
                          <Typography variant="subtitle1">
                            {guardiaDetail?.nid}
                          </Typography>
                          <Typography variant="subtitle1">
                            {guardiaDetail?.occupation?.name}
                          </Typography>
                          <Typography variant="subtitle1">
                            {guardiaDetail?.relation?.name}
                          </Typography>
                        </Box>
                        {/* image */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Avatar
                            alt="profile image"
                            src={`${process.env.NEXT_PUBLIC_HOST}/${guardiaDetail?.photo}`}
                            sx={{
                              width: 100,
                              height: 100,
                              borderRadius: "10px",
                            }}
                          />

                          <Typography
                            sx={{ textAlign: "left", marginTop: "10px" }}
                            variant="subtitle1"
                          >
                            ID: {guardiaDetail?.guardian_no}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default GuardianDetails;
