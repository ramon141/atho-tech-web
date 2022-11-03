import { Button, Divider, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import {
    AiFillInstagram as InstagramIcon,
    AiFillFacebook as FacebookIcon,
    AiFillLinkedin as LinkedinIcon
} from 'react-icons/ai';

import {
    TfiWorld as WorldIcon
} from 'react-icons/tfi';

export default function Footer() {

    const SocialMediaButton = ({ icon: Icon, website }) => {
        return (
            <IconButton
                target='_blank'
                href={website}
                size="large"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <Icon />
            </IconButton>);
    }

    return (
        <Grid style={{ padding: 20, marginTop: 30, backgroundColor: '#F5F5F5' }} spacing={2} container component='main' justifyContent='center'>
            <Grid item sm={12} md={6} lg={6}>
                <Typography variant='h5' align='center'>
                    Sobre
                </Typography>

                <div style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                    Atho Tech vem contibuindo na segurança eletrônica em Santarém e região do Pará,
                    realizando serviços como instalações de Sistema de Segurança, Alarme Monitorado
                    e outros serviços de segurança.
                </div>
            </Grid>

            <Grid item sm={6} md={6} lg={6} style={{ textAlign: 'center' }}>
                <Typography variant='h5' align='center'>
                    Redes Sociais
                </Typography>

                <SocialMediaButton
                    icon={InstagramIcon}
                    website='https://www.instagram.com/atho_tech/'
                />

                <SocialMediaButton
                    icon={FacebookIcon}
                    website='https://pt-br.facebook.com/athotech/'
                />

                <SocialMediaButton
                    icon={LinkedinIcon}
                    website='https://br.linkedin.com/company/athotech'
                />

                <SocialMediaButton
                    icon={WorldIcon}
                    website='https://www.athotech.com.br/'
                />

            </Grid>

            <Divider />
        </Grid >
    );
}
