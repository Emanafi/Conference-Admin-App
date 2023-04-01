export const getColumns = () => {
    return [
        {
            field: '_id',
            headerName: 'User ID',
            flex: 0.8
        },
        {
            field: 'fullName',
            headerName: 'Name',
            flex: 0.5,
            renderCell: (params) => {
                return `${params.row.firstName} ${params.row.lastName}`;
            }
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 0.7
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3')
            }
        }, 
        {
            field: 'country',
            headerName: 'Country',
            flex: 0.4
        },
    ]
}