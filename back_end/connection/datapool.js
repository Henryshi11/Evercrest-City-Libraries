const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'library',
    password: 'password'
});

module.exports = pool.promise();