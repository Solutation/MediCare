const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Stevenjobsc123!',
    database: 'medi_care',
});

module.exports = db;
