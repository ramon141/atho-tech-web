import { Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Grid
      container
      component="main"
      justifyContent="center"
      alignItems="center"
      style={{ height: "90vh" }}
    >
      <Typography variant="h4" textAlign="center">
        Você não tem acesso a esta página.
        <span onClick={goToHome}>Clique aqui</span>
      </Typography>
    </Grid>
  );
}
