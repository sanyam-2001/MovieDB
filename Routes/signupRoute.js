const express = require('express');
const router = express.Router();
const userModel = require('../dbModels/userModel');
const signupAuth = (name, email, password) => {
    if (name.length < 3) {
        const nameErrObj = {
            success: false,
            code: 100,
            response: {
                message: "Invalid Name Parameter!"
            }
        }
        return nameErrObj;
    }
    if (email.indexOf('@') === -1) {
        const emailErrObj = {
            success: false,
            code: 101,
            response: {
                message: "Invalid E-Mail Parameter!"
            }
        }
        return emailErrObj;
    }
    if (password.length < 6) {
        const passwordErrObj = {
            success: false,
            code: 102,
            response: {
                message: "Invalid Password Parameter!"
            }
        }
        return passwordErrObj;
    }
    const successObj = {
        success: true,
        code: 200,
        response: {
            message: "Credentials Authorized!"
        }
    }
    return successObj
}

router.post('/signUp', (req, res) => {
    const { name, email, password } = req.body;
    const auth = signupAuth(name, email, password);
    if (!auth.success) { res.json(auth); }
    else {
        const newUser = new userModel(req.body);
        newUser.save((err, response) => {
            if (err) {
                if (err.code === 11000) {
                    return res.json({ success: false, code: 11000, response: { message: "E-Mail Already Taken!" } })
                }
                else return console.error(err);
            }
            else {
                res.json({ success: true, code: 200, response: { message: "New User Created", userID: response._id } })
            }
        })
    }
});

module.exports = router;