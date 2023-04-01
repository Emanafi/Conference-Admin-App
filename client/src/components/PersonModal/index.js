import { useState } from 'react';
import { 
    Modal, 
    TextField, 
    Box, 
    Button, 
    useTheme, 
    Typography } from '@mui/material';

const PersonModal = ({ person, open, onClose, personType }) => {
    const theme = useTheme()
    const [formData, setFormData] = useState(person);
  
    const handleChange = (e) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        // Do something with the form data
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
            <Box sx={{
                backgroundColor: theme.palette.primary[500],
                boxShadow: theme.shadows[5],
                padding: theme.spacing(4),
                minWidth: 400,
                borderRadius: '.8rem'
                }}
            >
                <Typography variant='h3'>Edit {personType}</Typography>
                <form 
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        marginTop: theme.spacing(2)
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            mb:'.5rem'
                        }}
                    >
                        <TextField
                            name="firstName"
                            label="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            name="lastName"
                            label="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Box>
                    <TextField
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{
                            mb:'.5rem',
                        }}
                    />
                    <TextField
                        name="phoneNumber"
                        label="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
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

  export default PersonModal;