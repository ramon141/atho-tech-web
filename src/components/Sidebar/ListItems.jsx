import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

export default function ListItems() {

    const navigate = useNavigate();

    return (
        <List>
            <Divider />

            <ListItem>
                <ListItemButton onClick={() => navigate('/choice-kits')}>
                    <ListItemText primary={'Escolher Kit'} />
                </ListItemButton>
            </ListItem>

            <ListItem>
                <ListItemButton onClick={() => navigate('/calculate')}>
                    <ListItemText primary={'Calculadora'} />
                </ListItemButton>
            </ListItem>

            <ListItem>
                <ListItemButton onClick={() => navigate('/register-seller')}>
                    <ListItemText primary={'Cadastro de Vendedores'} />
                </ListItemButton>
            </ListItem>

        </List>
    );
}