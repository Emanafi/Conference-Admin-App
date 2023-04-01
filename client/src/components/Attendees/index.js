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
import { useGetAttendeesQuery } from 'state/api';
import Header from 'components/Header';
import AttendeesTable from 'components/AttendeesTable';

const Users = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const { data, isLoading } = useGetAttendeesQuery({ 
        page, 
        pageSize, 
        sort: JSON.stringify(sort), 
        search
    });
    const [attendees, setAttendees] = useState([]);
    
    useEffect(() => {
        if(data && data.attendees.length) {
            setAttendees(data.attendees);
        }
    }, [data])

  return (
    <Box>
        <Header title='ATTENDEES' subtitle='List of all registered attendees' />
        <AttendeesTable 
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