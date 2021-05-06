const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: { type: String },
    movieID: { type: String },
    timestamp: { type: String },
    comment: { type: String }
});

const commentModel = mongoose.model('commentModel', commentSchema);

module.exports = commentModel;
