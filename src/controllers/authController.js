const { connect } = require('getstream');
const CryptoJS = require('crypto-js');
const StreamChat = require('stream-chat').StreamChat;
const randomBytes = require('randombytes');
const bcrypt = require('bcrypt');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;

class AuthController {
    async signUp(req, res) {
        try {
            const userId = randomBytes(16).toString('hex');
            const serverClient = connect(api_key, api_secret, api_id);
            const hashedPassword = await bcrypt.hash(password, 12);
            const token = serverClient.createUserToken(userId);
            res.status(200).json({ token });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: err });
        }
    }
    async login(req, res) {
        try {
            const { userName, password } = req.body;
            const serverClient = connect(api_key, api_secret, api_id);
            const client = StreamChat.getInstance(api_key, api_secret);
            const { users } = await client.queryUsers({ name: userName });
            if (!users.length) return res.status(400).json({ message: 'User not found' });
            const success = await bcrypt.compare(password, users[0].hashedPassword);
            const token = serverClient.createUserToken(users[0].id);
            if (success) res.status(200).json({ token, fullName: users[0].fullName, userId: users[0].id });
            else res.status(500).json({ message: 'Incorrect password' });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: err });
        }
    }
}

module.exports = new AuthController();
