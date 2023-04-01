import React, { useEffect, useState } from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material';
import {
    // SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    SettingsOutlined,
    // HomeOutlined,
    // Groups2Outlined,
    // PublicOutlined,
    // TodayOutlined,
    // CalendarMonthOutlined,
    // AdminPanelSettingsOutlined,
    // TrendingUpOutlined,
    // BusinessOutlined,
    // ArticleOutlined,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from 'shared_components/FlexBetween';
import ProfileImage from 'assets/halfdome.jpeg';
import { getNavItems } from './helper';

const navItems = getNavItems();

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
    user,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])

  return (
    <Box component='nav'>
        {isSidebarOpen && (
            <Drawer 
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                variant='persistent'
                anchor='left'
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {
                        color: theme.palette.secondary[200],
                        backgroundColor: theme.palette.background.alt,
                        boxSizing: 'border-box',
                        borderWidth: isNonMobile ? 0 : '2px',
                        width: drawerWidth
                    }
                }}
            >
                <Box width='100%'>
                    <Box width="100%" mt='2rem'>
                        <FlexBetween color={theme.palette.secondary.main} flexDirection='column'>
                            <Box display='flex' alignItems='center' gap='.5rem' mb='2rem'>
                                <Typography 
                                    variant='h4' 
                                    fontWeight='bold' 
                                    sx={{
                                        textAlign: 'center'
                                    }}
                                >
                                    United Submitters Community
                                </Typography>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </Box>
                            <List sx={{ width: '100%' }}>
                                { navItems.map(({ text, icon }) => {
                                    if(!icon) {
                                        return (
                                            <Typography key={text} sx={{ m: '2.25rem 0 1rem 2rem'}} fontWeight={600}>
                                                {text}
                                            </Typography>
                                        )
                                    }

                                    const lowerCaseText= text.toLowerCase();

                                    return (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton 
                                                onClick={() => { 
                                                    navigate(`/${lowerCaseText}`);
                                                    setActive(lowerCaseText);
                                                }}
                                                sx={{
                                                    backgroundColor: active === lowerCaseText ? theme.palette.secondary[300] : 'transparent',
                                                    color: active === lowerCaseText ? theme.palette.primary[600] : theme.palette.secondary[100]
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        ml: '2rem',
                                                        color: active === lowerCaseText ? theme.palette.primary[600] : theme.palette.secondary[200]
                                                        
                                                    }}
                                                >
                                                    {icon}
                                                    <ListItemText primary={text} sx={{ paddingLeft: '.5rem' }} />
                                                    {active === lowerCaseText && (
                                                        <ChevronRightOutlined sx={{ ml: 'auto' }}/>
                                                    )}
                                                </ListItemIcon>
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </FlexBetween>
                    </Box>
                </Box>

                <Box position='absolute' bottom='2rem' width='100%'>
                     <Divider width='100%'/>
                     <FlexBetween textTransform='none' gap='1rem' m='1.5rem 2rem 0 3rem'>
                        <Box
                            component='img'
                            alt='profile'
                            src={ProfileImage}
                            height='40px'
                            width='40px'
                            borderRadius='50%'
                            sx={{ 
                                objectFit: 'cover' 
                            }}
                        />
                            <Box textAlign='left'>
                                <Typography 
                                    fontWeight='bold' 
                                    fontSize='0.9rem' 
                                    sx={{ 
                                        color: theme.palette.secondary[100]
                                    }}
                                >
                                    {user.firstName}
                                </Typography>
                                <Typography 
                                    fontSize='0.8rem'
                                    sx={{ 
                                        color: theme.palette.secondary[200]
                                    }}
                                >
                                    {user.role}
                                </Typography>
                            </Box>
                            <SettingsOutlined 
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: '25px'
                                }}
                            />
                    </FlexBetween>

                </Box>
            </Drawer>
        )}
    </Box>
  )
}

export default Sidebar;