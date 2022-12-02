const db = require('../config/mysqlConfig');
const StreamChat = require('stream-chat').StreamChat;
const ResponseDTO = require('../dto/ResponseDTO');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

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
            const averageScoreResult =
                result[0][0].average_score == 0.0 ? 'Chưa có đánh giá' : result[0][0].average_score;
            const certificateResult = [];
            result[0].forEach((consultantDetailItem, index) => {
                certificateResult.push(consultantDetailItem.certificate_name);
            });
            const dataResult = {
                id: result[0][0].id,
                descriptions: result[0][0].descriptions,
                email: result[0][0].email,
                phone_number: result[0][0].phone_number,
                average_score: averageScoreResult,
                certificate_name: certificateResult.join(','),
                avatar: result[0][0].avatar,
            };
            res.status(200).json(dataResult);
        });
    }
    async handleRatingConsultant(req, res) {
        const { patientId, consultantId, score, content } = req.query;
        if (score == undefined || score == null) {
            res.status(400).json(
                new ResponseDTO(400, 'Đánh giá chuyên gia thất bại, bạn vui lòng chọn sao để đánh giá')
            );
            return;
        }
        const contentResult = content == undefined ? null : content;
        const checkRatingSql = `CALL GetPatientByRating(${patientId}, ${consultantId})`;
        db.query(checkRatingSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            if (result[0].length >= 1) {
                const updateSql = `CALL UpdatePatientRating(${result[0][0].id}, ${score}, '${contentResult}')`;
                db.query(updateSql, (err, result) => {
                    if (err) {
                        res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                        return;
                    }
                    res.status(200).json(new ResponseDTO(200, 'Cập nhật đánh giá chuyên gia thành công'));
                });
            } else {
                const addRatingSql = `CALL AddRatingConsultant(${patientId}, ${consultantId}, ${score}, '${contentResult}')`;
                db.query(addRatingSql, (err, result) => {
                    if (err) {
                        res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                        return;
                    }
                    res.status(200).json(new ResponseDTO(200, 'Đánh giá chuyên gia thành công'));
                });
            }
        });
    }
}

module.exports = new ConsultantController();
