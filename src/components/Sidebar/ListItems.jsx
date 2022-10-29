import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function ListItems({ children, isOpen, onClose }) {
    return (<List>
        <Divider />

        <ListItem>
            <ListItemButton>
                <ListItemText primary={'Calculadora'} />
            </ListItemButton>
        </ListItem>

        <ListItem>
            <ListItemButton>
                <ListItemText primary={'Cadastro de Vendedores'} />
            </ListItemButton>
        </ListItem>

    </List>
    );
}