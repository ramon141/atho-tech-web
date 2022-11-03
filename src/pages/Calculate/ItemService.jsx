import { Button, Card, CardContent, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { getActiveConfigurations } from './calcs';

const classes = {
    root: {
        margin: '20px 0px',
        border: 'solid 2px #1976D2',
        borderRadius: '10px',
        height: 130
    },//6EC2D2
    title: { fontWeight: 600 },
    gridRoot: { height: 400 }
}

export default function ItemService({ service, quantityCameras }) {

    const quantityCamerasLocal = service.id === 1 ? quantityCameras : 1;

    return (
        <Grid
            container
            justifyContent='center'
            alignItems='center'
            style={classes.root}
            spacing={1}
        >
            <Grid item xs={12} sm={12} md={12}>
                {service.description}
            </Grid>

            <Grid
                item
                container
                xs={6}
                sm={6}
                md={6}
                style={{ textAlign: 'center' }}
                justifyContent='center'
                alignItems='center'
            >
            </Grid>

            <Grid item xs={6} sm={6} md={6} style={{ textAlign: 'center' }}>
                Valor:
                {
                    (service.value * quantityCamerasLocal).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                }
            </Grid>

        </Grid>
    );
}