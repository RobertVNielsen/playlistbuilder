const mongoose = require('mongoose')
const Song = require('../models/song');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    songs: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true
    },
    shareTo: {
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model("Playlist", playlistSchema);