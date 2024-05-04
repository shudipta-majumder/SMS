import React from "react";
import { Box } from "@mui/material";
import FeesPaidTable from "./FeesPaidTable";

const FeesPaidList = () => {
  return (
    <Box sx={{ mt: "8px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <Box
            sx={{
              position: "relative",
              borderRadius: "10px",
              padding: "0px 0px 0px 0px",
            }}
          >
            <FeesPaidTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FeesPaidList;
