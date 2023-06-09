import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { useGetUserQuery } from 'state/api';

const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector((state) => state.global.userId);
    const { isFetching, data, error } = useGetUserQuery(userId);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if(data && data.user) {
            setUserData(data.user);
        }
    }, [data])

    return (
        <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
            <Sidebar
                user={userData || {}}
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            >

            </Sidebar>
            <Box flexGrow={1}>
                <Navbar
                    user={userData || {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout;