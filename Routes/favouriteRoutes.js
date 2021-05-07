const express = require('express');
const router = express.Router();
const favouriteModel = require('../dbModels/favouriteModel')
router.get('/addFavourites/:movieID/:userID', (req, res) => {
    const newModel = new favouriteModel({
        MID: req.params.movieID,
        UID: req.params.userID
    })
    newModel.save((err, obj) => {
        if (err) return console.error(err);
        else res.json({ success: true, resObj: obj })
    });
})
router.get('/removeFavourites/:movieID/:userID', (req, res) => {
    favouriteModel.deleteOne({ MID: req.params.movieID, UID: req.params.userID }, (err, obj) => {
        if (err) return console.error(err)
        else {
            res.json({ success: true, resObj: obj })
        }
    });
})

router.get('/checkFavourites/:movieID/:userID', (req, res) => {
    favouriteModel.findOne({ MID: req.params.movieID, UID: req.params.userID }, (err, obj) => {
        if (err) return console.error(err);
        else {
            if (obj) res.json({ success: true });
            else res.json({ success: false })
        }
    })
})

module.exports = router