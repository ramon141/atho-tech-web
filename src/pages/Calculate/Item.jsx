import { Button, Card, CardContent, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { getDvrByQuantityCameras } from './calcs';

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

export default function Calculate({ product, addItem, alterQuantity, subtractItem, index, quantityCameras }) {

    const ChoiceQuantityProduct = () => (
        <>
            <Grid item xs={4} sm={4} md={4}>
                {
                    !product.dependsOn ?
                        <IconButton
                            onClick={() => subtractItem({ ...product, index, quantityCameras })}
                        >
                            <AiOutlineMinusCircle />
                        </IconButton> : false
                }

            </Grid>

            <Grid item xs={4} sm={4} md={4}>
                {product.quantity || 1}
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
                {
                    !product.dependsOn ?
                        <IconButton
                            disabled={!!product.dependsOn}
                            onClick={() => addItem({ ...product, index, quantityCameras })}
                        >
                            <AiOutlinePlusCircle />
                        </IconButton> : false
                }


            </Grid>
        </>
    );

    return (
        <Grid
            container
            justifyContent='center'
            alignItems='center'
            style={classes.root}
            spacing={1}
        >
            <Grid item xs={12} sm={12} md={12}>
                {product.description}
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
                <ChoiceQuantityProduct />
            </Grid>

            <Grid item xs={6} sm={6} md={6} style={{ textAlign: 'center' }}>
                Valor: {((product.quantity || 1) * product.value).toFixed(2)}
            </Grid>

        </Grid>
    );
}