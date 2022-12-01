const db = require('../config/mysqlConfig');
const ResponseDTO = require('../dto/ResponseDTO');
const bcrypt = require('bcrypt');

class ProfileController {
    getPatientByPatientId(req, res) {
        const patientId = req.params.patientId;
        const sql = `CALL GetPatientByPatientId(${patientId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json({ patientInfo: result[0][0] });
        });
    }
    getConsultantByEmail(req, res) {
        const { email } = req.query;
        const sql = `CALL GetConsultantByEmail('${email}')`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json({ consultantInfo: result[0][0] });
        });
    }
    updatePatientInfoById(req, res) {
        const patientId = req.params.patientId;
        const { first_name, last_name, phone_number, address, birth_day, avatar } = req.body;
        const sql = `CALL UpdatePatientByPatientId(${patientId}, N'${first_name}', N'${last_name}', '${phone_number}', N'${address}', '${birth_day.slice(
            0,
            10
        )}', '${avatar}')`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json({ patientInfo: result[0][0] });
        });
    }
    updatePatientPasswordById(req, res) {
        const patientId = req.params.patientId;
        const { old_password, new_password } = req.body;
        const checkPatientSql = `CALL GetPatientByPatientId(${patientId})`;
        db.query(checkPatientSql, async (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const success = await bcrypt.compare(old_password, result[0][0].password);
            if (!success) {
                res.status(400).json(new ResponseDTO(400, 'Mật khẩu cũ không đúng, vui lòng nhập lại'));
                return;
            }
            const hashPassword = await bcrypt.hash(new_password, 10);
            const updatePasswordPatientSql = `CALL UpdatePasswordPatientByPatientId(${patientId}, '${hashPassword}')`;
            db.query(updatePasswordPatientSql, (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                    return;
                }
                res.status(200).json(new ResponseDTO(200, 'Cập nhật mật khẩu thành công'));
            });
        });
    }
}

module.exports = new ProfileController();
