import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import imgIcon from '../../assets/icon.png';
import { HiMenu as MenuIcon } from 'react-icons/hi';
import { BiLogOut as LogoutIcon } from 'react-icons/bi';
import { logout } from '../../services/auth';

export default function Header({ showButtonToOpenMenu, openSidebarMobile, ...props }) {
    return (
        <AppBar position="static" {...props}>
            <Toolbar style={{ justifyContent: 'space-between' }}>
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

                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    onClick={() => logout()}
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
