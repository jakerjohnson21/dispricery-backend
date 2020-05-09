const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

//PATH = /api/v1/users

//Get user info from ID
router.get('/:id', ctrl.users.getUser)

module.exports = router;