const { connect } = require('getstream');
const StreamChat = require('stream-chat').StreamChat;
const bcrypt = require('bcrypt');
const db = require('../config/mysqlConfig');
const ResponseDTO = require('../dto/ResponseDTO');
const mailConfig = require('../../src/config/mailConfig');
const NumberUtils = require('../../src/utils/NumberUtils');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;

class SignupController {
    async signUp(req, res) {
        try {
            // prettier-ignore
            const { first_name, last_name, email, pass_word, address, phone_number, birth_day } = req.body;
            const chatClient = StreamChat.getInstance(api_key, api_secret);
            // const userId = randomBytes(16).toString('hex');
            // const serverClient = connect(api_key, api_secret, api_id);
            const hashedPassword = await bcrypt.hash(pass_word, 10);
            const checkEmailSql = `CALL GetUserByEmailName('${email}')`;
            const addUserSql = `CALL AddUser('${email}', '${hashedPassword}', N'${first_name}', N'${last_name}', '${phone_number}', N'${address}', '${birth_day}')`;
            db.query(checkEmailSql, (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Đăng ký thất bại'));
                    return;
                }
                if (result[0].length >= 1) {
                    res.status(400).json(new ResponseDTO(400, 'Email đã được sử dụng. Vui lòng chọn email khác'));
                    return;
                }
                db.query(addUserSql, (err, result) => {
                    if (err) {
                        res.status(500).json(new ResponseDTO(500, 'Đăng ký thất bại'));
                        return;
                    }
                    const verificationCode = NumberUtils.getRandomInt();
                    mailConfig(verificationCode, email);
                    //prettier-ignore
                    res.status(200).json(new ResponseDTO(200, 'Đăng ký thành công. Vui lòng vào gmail để kích hoạt tài khoản của bạn!'));
                });
            });
        } catch (err) {
            res.status(500).json(new ResponseDTO(500, 'Đăng ký thất bại'));
        }
    }
}

module.exports = new SignupController();
