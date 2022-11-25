const handleDateResponse = (value) => {
    const day = value.slice(8, 10);
    const month = value.slice(5, 7);
    const year = value.slice(0, 4);
    return `${day}/${month}/${year}`;
};

export default handleDateResponse;
