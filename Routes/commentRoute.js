const express = require('express')
const router = express.Router();
const commentModel = require('../dbModels/commentModel')

router.post('/newComment', (req, res) => {
    const newComment = new commentModel(req.body);
    newComment.save((err, obj) => {
        res.json({ success: true, obj: obj })
    })
})
router.get('/comments/:id', (req, res) => {
    commentModel.find({ movieID: req.params.id }, (err, obj) => {
        if (err) return console.error(err)
        else { res.json(obj) }
    })
})

module.exports = router