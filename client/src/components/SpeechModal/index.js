import { useEffect, useState } from 'react';
import { 
    Modal, 
    TextField, 
    Box, 
    Button, 
    useTheme, 
    Typography } from '@mui/material';
import TimePickerFormField from 'components/TimePickerFormField';
import { useUpdateSpeechMutation } from 'state/api';

const SpeechModal = ({open, onClose, modalData, setModalData, speechDate, setSpeechDate, onUpdateSpeech}) => {
    const theme = useTheme();
    const [updateSpeech, { data, isLoading }] = useUpdateSpeechMutation();

  
    const handleChange = (e) => {
        setModalData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await updateSpeech({
          id: modalData._id,
          topic: modalData.topic,
          timeSlot: modalData.timeSlot
        });
      
        onUpdateSpeech(response.data);
        onClose();
    };

    return (
        <Modal 
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box 
                sx={{
                    backgroundColor: theme.palette.primary[500],
                    boxShadow: theme.shadows[5],
                    padding: theme.spacing(4),
                    minWidth: 400,
                    borderRadius: '.8rem'
                }}
            >
                <Typography variant='h3'>Edit Speech</Typography>
                <form 
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        marginTop: theme.spacing(2)
                    }}
                >
                    <TextField
                        name="topic"
                        label="Topic"
                        value={modalData.topic}
                        onChange={handleChange}
                        sx={{
                            mb:'.5rem',
                        }}
                    />
                    <TimePickerFormField 
                        label='Date and Time'
                        speechDate={speechDate}
                        setSpeechDate={setSpeechDate}
                    />
                    <Box 
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: theme.spacing(2),
                        }}
                    >
                        <Box
                            sx={{
                                width: '9.5rem',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Button 
                                variant="outlined"
                                onClick={onClose}
                                sx={{
                                    color: 'white'
                                }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

  export default SpeechModal;