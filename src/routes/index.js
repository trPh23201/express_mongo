const express = require('express');
const router = express.Router();
const user = require('./api/user')
const auth = require('./api/auth');
const checkLogin = require('../middleware/checkLogin');
const checkManager = require('../middleware/checkManager');

router.get('/', (req, res) => {
    res.send('Welcome to my demo RESTfulApi')
})
router.use('/user', checkLogin, checkManager, user)
router.use('/', auth)

module.exports = router