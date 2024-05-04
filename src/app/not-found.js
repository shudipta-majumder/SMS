"use client";

import Link from "next/link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const BoxWrapper = ({ children }) => (
  <div className="box-wrapper">
    {children}
    <style jsx>{`
      .box-wrapper {
        width: 90vw;
      }
    `}</style>
  </div>
);

const Error404 = () => {
  return (
    <Box className="content-center">
      <Box
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "30px",
        }}
      >
        <BoxWrapper>
          <Typography variant="h4" sx={{ mb: 1.5 }}>
            Page Not Found :(
          </Typography>
          <Typography sx={{ mb: 6, color: "text.secondary" }}>
            Oops! 😖 The requested URL was not found on this server.
          </Typography>
          <Button href="/dashboard" component={Link} variant="contained">
            Back to Home
          </Button>
        </BoxWrapper>

        <img
          className="img-style"
          height="500"
          alt="error-illustration"
          src="/images/404/404.png"
        />
      </Box>
      <style jsx>{`
        .img-style {
          /* Styles for all screen sizes */
        }
        @media (max-width: 1280px) {
          .img-style {
            height: 450px;
          }
        }
        @media (max-width: 960px) {
          .img-style {
            height: 400px;
          }
        }
      `}</style>
    </Box>
  );
};

export default Error404;
