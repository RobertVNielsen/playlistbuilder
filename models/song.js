const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Song", songSchema);