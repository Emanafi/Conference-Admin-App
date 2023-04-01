export const generateReadableTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // Get date and time components
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Add 1 to convert from 0-indexed to 1-indexed
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    // Determine AM/PM
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // convert "0" to "12"
    
    // Add leading zeroes to minutes and month/day if needed
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    
    // Concatenate date and time strings
    const dateString = `${month}/${day}/${year}`;
    const timeString = `${hours}:${minutes} ${amOrPm}`;
    
    // Output to console
    return `${dateString} ${timeString}`;
}

export const getColumns = () => {
    return [
        {
            field: '_id',
            headerName: 'Speech ID',
            flex: 0.8
        },
        {
            field: 'topic',
            headerName: 'Name',
            flex: 0.5,
        },
        {
            field: 'timeSlot',
            headerName: 'Time',
            flex: 0.7,
            renderCell: (params) => {
                return generateReadableTimestamp(params.row.timeSlot);
            }
        },
        {
            field: 'attendeeId',
            headerName: 'Attendee ID',
            flex: 0.4
        },
    ]
}