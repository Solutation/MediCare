const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const db = require('./src/config/mysqlConfig');
// const http = require('http');
// const { Server } = require('socket.io');
// const { addUser, removeUser, getUser, getUserInCategoryChannel } = require('./src/utils/CommunityUtils');

require('dotenv').config();

const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: process.env.FRONT_END_BASE_URL,
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     },
// });
const PORT = process.env.PORT || 4000;

// Config for env
require('dotenv').config();

// Config for accepting json, request body and allows react calling api
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Config for connecting db
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Mysql Connected');
});

// // Config for socket.io
// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // socket.on('join', ({ userId, categoryId, username, categoryName }, callback) => {
//     //     const { error, user } = addUser(userId, categoryId, username, categoryName);
//     //     console.log(userId);
//     //     console.log(categoryId);
//     //     console.log(username);
//     //     console.log(categoryName);
//     //     if (error) return callback(error);

//     //     socket.join(user.channel);

//     //     callback();
//     // });

//     socket.on('sendMessage', (message, callback) => {
//         const user = getUser(socket.userId);

//         io.to(user.channel).emit('message', { user: user.userName, text: message });

//         callback();
//     });

//     socket.on('disconnect', () => {
//         console.log('User had left!');
//     });
// });

// Config for view engine template
app.set('view engine', 'ejs');
// app.set('views', './src/views');

// Config for routing
routes(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
