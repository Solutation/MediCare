const { connect } = require('getstream');
const StreamChat = require('stream-chat').StreamChat;
const bcrypt = require('bcrypt');
const db = require('../config/mysqlConfig');
const ResponseDTO = require('../dto/ResponseDTO');
const { v4 } = require('uuid');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;

class LoginController {
    patientLogin(req, res) {
        const errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng, vui lòng nhập lại';
        const { email, pass_word } = req.body;
        const getUserSql = `CALL GetUserByEmailName('${email}')`;
        db.query(getUserSql, async (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            if (result[0].length < 1) {
                res.status(400).json(new ResponseDTO(400, errorMessage));
                return;
            }
            const success = await bcrypt.compare(pass_word, result[0][0].password);
            if (!success) {
                res.status(400).json(new ResponseDTO(400, errorMessage));
                return;
            }
            if (result[0][0].status == 0) {
                res.status(400).json(new ResponseDTO(400, 'Vui lòng vào mail xác nhận để kích hoạt tài khoản của bạn'));
                return;
            }
            const serverClient = connect(api_key, api_secret, api_id);
            const chatClient = StreamChat.getInstance(api_key, api_secret);
            const { users } = await chatClient.queryUsers({ email: email });
            if (!users.length)
                return res.status(400).json(new ResponseDTO(400, 'Không tìm thấy người dùng trong messaging'));
            const chatToken = serverClient.createUserToken(users[0].id);
            const userName = `${result[0][0].first_name} ${result[0][0].last_name}`;
            res.status(200).json({
                userId: result[0][0].id,
                userContactId: users[0].id,
                chatToken,
                email: email,
                userName,
                role: 'Bệnh nhân',
                avatar: result[0][0].avatar,
            });
        });
    }
    consultantLogin(req, res) {
        const errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng, vui lòng nhập lại';
        const { email, pass_word } = req.body;
        const getConsultantSql = `CALL GetConsultantByEmail('${email}')`;
        db.query(getConsultantSql, async (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            if (result[0].length < 1) {
                res.status(400).json(new ResponseDTO(400, errorMessage));
                return;
            }
            const success = await bcrypt.compare(pass_word, result[0][0].password);
            if (!success) {
                res.status(400).json(new ResponseDTO(400, errorMessage));
                return;
            }
            const serverClient = connect(api_key, api_secret, api_id);
            const chatClient = StreamChat.getInstance(api_key, api_secret);
            const { users } = await chatClient.queryUsers({ email: email });
            if (!users.length)
                return res.status(400).json(new ResponseDTO(400, 'Không tìm thấy người dùng trong messaging'));
            const chatToken = serverClient.createUserToken(users[0].id);
            const userName = `${result[0][0].first_name} ${result[0][0].last_name}`;
            res.status(200).json({
                userId: result[0][0].id,
                userContactId: users[0].id,
                chatToken,
                email: email,
                userName,
                role: 'Chuyên gia',
                avatar: result[0][0].avatar,
            });
        });
    }
    async verify(req, res) {
        try {
            const email = req.query.email;
            const verifySql = `CALL ConfirmEmail('${email}')`;
            const getConsultantSql = `CALL GetAllConsultant()`;
            const getUserByEmail = `CALL GetUserByEmailName('${email}')`;
            const chatClient = StreamChat.getInstance(api_key, api_secret);
            db.query(getUserByEmail, async (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                    return;
                }
                if (result[0][0].status === 1) {
                    res.status(400).json(new ResponseDTO(400, 'Bạn đã xác nhận email này rồi'));
                    return;
                }
                const userData = {
                    id: result[0][0].id + '_' + v4(),
                    user_role: 'patient',
                    email: result[0][0].email,
                    first_name: result[0][0].first_name,
                    last_name: result[0][0].last_name,
                    phone_number: result[0][0].phone_number,
                    avatar: result[0][0].avatar,
                };
                db.query(verifySql, async (err, result) => {
                    if (err) {
                        res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                        return;
                    }
                    const userId = userData.id;
                    const userName = `${userData.first_name} ${userData.last_name}`;
                    await chatClient.upsertUsers([userData]);
                    db.query(getConsultantSql, async (err, result) => {
                        if (err) {
                            res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                            return;
                        }
                        const { users } = await chatClient.queryUsers({ user_role: { $in: ['consultant'] } });
                        result[0].forEach(async (consultant, index) => {
                            //prettier-ignore
                            const consultantMatching = users.find((userItem) => `${userItem.first_name} ${userItem.last_name}` == `${consultant.first_name} ${consultant.last_name}`);
                            const channelId = v4();
                            const consultantName = `${consultant.first_name} ${consultant.last_name}`;
                            const channel = chatClient.channel('messaging', channelId, {
                                created_by_id: 'duy-tan-university',
                                name: `${userName}/${consultantName}`,
                            });
                            await channel.create();
                            await channel.addMembers([{ user_id: userId, channel_role: 'channel_member' }]);
                            //prettier-ignore
                            await channel.addMembers([{ user_id: consultantMatching.id, channel_role: 'channel_member' }]);
                        });
                        res.cookie('email', 'verified');
                        res.redirect('http://localhost:3002/login');
                    });
                });
            });
        } catch (err) {
            res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
        }
    }
}

module.exports = new LoginController();
