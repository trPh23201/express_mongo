var jwt = require('jsonwebtoken')

function checkLogin(req, res, next) {
    const token = req.cookies.token
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if(err){
            res.status(400).json(err)
        } else {
            next()
        }
    });
}

module.exports = checkLogin