const express = require('express');
const userController = require('../../controllers/user')
const router = express.Router();

router.get('/', userController.getAllUser)
router.get('/:id', userController.getUserById)
router.delete('/:id', userController.deleteUser)
router.put('/:id', userController.updateUser)

module.exports = router;