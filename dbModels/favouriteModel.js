const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    UID: { type: String },
    MID: { type: String }
});

const favouriteModel = mongoose.model('favouriteModel', favouriteSchema);

module.exports = favouriteModel;

