import { Card, CardContent, Grid, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { ROLE } from "../../services/auth";
import Item from "./Item";

const classes = {
  buttonSubmit: {
    backgroundColor: "#1976D2",
    color: "white",
    borderColor: "rgba(0,0,0,0.50)",
  },
  gridContainer: {
    marginTop: 20,
  },
  title: { fontWeight: 600, marginBottom: 20 },
  buttonCancel: {
    backgroundColor: "#CFCFCF",
    color: "black",
    borderColor: "rgba(0,0,0,0.50)",
  },
};

export default function RenameProducts() {
  const [products, setProducts] = useState([]);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  const loadProducts = () => {
    if (ROLE != "Admin") navigate("/");

    const data = {
      include: ["configurations"],
    };

    api
      .get(`products?filter=${JSON.stringify(data)}`)
      .then((response) => {
        const data = response.data;
        const newData = formatedDataOfProducts(data);
        setProducts(newData);
      })
      .catch((error) => {
        alert("Entre novamente no sistema");
        navigate("/");
      });
  };

  const formatedDataOfProducts = (data) => {
    let newData = {};

    data.forEach((product) => {
      let newConfigurations = [];
      product.configurations.forEach((configuration) => {
        const value = configuration.value;
        const valueFormated = value.toFixed(2);

        newConfigurations.push({
          ...configuration,
          originalName: configuration.description,
          value: valueFormated,
        });
      });

      newData[product.id] = {
        ...product,
        originalName: product.description,
        configurations: newConfigurations,
      };
    });

    return newData;
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Card style={{ margin: 30 }}>
      <CardContent>
        <Typography variant="h4" style={classes.title} align="center">
          Atualizar nome dos produtos
        </Typography>

        {Object.keys(products).map((keyProduct) =>
          <Item
            key={keyProduct}
            product={products[keyProduct]}
            configurations={products[keyProduct].configurations}
            submit={submit}
            setSubmit={setSubmit}
          />
        )}

        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={classes.gridContainer}
        >
          <Grid item>
            <Button
              variant="outlined"
              style={classes.buttonCancel}
            >
              Voltar
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              onClick={() => { setSubmit(true); alert("Os nomes foram atualizados com sucesso!"); }}
              style={classes.buttonSubmit}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
