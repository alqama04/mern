const express = require('express')
const router = express.Router()
const usersController = require('../controller/userController')

router.route('/').get(usersController.getAllUsers)
    .post(usersController.createNewUsers)
    .patch(usersController.updateUsers)
    .delete(usersController.deleteUsers)

module.exports = router
