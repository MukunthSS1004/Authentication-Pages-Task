import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function WelcomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Guest";

  return (
    <Box sx={{ p: 4, textAlign: "center", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        🎉 Welcome, {username}!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        You have successfully logged in.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go Back
      </Button>
    </Box>
  );
}
