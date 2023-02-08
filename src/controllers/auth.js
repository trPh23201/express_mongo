const db = require('../configs/db')
var jwt = require('jsonwebtoken')
require('dotenv').config()

const authentication = {
    //POST /user  +body
    resgister(req, res) {
        let body = req.body;
        let sql = `INSERT INTO user (username, password, role) VALUES ('${body.username}', '${body.password}', ${0})`;
        db.query(sql, function (err, result) {
            if (err) res.status(400).json([])
            const token = jwt.sign({
                id: result.insertId,
                username: result.username
            }, process.env.SECRET_KEY);
            res.cookie('token', token, { httpOnly: true, secure: true })
            res.status(200).json(token)
        });
    },

    //POST /user  +body
    login(req, res) {
        let body = req.body;
        let sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
        db.query(sql, [body.username, body.password], function (err, result) {
            if (result.length !== 0) {
                const token = jwt.sign({
                    id: result[0].id,
                    username: result[0].username,
                    role: result[0].role
                }, process.env.SECRET_KEY);
                res.cookie('token', token, { httpOnly: true, secure: true })
                res.status(200).json(token)
            } else {
                res.status(400).json(null)
            }
        });
    },
}

module.exports = authentication