const db = require('../models')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());

const getUser = (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
        if (err) return res.status(500).json({ status: 500, message: err})

        res.status(200).json({ status: 200, data: foundUser })
    })
}

module.exports= {
    getUser
}