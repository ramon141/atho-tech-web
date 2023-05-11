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

export default function RegisterProduct() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const register = async () => {
    try {
      const dataProducts = { description };
      const { data: product } = await api.post("products", dataProducts);

      const dataConfig = {
        description: " ",
        productsId: product.id,
        value: parseFloat(value),
      };

      await api.post("configurations", dataConfig);

      cleanFields();
      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      alert(
        error?.response?.data?.error?.message || "Um erro desconhecido ocorreu"
      );
    }
  };

  const cleanFields = () => {
    setValue("");
    setDescription("");
  };

  return (
    <Card style={classes.root}>
      <CardContent>
        <Typography variant="h4" style={classes.title} align="center">
          Cadastro de Produtos
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
            <TextField
              label="Nome"
              fullWidth
              size="small"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <TextField
              label="Valor"
              fullWidth
              type="number"
              size="small"
              onChange={(e) => setValue(e.target.value)}
              value={value}
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
