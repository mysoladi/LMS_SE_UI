import React from 'react';
import { Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const ExtendedNavbar = ({ handleDrawerOpen, isSecondDrawerOpen }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                left: 0,
                zIndex: 1201,
                paddingTop: '3rem',
                transition: 'padding-left 0.3s ease', // Adding transition for padding-left
                paddingLeft: isSecondDrawerOpen ? '12rem' : '3rem', // Adjust padding-left based on drawer state
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        mr: 2,
                        transition: 'margin-left 0.3s ease', // Adding transition for margin-left
                    }}
                >
                    <MenuIcon />
                </IconButton>
                {/* Additional Navbar content can go here */}
            </Toolbar>
        </Box>
    );
};

export default ExtendedNavbar;
