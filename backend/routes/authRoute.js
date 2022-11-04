const express = require('express')
const router = express.Router()


router.route('/').get()
    .post()
    .patch()
    .delete()
// router.route('/login').post(login)

module.exports  = router