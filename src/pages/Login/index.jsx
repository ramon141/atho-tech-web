import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import imgBackground from '../../assets/background.png';
import { FaUnlock as LockIcon } from 'react-icons/fa';
import { login as addTokenInEnvVariables } from '../../services/auth';


const classes = {
    root: { height: '100vh' },
    gridRoot: { height: '100%' },
    img: {
        backgroundImage: `url(${imgBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
}

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        const credentials = {
            email,
            password
        };

        api.post('/login', credentials).then((response) => {
            addTokenInEnvVariables(response.data.token);
            navigate('/calculate');
        }).catch((error) => {
            alert('Houve um erro ao tentar acessar o sistema, confirme suas credenciais');
        })
    }

    return (
        <Grid container component="main" style={classes.root}>
            <Grid item xs={false} sm={4} md={7} style={classes.img} />

            <Grid container spacing={2} item xs={12} sm={8} md={5} component={Paper} elevation={6} justifyContent='center' alignItems='center'>
                <Grid container spacing={2} item justifyContent='center'>

                    <Grid item xs={12} md={12} lg={12} style={{ marginLeft: -20 }}>
                        <Typography variant='h4' align='center'>
                            <LockIcon color='#FFF' style={{ backgroundColor: '#207891', padding: 10, borderRadius: '50%' }} />
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12} style={{ marginLeft: -20 }}>
                        <Typography variant='h4' align='center'>
                            Login
                        </Typography>
                    </Grid>

                    <Grid item xs={10} md={10} lg={10} style={{ marginLeft: -20 }}>
                        <TextField
                            fullWidth
                            value={email}
                            label='Digite seu e-mail'
                            onChange={((e) => setEmail(e.target.value))}
                        />
                    </Grid>

                    <Grid item xs={10} md={10} lg={10} style={{ marginLeft: -20 }}>
                        <TextField
                            fullWidth
                            type='password'
                            label='Digite sua senha'
                            value={password}
                            onChange={((e) => setPassword(e.target.value))}
                        />
                    </Grid>

                    <Grid item xs={10} md={10} lg={10} style={{ marginLeft: -20 }}>
                        <Button
                            variant='outlined'
                            fullWidth
                            onClick={login}
                            style={{ height: 56, backgroundColor: '#207891', color: 'white' }}
                        >
                            Entrar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >

    );
}
