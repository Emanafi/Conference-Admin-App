import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getColumns } from './helper';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';
import SpeechModal from 'components/SpeechModal';

function SpeechesTable({ speeches, setSpeeches, totalSpeeches, isLoading, tablePage, tablePageSize, tableSort, tableSearch, tableSearchInput }) {
    const theme = useTheme();
    const columns = getColumns();
    const [selectedSpeech, setSelectedSpeech] = useState(null);
    const [modalFormData, setModalFormData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleRowClick = (params) => {
        setSelectedSpeech(params.row);
        setModalFormData(params.row);
        setSelectedDate(new Date(params.row.timeSlot));
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedSpeech(null);
        setModalFormData(null);
        setSelectedDate(null);
        setModalOpen(false);
    };

    const handleUpdateSpeech = (response) => {
        const { updatedSpeech } = response;
        const updatedSpeeches = speeches.map((speech) => {
          if (speech._id === updatedSpeech._id) {
            return updatedSpeech;
          }

          return speech;
        });
      
        setSpeeches(updatedSpeeches);
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
                rows={(speeches.length > 0 && speeches) || []}
                rowsPerPageOptions={[20, 50, 100]}
                columns={columns}
                rowCount={totalSpeeches || 0 }
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
            {selectedSpeech && (
                <SpeechModal 
                    open={modalOpen}
                    onClose={handleCloseModal}
                    modalData={modalFormData}
                    setModalData={setModalFormData}
                    speechDate={selectedDate}
                    setSpeechDate={setSelectedDate}
                    onUpdateSpeech={handleUpdateSpeech}
                />
            )}
        </Box>
    );
}

export default SpeechesTable;