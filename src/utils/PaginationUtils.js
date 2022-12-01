export const getTotalPageList = (value) => {
    let result = [];
    let i = 0;
    while (i !== value) {
        result.push(i + 1);
        i++;
    }
    return result;
};
