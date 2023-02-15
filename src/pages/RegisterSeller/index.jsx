import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import imgBackground from "../../assets/background.png";
import { FaUnlock as LockIcon } from "react-icons/fa";
import { login as addEnvVarsFromRequestLogin } from "../../services/auth";

const classes = {
  root: { margin: 30 },
  title: { fontWeight: 600, marginBottom: 30 },
  buttonSubmit: {
    backgroundColor: "#1976D2",
    color: "white",
    borderColor: "rgba(0,0,0,0.50)",
  },
  buttonClean: {
    backgroundColor: "#1976D2",
    color: "white",
    borderColor: "rgba(0,0,0,0.50)",
  },
};

export default function RegisterSeller() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const register = () => {
    const data = {
      email,
      password,
      name: username,
      role: "Vendedor",
    };
    api
      .post("signup", data)
      .then((response) => {
        alert("Usuário cadastrado com sucesso!");
        cleanFields();
      })
      .catch((error) => {
        alert(
          error?.response?.data?.error?.message ||
            "Um erro desconhecido ocorreu"
        );
      });
  };

  const cleanFields = () => {
    setEmail("");
    setUsername("");
    setPassword("");
  };

  return (
    <Card style={classes.root}>
      <CardContent>
        <Typography variant="h4" style={classes.title} align="center">
          Cadastro de Vendedores
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              label="Nome"
              fullWidth
              size="small"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField
              label="E-mail"
              fullWidth
              type="email"
              size="small"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField
              label="Senha"
              type="password"
              fullWidth
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Grid>

          <Grid container item justifyContent="center" spacing={2}>
            <Grid item xs={12} sm={3} md={2.5}>
              <Button
                variant="outlined"
                fullWidth
                style={classes.buttonClean}
                onClick={cleanFields}
              >
                Limpar
              </Button>
            </Grid>

            <Grid item xs={12} sm={3} md={2.5}>
              <Button
                variant="outlined"
                fullWidth
                style={classes.buttonSubmit}
                onClick={register}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
