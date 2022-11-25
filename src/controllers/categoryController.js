const db = require('../config/mysqlConfig');
const ResponseDTO = require('../dto/ResponseDTO');

class CategoryController {
    getCategoryPagination(req, res) {
        const { pageNumber, pageSize } = req.query;
        const getCategorySql = `CALL GetAllCategory()`;
        const pageNumberResult = pageNumber == undefined ? 1 : pageNumber;
        const pageSizeResult = pageSize == undefined ? 6 : pageSize;
        db.query(getCategorySql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const totalRows = result[0].length;
            const totalPages = Math.ceil(totalRows / pageSizeResult);
            let skipValue = 0;
            if (pageNumberResult > totalPages) {
                res.status(400).json(new ResponseDTO(400, 'Số trang vượt quá tổng số trang, vui lòng kiểm tra lại'));
                return;
            }
            if (pageNumberResult > 1) skipValue = (pageNumberResult - 1) * pageSizeResult;
            const getCategoryPaginationSql = `CALL GetResultBySkipValue('category', ${pageSizeResult}, ${skipValue})`;
            db.query(getCategoryPaginationSql, (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                    return;
                }
                const dataResult = {
                    totalPages,
                    pageSize: pageSizeResult,
                    pageNumber: pageNumberResult,
                    data: { categoryList: result[0] },
                };
                res.status(200).json(dataResult);
            });
        });
    }
}

module.exports = new CategoryController();
