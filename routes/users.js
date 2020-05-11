const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/users')

//PATH = /api/v1/users

//Get user info from ID
router.get('/:id', ctrl.getUser)
router.put('/:id', ctrl.addFavorite)

module.exports = router;