import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";

const classes = {
  root: {
    borderBottom: "solid 2px #1976D2",
    borderRadius: "10px",
    minHeight: 130,
    padding: '20px 0'
  },
};

export default function Item({ submit, setSubmit, ...props }) {

  const [product, setProduct] = useState(props.product);
  const [configurations, setConfigurations] = useState(props.configurations);

  const onChangeConfiguration = (id, newValue) => {
    let newConfigurations = [];

    configurations.forEach((configuration) => {
      if (configuration.id === id)
        newConfigurations.push({ ...configuration, description: newValue });
      else
        newConfigurations.push(configuration);
    })

    setConfigurations(newConfigurations);
  }


  useEffect(() => {
    if (submit) {
      const patchConfiguration = (configuration) => {
        if (configuration.description !== configuration.originalName) {
          const data = {
            description: configuration.description,
          };

          api.patch(`configurations/${configuration.id}`, data);
        }
      };

      const patchProduct = (product) => {
        if (product.description !== product.originalName) {
          const data = {
            description: product.description,
          };

          api.patch(`products/${product.id}`, data);
        }
      };

      patchProduct(product);

      configurations.map((configuration) => {
        patchConfiguration(configuration)
      })

      setSubmit(false);
    }

  }, [submit])

  return (
    <Grid
      container
      justifyContent="left"
      alignItems="center"
      style={classes.root}
      spacing={2}
    >
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          label="Produto"
          value={product.description}
          onChange={(e) =>
            setProduct(prev => ({ ...prev, description: e.target.value }))
          }
          size="small"
        />

      </Grid>

      {
        !!configurations[0]?.description.trim() ?
          configurations.map((configuration) => (
            <Grid item xs={12} sm={12} md={12} key={configuration.id}>
              <TextField
                style={{ margin: '0px 0 0px 30px' }}
                label="Descrição"
                value={configuration.description}
                onChange={(e) =>
                  onChangeConfiguration(configuration.id, e.target.value)
                }
                size="small"
              />
            </Grid>
          )) : false
      }

    </Grid>
  );
}
