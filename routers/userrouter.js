const router = require('express').Router()
const UserController = require('../controllers/usercontroller')

router.post('/login', UserController.login)

module.exports = router