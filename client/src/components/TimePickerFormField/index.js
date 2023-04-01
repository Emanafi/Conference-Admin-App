import React from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const TimePickerFormField = ({ label, speechDate, setSpeechDate }) => {
  const handleDateChange = (date) => {
    setSpeechDate(date);
  };

  return (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DateTimePicker
      label={label}
      value={speechDate}
      onChange={handleDateChange}
      renderInput={(params) => (
        <TextField 
          {...params} 
          variant="standard"
        />
      )}
    />
  </LocalizationProvider>
  );
}

export default TimePickerFormField;