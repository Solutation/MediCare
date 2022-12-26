const db = require('../config/mysqlConfig');
const ResponseDTO = require('../dto/ResponseDTO');
const handlePaginate = require('../utils/PaginationUtils');

class CategoryController {
    getCategoryPagination(req, res) {
        const { pageNumber, pageSize } = req.query;
        const getCategorySql = `CALL GetAllCategory()`;
        handlePaginate(getCategorySql, 'categoryList', pageSize, pageNumber, res);
    }
    getCategoryBy5(req, res) {
        const sql = `CALL GetCategoryBy5()`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json({ categoryList: result[0] });
        });
    }
    getAllCategory(req, res) {
        const sql = `CALL GetAllCategory()`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json({ categoryList: result[0] });
        });
    }
}

module.exports = new CategoryController();
