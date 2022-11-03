import { Button, Card, CardContent, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { addItem, getTotal, subtractItem } from './calcs';
import Item from './Item';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeMessage } from './makeMessage';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemService from './ItemService';

const classes = {
    root: { margin: 20 },
    title: { fontWeight: 600 },
    gridRoot: { height: 400 }
}

export default function Calculate() {

    const location = useLocation();
    const kit = location.state?.kit;

    const [openDialog, setOpenDialog] = React.useState(false);
    const [products, setProducts] = useState({});
    const [services, setServices] = useState([]);
    const [dependencies, setDependencies] = useState([]);
    const [username, setUsername] = useState('');
    const [clientNumber, setClientNumber] = useState('');

    const handleClickOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    useEffect(() => {
        api.get('/products?filter={"include":["configurations"]}').then((response) => {
            let newProducts = {};

            //Serve para verificar se alguma configuraçao do kit é igual a essa
            response.data.map((product) => {
                let newConfiguration = {};

                let quantity = 1;
                product.configurations.map((configuration, index) => {
                    newConfiguration[configuration.id] = { ...configuration, usage: index === 0 }
                    if (!!kit?.products[configuration.id])
                        quantity = kit.products[configuration.id].quantity;
                });

                newProducts[product.id] = { ...product, configurations: newConfiguration, quantity };
            });

            setProducts(newProducts);
        }).catch((error) => {
            console.log(error);
        });

        api.get('/services').then((response) => {
            setServices(response.data);
        }).catch((error) => {
            console.log(error);
        });

        api.get('/dependencies?filter={"include":["configuration"]}').then((response) => {
            setDependencies(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Card style={classes.root}>
            <CardContent>
                <Typography variant='h4' style={classes.title} align='center'>
                    Orçamento
                </Typography>

                <Grid container justifyContent='center'>
                    {
                        Object.keys(products).map((key) => (
                            <Grid key={key} item xs={12} sm={12} md={12} lg={12}>
                                <Item
                                    product={products[key]}
                                    addItem={(product) => setProducts(addItem(product, products, dependencies))}
                                    subtractItem={(product) => setProducts(subtractItem(product, products, dependencies))}
                                />
                            </Grid>
                        ))
                    }

                    {
                        Object.keys(services).map((key) => (
                            <Grid key={key} item xs={12} sm={12} md={12} lg={12}>
                                <ItemService
                                    quantityCameras={products['1']?.quantity || 1}
                                    service={services[key]}
                                />
                            </Grid>
                        ))
                    }

                    <Grid item container justifyContent='right' style={{ marginBottom: 20 }}>
                        <Grid item>
                            <span style={{ fontWeight: 'bold' }}>
                                Total: {getTotal(products, services).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                            </span>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Button
                            variant='outlined'
                            onClick={handleClickOpen}
                            style={{ backgroundColor: '#1976D2', color: 'white', borderColor: 'rgba(0,0,0,0.50)' }}
                        >
                            Enviar Orçamento
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>

            <div>
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Enviando Orçamento"}
                    </DialogTitle>

                    <DialogContent>
                        <br />
                        <Grid container spacing={2}>
                            <Grid item sm={12} md={12}>
                                <TextField
                                    label='Digite o nome do cliente'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    size='small'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={12} md={12}>
                                <TextField
                                    label='Digite o número do cliente'
                                    value={clientNumber}
                                    onChange={(e) => setClientNumber(e.target.value)}
                                    size='small'
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions style={{ justifyContent: "center" }}>
                        <Grid container spacing={2} justifyContent='center'>
                            <Grid item>
                                <Button variant='outlined' onClick={handleClose}>Voltar</Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    target='_blank'
                                    variant='outlined'
                                    href={`https://wa.me/55${clientNumber}?text=${makeMessage(username, products, services)}`}
                                >
                                    Confirmar
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </div>
        </Card >
    );
}
