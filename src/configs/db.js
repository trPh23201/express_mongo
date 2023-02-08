const mysql = require('mysql')

const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'restfulapi_v1',
    // multipleStatements: 'true'
})

module.exports = connection