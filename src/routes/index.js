const loginRouter = require('./login');
const signupRouter = require('./signup');
const contactRouter = require('./contact');
const consultantRouter = require('./consultant');
const homeRouter = require('./home');
const articleRouter = require('./article');
const categoryRouter = require('./category');
const toolRouter = require('./tools');
const communityRouter = require('./community');
const profileRouter = require('./profile');

function routes(app) {
    app.use('/', homeRouter);
    app.use('/auth', loginRouter);
    app.use('/signup', signupRouter);
    app.use('/contact', contactRouter);
    app.use('/consultant', consultantRouter);
    app.use('/article', articleRouter);
    app.use('/category', categoryRouter);
    app.use('/tool', toolRouter);
    app.use('/community', communityRouter);
    app.use('/profile', profileRouter);
}

module.exports = routes;
