import { Card, CardContent, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import imgIcon from '../../assets/icon.png';
import {
  AiFillCamera as CameraIcon
} from 'react-icons/ai';
import { ID_ENTERPRISE } from '../../services/auth';

const classes = {
  root: { margin: 20 },
  title: { fontWeight: 600 },
  gridRoot: {
    margin: '50px 0px'
  },
  item: {
    borderRadius: 10,
    border: 'solid 2px #084D6E',
    backgroundColor: '#1976D2',
    color: 'white',
    cursor: 'pointer',
    textAlign: 'center'
  }
}

export default function ChoiceKits() {

  const navigate = useNavigate();

  const [kits, setKits] = useState([]);

  useEffect(() => {
    api.get(`/enterprises/${ID_ENTERPRISE}/kits`).then((response) => {
      setKits(response.data);
    }).catch((error) => {
      alert('O sistema apresentou uma falha. Saia do sistema e faça login novamente');
    })
  }, []);

  const loadKit = (kit) => {
    const productsObject = {
    };

    kit.products.forEach((product) => {
      productsObject[product.id] = { ...product };
    })

    navigate('/calculate', { state: { kit: { ...kit, products: productsObject } } });
  }

  return (
    <Card style={classes.root}>
      <CardContent>

        <Grid container justifyContent='center' sx={{ '& div': { margin: 2 } }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant='h4' style={classes.title} align='center'>
              Escolha um dos kits
            </Typography>
          </Grid>
          {
            kits.map((kit) => (
              <Grid
                item
                onClick={() => loadKit(kit)}
                key={kit.id}
                style={classes.item}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
              >
                <CameraIcon size={80} />
                <div>{kit.name}</div>
              </Grid>
            ))
          }
        </Grid>
      </CardContent>
    </Card>
  );
}