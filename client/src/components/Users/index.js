import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating, 
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { useGetUsersQuery } from 'state/api';
import Header from 'components/Header';
import UsersTable from 'components/UsersTable';

const Users = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const { data, isLoading } = useGetUsersQuery({ 
        page, 
        pageSize, 
        sort: JSON.stringify(sort), 
        search
    });
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        if(data && data.users.length) {
            setUsers(data.users);
        }
    }, [data])

  return (
    <Box>
        <Header title='USERS' subtitle='List of all admin users' />
        <UsersTable 
            data={data} 
            isLoading={isLoading} 
            tablePage={{page, setPage}} 
            tablePageSize={{pageSize, setPageSize}} 
            tableSort={{sort, setSort}} 
            tableSearch={{search, setSearch}}
            tableSearchInput={{searchInput, setSearchInput}}
        />
    </Box>
  )
}

export default Users