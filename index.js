const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const db = require('./src/config/mysqlConfig');

const app = express();
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

// Config for view engine template
app.set('view engine', 'ejs');
// app.set('views', './src/views');

// Config for routing
routes(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
