export const getTotalPageList = (value) => {
    let result = [];
    let i = 0;
    while (i !== value) {
        result.push(i + 1);
        i++;
    }
    return result;
};

export const getSerialList = (pageNumber, pageSize) => {
    let result = [];
    let startIndex = (pageNumber - 1) * pageSize;
    let endIndex = pageNumber * pageSize;
    while (startIndex < endIndex) {
        result.push(startIndex + 1);
        startIndex++;
    }
    return result;
};
