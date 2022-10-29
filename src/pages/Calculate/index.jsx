import { Button, Card, CardContent, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { getDvrByQuantityCameras } from './calcs';
import Item from './Item';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const classes = {
    root: { margin: 20 },
    title: { fontWeight: 600 },
    gridRoot: { height: 400 }
}

export default function Calculate() {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [products, setProducts] = useState([]);
    const [userName, setUserName] = useState('');
    const [clientNumber, setClientNumber] = useState('');

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const popupConfirmation = () => {
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }

    const getMessage = () => {
        let message =
            `Olá ${userName}, aqui seu orçamento realizado na empresa Atho Tech\nItens:\n`;

        let total = 0;

        products.forEach((product) => {
            message += `    ${product.quantity || 1}x ${product.description}\n\n`;
            total += ((product.quantity || 1) * product.value);
        })

        message += `Total: ${total}`;

        return window.encodeURIComponent(message);
    }

    useEffect(() => {
        api.get('/products').then((response) => {
            setProducts(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    const alterQuantity = (product, newValue) => {
        let newProducts = [...products];
        newProducts[product.index].quantity = newValue;
        setProducts(newProducts);
    }

    const addItem = (product) => {
        let newProducts = [...products];
        newProducts[product.index].quantity = newProducts[product.index].quantity + 1 || 2;

        if (product.description.includes('CAMERA')) {
            const dvr = getDvrByQuantityCameras(product.quantityCameras + 1);
            newProducts[6].quantity = dvr.quantity;
            const regex = / - \d+ PORTAS/gm;
            newProducts[6].description = newProducts[6].description.replace(regex, ``);
            newProducts[6].description = `${newProducts[6].description} - ${dvr.ports} PORTAS`;


            for (let i = 0; i < newProducts.length; i++) {
                if (newProducts[i].dependsOn == newProducts[product.index].id) {
                    newProducts[i].quantity =
                        newProducts[i].multiplier
                        *
                        newProducts[product.index].quantity; //Quantidade de cameras
                }
            }

        }

        setProducts(newProducts);
    }

    const subtractItem = (product) => {
        let newProducts = [...products];
        newProducts[product.index].quantity = newProducts[product.index].quantity - 1 || 1;

        if (product.description.includes('CAMERA')) {
            const dvr = getDvrByQuantityCameras(product.quantityCameras + 1);
            newProducts[6].quantity = dvr.quantity;
            const regex = / - \d+ PORTAS/gm;
            newProducts[6].description = newProducts[6].description.replace(regex, ``);
            newProducts[6].description = `${newProducts[6].description} - ${dvr.ports} PORTAS`;


            for (let i = 0; i < newProducts.length; i++) {
                if (newProducts[i].dependsOn == newProducts[product.index].id) {
                    newProducts[i].quantity =
                        newProducts[i].multiplier
                        *
                        newProducts[product.index].quantity; //Quantidade de cameras
                }
            }

        }

        setProducts(newProducts);
    }

    return (
        <Card style={classes.root}>
            <CardContent>
                <Typography variant='h4' style={classes.title} align='center'>
                    Orçamento
                </Typography>

                <Grid container>
                    {
                        products.map((product, index) => (
                            <Item
                                alterQuantity={alterQuantity}
                                quantityCameras={products[5].quantity}
                                addItem={addItem}
                                subtractItem={subtractItem}
                                key={product.id}
                                product={product}
                                setProducts={setProducts}
                                index={index}
                            />
                        ))
                    }

                    <Grid item>
                        <Button
                            onClick={handleClickOpen}
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
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
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
                                    href={`https://wa.me/55${clientNumber}?text=${getMessage()}`}
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
