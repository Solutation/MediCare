const db = require('../config/mysqlConfig');
const ResponseDTO = require('../dto/ResponseDTO');
const StreamChat = require('stream-chat').StreamChat;
const bcrypt = require('bcrypt');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

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
    getConsultantById(req, res) {
        const consultantId = req.params.consultantId;
        const sql = `CALL GetConsultantInfoById(${consultantId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json({ patientInfo: result[0][0] });
        });
    }
    updatePatientInfoById(req, res) {
        const patientId = req.params.patientId;
        const chatClient = StreamChat.getInstance(api_key, api_secret);
        const { first_name, last_name, phone_number, address, birth_day, avatar } = req.body;
        const sql = `CALL UpdatePatientByPatientId(${patientId}, N'${first_name}', N'${last_name}', '${phone_number}', N'${address}', '${birth_day.slice(
            0,
            10
        )}', '${avatar}')`;
        db.query(sql, async (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const { users } = await chatClient.queryUsers({ email: result[0][0].email });
            const userData = {
                id: users[0].id,
                user_role: 'patient',
                email: result[0][0].email,
                first_name: result[0][0].first_name,
                last_name: result[0][0].last_name,
                phone_number: result[0][0].phone_number,
                avatar: avatar,
            };
            await chatClient.upsertUser(userData);
            res.status(200).json({ patientInfo: result[0][0] });
        });
    }
    updateConsultantInfoById(req, res) {
        const consultantId = req.params.consultantId;
        const chatClient = StreamChat.getInstance(api_key, api_secret);
        const { first_name, last_name, phone_number, address, birth_day, avatar } = req.body;
        const sql = `CALL UpdateConsultantProfileById(${consultantId}, N'${first_name}', N'${last_name}', '${phone_number}', N'${address}', '${birth_day.slice(
            0,
            10
        )}', '${avatar}')`;
        db.query(sql, async (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const { users } = await chatClient.queryUsers({ email: result[0][0].email });
            const userData = {
                id: users[0].id,
                user_role: 'consultant',
                email: result[0][0].email,
                first_name: result[0][0].first_name,
                last_name: result[0][0].last_name,
                phone_number: result[0][0].phone_number,
                avatar: avatar,
            };
            await chatClient.upsertUser(userData);
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
    updateConsultantPasswordById(req, res) {
        const consultantId = req.params.consultantId;
        const { old_password, new_password } = req.body;
        const checkConsultantSql = `CALL GetConsultantInfoById(${consultantId})`;
        db.query(checkConsultantSql, async (err, result) => {
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
            const updatePasswordConsultantSql = `CALL UpdatePasswordConsultantById(${consultantId}, '${hashPassword}')`;
            db.query(updatePasswordConsultantSql, (err, result) => {
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
