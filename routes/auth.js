const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/auth')

//PATH = /api/v1/auth
router.post('/register', ctrl.register)
router.post('/login', ctrl.login)
router.get('/verify', ctrl.verify)
router.delete('/logout', ctrl.logout)

module.exports = router
