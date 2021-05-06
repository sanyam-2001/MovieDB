const express = require('express')
const userModel = require('../dbModels/userModel')
const router = express.Router();

router.get('/login/:email/:password', (req, res) => {
    const { email, password } = req.params;

    userModel.findOne({ email: email }, (err, response) => {
        if (err) return console.error(err);
        else {
            if (!response) {
                res.json({
                    success: false,
                    code: 110,
                    response: {
                        message: "User Not Found!"
                    }
                })
            }
            else {
                if (response.password === password) {
                    res.json({
                        success: true,
                        code: 200,
                        response: {
                            message: "User Authenticated!",
                            userID: response._id
                        }
                    })
                }
                else {
                    res.json({
                        success: false,
                        code: 111,
                        response: {
                            message: "Incorrect password!"
                        }
                    })
                }
            }
        }
    })

})
router.get('/getUser/:UID', (req, res) => {
    userModel.findOne({ _id: req.params.UID }, (err, response) => {
        if (err) return console.error(err);
        else {
            response.password = "ENCRYPTED"
            res.json(response)
        }
    })
})

module.exports = router