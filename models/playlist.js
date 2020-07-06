const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    songs: {
        type: [],
        required: true
    }
})

module.exports = mongoose.model("Playlist", playlistSchema);