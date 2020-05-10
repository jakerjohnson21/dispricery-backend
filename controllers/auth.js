const db = require('../models')
const bcrypt = require('bcrypt')

//Register
const register = (req, res) => {
    
    console.log('Register called');
    console.log(req.body);
    //Check for required input data
    if(!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "Name, email, and password are required."
        })
    }

    //Check if user already exists
    db.User.find({ email: req.body.email }, (err, foundUser) => {
        if (err) {
            return res.status(500).json({
                message: 'Error checking for existing user. Try again'
            }) 
        }

        //If user is found, respond
        if(foundUser.length != 0) {
            return res.status(200).json({
                message: 'A user with that email already exists.'
            })
        }

        //Generate safe password
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error with bcrypt salt'
                })
            }

            //Hash user's password using generated salt
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error with bcrypt hash'
                    })
                }

                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    dateJoined: Date(Date.now())
                }

                db.User.create(newUser, (err, savedUser) => {
                    if (err) return res.status(500).json({ status: 500, message: err })

                    return res.status(200).json({ status: 200, userId: savedUser._id, message: `${newUser.name} registered as new user.`})
                })
            })
        })
    })
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ status: 400, message: 'Please enter your email and password.'});
    }

    db.User.find({ email: req.body.email }, (err, foundUser) => {
        if (err) return res.status(500).json({ status: 500, message: `${err}`});

        if (!foundUser) {
            return res.status(400).json({ status: 400, message: 'User was not found.'});
        }

        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({ status: 500, message: `${err}` });

            if (isMatch) {
                req.session.currentUser = { id: foundUser._id };
                return res.status(200).json({ status: 200, message: 'Success', data: foundUser._id});
            } else {
                return res.status(400).json({ status: 400, message: 'Email or password is incorrect'});
            }
        });
    })
};

const logout = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({ status: 401, message: 'Unauthorized' });
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ status: 500, message: `${err}` });
        res.sendStatus(200);
    });
};

const verify = (req, res) => {
    if (!req.session.currentUser) return res.status(401).json({ status: 401, message: 'Unauthorized' });
    res.status(200).json({ status: 200, message: `Current user verified. User ID: ${req.session.currentUser.id}`});
};

module.exports = {
    register,
    login,
    logout,
    verify
}