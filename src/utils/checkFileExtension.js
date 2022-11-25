const checkFileExtension = (value) => {
    if (value === 'jpg' || value === 'jpeg' || value === 'png') return true;
    else return false;
};

export default checkFileExtension;
