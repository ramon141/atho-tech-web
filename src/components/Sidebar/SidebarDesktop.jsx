import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import ListItems from './ListItems';
import { IoIosArrowBack as ArrowBackIcon, IoIosMail as MailIcon, IoMdLogIn as InboxIcon } from 'react-icons/io';

const drawerWidth = 240;

export default function ClippedDrawer({ children }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <ListItems />
                </Box>
            </Drawer>

            <Box component="main" sx={{ marginTop: 9, width: '100%' }}>
                {children}
            </Box>
        </Box>
    );
}
