const handleDateRequest = (value) => {
    const day = value.slice(8, 10);
    const month = value.slice(5, 7);
    const year = value.slice(0, 4);
    return `${year}-${month}-${day}`;
};

export default handleDateRequest;
