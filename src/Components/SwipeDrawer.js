import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';

// Components
import HeaderBar from './HeaderBar';
import NavList from './NavList';

// Define the width of the drawer
const drawerWidth = 240;

// Styling mixins for the opened state of the drawer
const openedMixin = (theme) => ({
    width: drawerWidth,
    borderRight: 'none',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

// Styling mixins for the closed state of the drawer
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        borderRight: 'none',
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

// Styling for the drawer using Material-UI styled
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        
        // Apply styles for the opened state
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        // Apply styles for the closed state
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

// Main component for the swipe drawer
function SwipeDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    // Handler for toggling the drawer open/close state
    const handleDrawer = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* HeaderBar component */}
            <HeaderBar open={open} handleDrawer={handleDrawer} />

            {/* Drawer component */}
            <Drawer variant="permanent" open={open}>
                {/* DrawerHeader component */}
                <DrawerHeader/>

                {/* NavList component */}
                <NavList />
            </Drawer>
        </Box>
    );
}

export default SwipeDrawer;
