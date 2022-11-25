const db = require('../config/mysqlConfig');
const ResponseDTO = require('../dto/ResponseDTO');
const handlePaginate = require('../utils/PaginationUtils');

class ArticleController {
    getArticleSearchByCategoryId(req, res) {
        const { categoryId, pageSize, pageNumber } = req.query;
        const pageNumberResult = pageNumber == undefined ? 1 : pageNumber;
        const pageSizeResult = pageSize == undefined ? 6 : pageSize;
        const getArticleSql = `CALL GetArticleByCategoryId(${categoryId})`;
        db.query(getArticleSql, (err, result) => {
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
            const paginationSql = `CALL GetArticleByCategoryIdPagination(${categoryId}, ${pageSizeResult}, ${skipValue})`;
            db.query(paginationSql, (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                    return;
                }
                const dataResult = {
                    totalPages,
                    pageSize: pageSizeResult,
                    pageNumber: pageNumberResult,
                    data: result[0],
                };
                res.status(200).json(dataResult);
            });
        });
    }
    getArticleDetail(req, res) {
        const articleId = req.params.articleId;
        const getArticleSql = `CALL GetArticleByArticleId(${articleId})`;
        db.query(getArticleSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const article = result[0];
            const getArticleRelatedSql = `CALL GetArticleRelatedByCategoryId(${result[0][0].id}, ${result[0][0].category_id})`;
            const getConsultantRelatedSql = `CALL GetConsultantByCategoryId(${result[0][0].category_id})`;
            db.query(getArticleRelatedSql, (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                    return;
                }
                const articleRelated = result[0];
                db.query(getConsultantRelatedSql, (err, result) => {
                    if (err) {
                        res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                        return;
                    }
                    const consultantRelated = result[0];
                    const dataResult = { article, articleRelated, consultantRelated };
                    res.status(200).json(dataResult);
                });
            });
        });
    }
    getArticleListByCategoryId(req, res) {
        const { categoryId, pageSize, pageNumber } = req.query;
        const pageNumberResult = pageNumber == undefined ? 1 : pageNumber;
        const pageSizeResult = pageSize == undefined ? 6 : pageSize;
        const getArticleSql = `CALL GetArticleByCategoryId(${categoryId})`;
        db.query(getArticleSql, (err, result) => {
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
            const paginationSql = `CALL GetArticleByCategoryIdPagination(${categoryId}, ${pageSizeResult}, ${skipValue})`;
            const categorySql = `CALL GetCategoryByCategoryId(${categoryId})`;
            db.query(paginationSql, (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                    return;
                }
                const articleList = result[0];
                db.query(categorySql, (err, result) => {
                    if (err) {
                        res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                        return;
                    }
                    const categoryInfo = result[0][0];
                    const dataResult = {
                        totalPages,
                        pageSize: pageSizeResult,
                        pageNumber: pageNumberResult,
                        data: { categoryInfo, articleList },
                    };
                    res.status(200).json(dataResult);
                });
            });
        });
    }
}

module.exports = new ArticleController();
