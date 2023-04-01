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
import { useGetSpeechesQuery } from 'state/api';
import Header from 'components/Header';
import SpeechesTable from 'components/SpeechesTable';

const Users = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [speeches, setSpeeches] = useState([]);
    const [totalSpeeches, setTotalSpeeches] = useState(0);
    const { data, isLoading } = useGetSpeechesQuery({
        page, 
        pageSize, 
        sort: JSON.stringify(sort), 
        search
    });
    
    useEffect(() => {
        if(data && data.speeches.length) {
            setSpeeches(data.speeches);
            setTotalSpeeches(data.totalDocuments);
        }
    }, [data])

  return (
    <Box>
        <Header title='SPEECHES' subtitle='List of all speeches' />
        <SpeechesTable 
            speeches={speeches}
            setSpeeches={setSpeeches}
            totalSpeeches={totalSpeeches}
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