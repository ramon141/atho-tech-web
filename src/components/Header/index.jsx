import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import imgIcon from '../../assets/icon.png';
import { HiMenu as MenuIcon } from 'react-icons/hi';

export default function Header({ showButtonToOpenMenu, openSidebarMobile, ...props }) {
    return (
        <AppBar position="static" {...props}>
            <Toolbar>
                {
                    showButtonToOpenMenu ?
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            onClick={() => openSidebarMobile()}
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        : <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginTop: 1 }}>
                            <img src={imgIcon} width={50} />
                        </Typography>
                }

                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}
