import React, { useState } from 'react';
import { 
    LightModeOutlined, 
    DarkModeOutlined, 
    Menu as MenuIcon, 
    Search, 
    SettingsOutlined, 
    ArrowDropDownOutlined, 
    Settings
} from '@mui/icons-material';
import FlexBetween from 'shared_components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import ProfileImage from 'assets/halfdome.jpeg';
import { AppBar, Box, Typography, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, useTheme } from '@mui/material';

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setanchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setanchorEl(event.currentTarget);
    const handleClose = () => setanchorEl(null);

  return (
    <AppBar
        sx={{
           position: 'static',
           background: 'none',
           boxShadow: 'none',
        }}
    >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* LEFT SIDE */}
            <FlexBetween>
                <IconButton onClick={() => console.log('open/close sidebar')}>
                    <MenuIcon />
                </IconButton>
                <FlexBetween
                    backgroundColor={theme.palette.background.alt}
                    borderRadius='9px'
                    gap='3rem'
                    p='0.1rem 1.5rem'
                >
                    <InputBase placeholder='Search...'/>
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
            
            {/* RIGHT SIDE */}
            <FlexBetween gap="1.5rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlined sx={{ fontsize: "25px" }} />
                    ) : (
                        <LightModeOutlined sx={{ fontsize: "25px" }} />
                    )}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{ fontsize: "25px" }}/>
                </IconButton>
                
                <FlexBetween>
                    <Button
                        onClick={handleClick}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            textTransform: 'none',
                            gap: '1rem'
                        }}
                    >
                        <Box
                            component='img'
                            alt='profile'
                            src={ProfileImage}
                            height='32px'
                            width='32px'
                            borderRadius='50%'
                            sx={{ 
                                objectFit: 'cover' 
                            }}
                        />
                        <Box textAlign='left'>
                            <Typography 
                                fontWeight='bold' 
                                fontSize='0.85rem' 
                                sx={{ 
                                    color: theme.palette.secondary[100]
                                }}
                            >
                                {user.firstName}
                            </Typography>
                            <Typography 
                                fontSize='0.75rem'
                                sx={{ 
                                    color: theme.palette.secondary[200]
                                }}
                            >
                                {user.role}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined 
                            sx={{
                                color: theme.palette.secondary[300],
                                fontSize: '25px'
                            }}
                        />
                    </Button>
                    <Menu 
                        anchorEl={anchorEl} 
                        open={isOpen} 
                        onClose={handleClose} 
                        anchorOrigin={{ 
                            vertical: 'bottom', 
                            horizontal: 'center' 
                        }}
                    >
                        <MenuItem 
                            onClick={handleClose}
                            sx={{
                                width: '100%'
                            }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar