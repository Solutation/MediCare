const db = require('../config/mysqlConfig');
const ResponseDTO = require('../dto/ResponseDTO');

function handlePaginate(sql, outputName, pageSize, pageNumber, res) {
    const pageNumberResult = pageNumber == undefined ? 1 : pageNumber;
    const pageSizeResult = pageSize == undefined ? 5 : pageSize;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
            return;
        }
        const totalRows = result[0].length;
        const totalPages = Math.ceil(totalRows / pageSizeResult);
        if (pageNumberResult > totalPages) {
            res.status(400).json(new ResponseDTO(400, 'Số trang vượt quá tổng số trang,vui lòng nhập lại'));
            return;
        }
        const startIndex = (pageNumberResult - 1) * pageSizeResult;
        const endIndex = pageNumberResult * pageSizeResult;
        const resultArray = result[0].slice(startIndex, endIndex);
        const dataResult = {
            totalPages,
            pageSize: parseInt(pageSizeResult),
            pageNumber: parseInt(pageNumberResult),
            data: { [outputName]: resultArray },
        };
        res.status(200).json(dataResult);
    });
}

module.exports = handlePaginate;
