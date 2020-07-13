const mongoose = require('mongoose');
const Playlist = require('../models/playlist');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    /*
    playlists: {
        type: [Playlist],
        required: true
    }
    
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    */
})

module.exports = mongoose.model("User", userSchema);