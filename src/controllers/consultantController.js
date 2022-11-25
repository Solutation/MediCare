const db = require('../config/mysqlConfig');
const ResponseDTO = require('../dto/ResponseDTO');

class ConsultantController {
    addConsultant(req, res) {
        // prettier-ignore
        const { email, password, first_name, last_name, phone_number, address, birth_day, descriptions, avatar, average_score } = req.body;
        const addConsultantSql = '';
        db.query(addConsultantSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Đăng ký thất bại'));
                return;
            }
            res.status(200).json(new ResponseDTO(200, 'Đăng ký thành công'));
        });
    }
    getConsultantPagination(req, res) {
        const { pageSize, pageNumber } = req.query;
        const pageNumberResult = pageNumber == undefined ? 1 : pageNumber;
        const pageSizeResult = pageSize == undefined ? 3 : pageSize;
        const getConsultantSql = `CALL GetAllConsultant()`;
        db.query(getConsultantSql, (err, result) => {
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
            const getConsultantPaginationSql = `CALL GetResultBySkipValue('consultant', ${pageSizeResult}, ${skipValue})`;
            db.query(getConsultantPaginationSql, (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                    return;
                }
                const dataResult = {
                    totalPages,
                    pageSize: pageSizeResult,
                    pageNumber: pageNumberResult,
                    data: { consultantList: result[0] },
                };
                res.status(200).json(dataResult);
            });
        });
    }
    getConsultantDetail(req, res) {
        const consultantId = req.params.consultantId;
        const sql = `CALL GetConsultantDetail(${consultantId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const certificateResult = [];
            result[0].forEach((consultantDetailItem, index) => {
                certificateResult.push(consultantDetailItem.certificate_name);
            });
            const dataResult = {
                id: result[0][0].id,
                descriptions: result[0][0].descriptions,
                email: result[0][0].email,
                phone_number: result[0][0].phone_number,
                average_score: result[0][0].average_score,
                certificate_name: certificateResult.join(','),
                avatar: result[0][0].avatar,
            };
            res.status(200).json(dataResult);
        });
    }
}

module.exports = new ConsultantController();
