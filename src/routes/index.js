const loginRouter = require('./auth');

function routes(app) {
    app.use('/signin', loginRouter);
}

module.exports = routes;
