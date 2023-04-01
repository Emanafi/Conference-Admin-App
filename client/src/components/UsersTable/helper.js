export const getColumns = () => {
    return [
        {
            field: '_id',
            headerName: 'User ID',
            flex: 0.8
        },
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 0.5
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 0.8
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
            field: 'role',
            headerName: 'Role',
            flex: 0.4
        },
    ]
}