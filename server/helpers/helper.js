export const generateSort = (sortObj) => {
    const sortParsed = JSON.parse(sortObj);
    const sortFormatted = {
        [sortParsed.field]: [sortParsed.sort] = 'asc' ? '1' : '-1'
    }

    return sortFormatted;
}