const Song = require('../models/song');
const Playlist = require('../models/playlist');
//const mongoose = require('mongoose')
// const song = mongoose.model("song", schema)
/*
req.session.destroy(err => {
        if(err){
            console.log(err)
        }
    })
    */

exports.getDisplayPage = (req, res, next) => {
    Playlist
        .findById(req.params.id)
        .then(playlist => {
            songs = playlist.songs;
            res.render('playlist', { 
                songs: songs,
                path: '/playlist'
            });
        })
        .catch(err => {
            console.log(err); 
        })
    
}

/*

exports.postAddSong = (req, res, next) => {
    const title = req.body.title;
    const artist = req.body.artist;

    console.log(title);
    const song = new Song({
        title: title,
        artist: artist
    });

    song
        .save()
        .then(result => {

            console.log("Created Song");
            res.redirect('/playlist/'+)
        })
        .catch(err => {
            console.log(err); 
        })
}

/*

exports.postEditSong = (req, res, next) => {
    const oldTitle = req.body.oldtitle;
    const updatedTitle = req.body.utitle;
    const updatedPrice = req.body.uprice;
    const updatedDescription = req.body.udescription;
    Song
        .findOne({'title': oldTitle})
        .then(song => {
            song.title = updatedTitle;
            song.price = updatedPrice;
            song.description = updatedDescription;
            return song.save();
        })
        .then(result => {
            console.log("Updated Song");
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err); 
        })
}

exports.getDeleteSong = (req, res, next) => {
    console.log("Displa");
    Song
        .find()
        .then(songs => {
            console.log("Displayed Songs");
            console.log(songs);
            res.render('pages/delete_product', { 
                songs: songs,
                title: 'Delete Product', 
                path: '/delete_product', // For pug, EJS 
                activeTA04: true, // For HBS
                contentCSS: true, // For HBS
            });
        })
        .catch(err => {
            console.log(err); 
        })
}

exports.postDeleteSong = (req, res, next) => {
    const title = req.body.deletetitle;
    //console.log(title);
    Song
        .findOneAndRemove({'title': title})
        .then(result => {
            console.log("Deleted Song");
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err); 
        })
}
*/