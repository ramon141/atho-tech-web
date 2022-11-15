import { Card, CardContent, Grid, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { ROLE } from '../../services/auth';
import Item from './Item';

const classes = {
  buttonSubmit: {
    backgroundColor: '#1976D2',
    color: 'white',
    borderColor: 'rgba(0,0,0,0.50)'
  },
  gridContainer: {
    marginTop: 20
  },
  title: { fontWeight: 600, marginBottom: 20 },
  buttonCancel: {
    backgroundColor: '#CFCFCF',
    color: 'black',
    borderColor: 'rgba(0,0,0,0.50)'
  }

}

export default function ProductsPricing() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const patchConfiguration = (configuration) => {
    if (!!configuration.changed) {
      const data = {
        value: parseFloat(configuration.value)
      }

      api.patch(`configurations/${configuration.id}`, data);
    }
  }

  const submit = () => {
    let requisitions = [];

    Object.keys(products).map((keyProduct) => {
      products[keyProduct].configurations.map((configuration) => {
        requisitions.push(patchConfiguration(configuration));
      })
    })

    Promise.all(requisitions)
      .then((response) => {
        alert('Os valores foram atualizados com sucesso!');
      })
      .catch((error) => {
        alert('Houve um erro ao atualizar os valores, tente novamente');
      })
  }


  useEffect(() => {
    if (ROLE != 'Admin')
      navigate('/');


    const data = {
      include: ['configurations']
    };

    api.get(`products?filter=${JSON.stringify(data)}`)
      .then((response) => {
        const data = response.data;
        let newData = {};

        data.forEach((product) => {

          let newConfigurations = [];
          product.configurations.forEach((configuration) => {

            const value = configuration.value;
            const valueFormated = value.toFixed(2);
            newConfigurations.push({
              ...configuration,
              value: valueFormated
            });

          });

          newData[product.id] = {
            ...product,
            configurations: newConfigurations
          };
        })

        setProducts(newData);

      }).catch((error) => {
        alert('Entre novamente no sistema');
        navigate('/');

      })
  }, [])

  const onChangeValue = (newValue, configurationChanged, product, changed = true) => {
    let newProducts = structuredClone(products);

    const productToAlterValue = newProducts[product.id];
    let newConfigurations = [];

    productToAlterValue.configurations.forEach((configuration) => {
      if (configuration.id === configurationChanged.id) {
        newConfigurations.push({
          ...configuration,
          value: newValue,
          changed
        });

      } else {
        newConfigurations.push(configuration);
      }

    });

    newProducts[product.id] = {
      ...productToAlterValue,
      configurations: newConfigurations
    };

    setProducts(newProducts);
  }


  return (
    <Card style={{ margin: 30 }}>
      <CardContent>
        <Typography variant='h4' style={classes.title} align='center'>
          Atualizar valores dos produtos
        </Typography>

        {
          Object.keys(products).map((keyProduct) => (
            products[keyProduct].configurations.map((configuration) => (
              <Item
                key={configuration.id}
                configuration={configuration}
                product={products[keyProduct]}
                onChangeValue={onChangeValue}
              />
            ))
          ))
        }

        <Grid
          container
          spacing={2}
          justifyContent='center'
          style={classes.gridContainer}
        >
          <Grid item>
            <Button
              variant='outlined'
              onClick={submit}
              style={classes.buttonCancel}
            >
              Voltar
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant='outlined'
              onClick={submit}
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