const db = require('../models')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());

const getUser = (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
        if (err) {
            return res.status(500).json({ status: 500, message: err})
        }
        res.status(200).json({ status: 200, data: foundUser })
    })
}

const addFavorite = (req, res) => {
    console.log('add fav called')
    console.log(req)
    db.User.updateOne({_id: req.params.id},
        {
            $push : {
                favorites: req.body
            }
        },
        (err, updatedUser) => {
            if(err) {
                return res.status(400).json({status: 400, message: "User not found!"})
            }
            else {
                res.status(200).json({data: updatedUser, message: "User updated!"})
            }
        })
}

module.exports= {
    getUser,
    addFavorite
}