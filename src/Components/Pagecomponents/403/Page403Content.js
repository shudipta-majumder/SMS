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

const Error403 = () => {
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
            Access to this page is restricted
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Please check with the site admin if you believe this is a mistake.
          </Typography>
          <Typography sx={{ mb: 3, color: "text.secondary" }}>
            Otherwise Login again
          </Typography>
          <Button href="/login" component={Link} variant="contained">
            Login
          </Button>
        </BoxWrapper>
        <img
          className="img-style"
          height="500"
          alt="error-illustration"
          src="/images/403/403.png"
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

export default Error403;
