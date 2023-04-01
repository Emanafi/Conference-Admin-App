import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getColumns } from './helper';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';
import PersonModal from 'components/PersonModal';

function UserTable({ data, isLoading, tablePage, tablePageSize, tableSort, tableSearch, tableSearchInput }) {
    const theme = useTheme();
    const columns = getColumns();
    const [selectedAttendee, setSelectedUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleRowClick = (params) => {
        setSelectedUser(params.row);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setModalOpen(false);
    };

    return (
        <Box 
            mt='20px' 
            height='79vh'
            sx={{
                '& .MuiDataGrid-root': {
                    border: 'none'
                },
                '& .MuiDataGrid-cell': {
                    borderBottom: 'none'
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: 'none'
                },
                '& MuiDataGrid-virtualScroller': {
                    backgroundColor: theme.palette.light,
                },
                '& .MuiDataGrid-footerContainer': {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: 'none'
                },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                    color: `${theme.palette.secondary[200]} !important`,
                },
            }}
        >
            <DataGrid 
                loading={isLoading}
                getRowId={(row) => row._id}
                rows={(data && data.attendees) || []}
                rowsPerPageOptions={[20, 50, 100]}
                columns={columns}
                rowCount={data && data.totalDocuments || 0 }
                onRowClick={handleRowClick}
                pagination
                page={tablePage.page}
                pageSize={tablePageSize.pageSize}
                paginationMode='server'
                sortingMode='server'
                onPageChange={(newPage) => tablePage.setPage(newPage)}
                onPageSizeChange={(newPageSize) => tablePageSize.setPageSize(newPageSize)}
                onSortModelChange={(newSortModel) => tableSort.setSort(...newSortModel)}
                components={{ Toolbar: DataGridCustomToolbar }}
                disableRowSelectionOnClick
                componentsProps={{
                    toolbar: {
                        searchInput: tableSearchInput.searchInput,
                        setSearchInput: tableSearchInput.setSearchInput,
                        setSearch: tableSearch.setSearch
                    }
                }}
            />
            {selectedAttendee && (
                <PersonModal 
                    person={selectedAttendee}
                    open={modalOpen}
                    onClose={handleCloseModal}
                    personType='Attendee'
                />
            )}
        </Box>
    );
}

export default UserTable;