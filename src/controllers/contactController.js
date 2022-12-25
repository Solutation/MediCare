const { connect } = require('getstream');
const StreamChat = require('stream-chat').StreamChat;
const ResponseDTO = require('../dto/ResponseDTO');
const { v4 } = require('uuid');
const db = require('../config/mysqlConfig');
const randomBytes = require('randombytes');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

class ContactController {
    // async getChannelList(req, res) {
    //     try {
    //         const user_id = req.query.userId;
    //         const chatClient = StreamChat.getInstance(api_key, api_secret);
    //         const filter = { type: 'messaging', members: { $in: [user_id] } };
    //         const sort = [{ last_message_at: -1 }];
    //         const channels = await chatClient.queryChannels(filter, sort, {
    //             state: true,
    //         });
    //         console.log(channels);
    //         // console.log(channels);
    //         // const result = [];
    //         // channels.map((channel) => {
    //         //     let channelData = { id: result.length, channel_id: channel.data.id, name: channel.data.name };
    //         //     result.push(channel);
    //         // });
    //         await res.status(200).json({ data: { ...channels } });
    //     } catch (err) {
    //         const error = new ResponseDTO(400, 'Failed to query channel!');
    //         res.status(400).json(error.init());
    //     }
    // }
    // async addUserToChannel(req, res) {
    //     try {
    //         const user_id = req.query.userId;
    //         const chatClient = StreamChat.getInstance(api_key, api_secret);
    //         const filter = { type: 'messaging' };
    //         const sort = [{ last_message_at: -1 }];
    //         const channels = await chatClient.queryChannels(filter, sort, {});
    //         channels.map(async (channel) => {
    //             await channel.addMembers([{ user_id, channel_role: 'channel_member' }]);
    //         });
    //         res.status(200).json({ message: 'Adding user to channel successfully!' });
    //     } catch (err) {
    //         const error = new ErrorDTO(400, 'Failed to add user to channel!');
    //         res.status(400).json(error.init());
    //     }
    // }
    createConsultantContact(req, res) {
        const sql = 'CALL GetAllConsultant()';
        const chatClient = StreamChat.getInstance(api_key, api_secret);
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            result[0].forEach(async (consultant) => {
                try {
                    let data = {
                        id: consultant.id + '@' + v4(),
                        user_role: 'consultant',
                        email: consultant.email,
                        first_name: consultant.first_name,
                        last_name: consultant.last_name,
                        phone_number: consultant.phone_number,
                        avatar: consultant.avatar,
                    };
                    await chatClient.upsertUsers([data]);
                } catch (err) {
                    throw err;
                }
            });
            res.status(200).json(new ResponseDTO(200, 'Tạo consultant cho liên hệ thành công'));
        });
    }
    createSpecificConsultantContact(req, res) {
        const { consultantId } = req.query;
        const sql = `CALL GetConsultantDetail(${consultantId})`;
        const chatClient = StreamChat.getInstance(api_key, api_secret);
        db.query(sql, async (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            let data = {
                id: result[0][0].id + '@' + v4(),
                user_role: 'consultant',
                email: result[0][0].email,
                first_name: result[0][0].first_name,
                last_name: result[0][0].last_name,
                phone_number: result[0][0].phone_number,
                avatar: result[0][0].avatar,
            };
            await chatClient.upsertUsers([data]);
            res.status(200).json(new ResponseDTO(200, 'Tạo consultant cho liên hệ thành công'));
        });
    }
}

module.exports = new ContactController();
