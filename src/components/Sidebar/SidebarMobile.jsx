import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ListItems from './ListItems';
import { IoIosArrowBack as ArrowBackIcon } from 'react-icons/io';

import imgIcon from '../../assets/icon.png';

import { useEffect } from 'react';
import { Grid } from '@mui/material';

export default function SidebarMobile({ children, isOpen, onClose }) {
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const Items = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={onClose}
            onKeyDown={onClose}
        >

            <Grid container style={{ marginTop: 5, padding: '0px 15px' }} spacing={2} justifyContent='space-between' alignItems='center'>
                <Grid item>
                    <img src={imgIcon} width={55} />
                </Grid>

                <Grid item>
                    <Button>
                        <ArrowBackIcon size={30} />
                    </Button>
                </Grid>
            </Grid>

            <ListItems />
        </Box >
    );

    useEffect(() => {
        toggleDrawer('left', true);
    }, [isOpen]);

    return (
        <div>
            <React.Fragment>
                <Drawer
                    anchor={'left'}
                    open={isOpen}
                    onClose={onClose}
                >
                    <Items />
                </Drawer>

                <Box component="main">
                    {children}
                </Box>
            </React.Fragment>
        </div>
    );
}
